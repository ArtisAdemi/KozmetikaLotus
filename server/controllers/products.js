// imports
const db = require('../models');
const { Sequelize, Op } = require('sequelize');
const Categories = db.Categories;
const Products = db.Products;
const SubCategories = db.Subcategory
const Images = db.Images;
const fs = require('fs');
const path = require('path');

// Controller functions

// Get products
const getProducts = async (req, res) => {
    const page = parseInt(req.query.page) || 1; // Default page is 1
    const limit = parseInt(req.query.limit) || 12; // Default limit is 12
    const offset = (page - 1) * limit;
    const subCategory = req.query.subCategory;
    const productName = req.query.productName;

    let whereCondition = {};
    let includeCondition = [];

    if (productName) {
        whereCondition.title = { [Op.iLike]: `%${productName}%` };
    }

    if (subCategory) {
        const subCategory = req.query.subCategory.replace(/-/g, ' ');
        includeCondition.push({
            model: SubCategories,
            where: { name: subCategory },
            through: { attributes: [] }, // Hide the join table attributes
        });
        includeCondition.push({
            model: Images,
            // through: { attributes: ["fileName"] },
        })
    } else {
        includeCondition.push({
            model: SubCategories,
            through: { attributes: [] }, // Optionally hide the join table attributes if not needed
        });
    }

    try {
        // Use findAndCountAll to get both count and rows
        const { count, rows } = await Products.findAndCountAll({
            where: whereCondition,
            include: includeCondition,
            offset: offset,
            limit: limit,
            distinct: true, // This ensures count is accurate when using include
        });

        // Calculate the total number of pages
        const totalPages = Math.ceil(count / limit);

        res.status(200).json({
            products: rows,
            totalProducts: count,
            totalPages: totalPages,
            currentPage: page
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// Get ProductById
const getProductById = async (req, res) => {
    const productId = req.params.id;
    
    try{
        const product = await Products.findByPk(productId, {
            include: SubCategories
        });
        if (product) {
            res.status(200).json(product);
        } else {
            res.status(404).json({message: "Product not found"});
        }
    }catch (err) {
        res.status(500).json({ error: err.message});
    }
}

// Register Product
const registerProduct = async (req, res) => {
    const { title, shortDescription, longDescription, brandName, quantity, price, discount, subCategoryId } = req.body;
    try {
        // Create new product using variables from body
        const newProduct = await Products.create({
            title,
            shortDescription,
            longDescription,
            quantity,
            price,
            discount,
        });

        // If images have been uploaded, save their paths in the Images table
        if (req.uploadedFiles && req.uploadedFiles.length > 0) {
            const imageRecords = req.uploadedFiles.map(file => ({
                fileName: file.filename, // Assuming the file name is stored in filename property
                ProductId: newProduct.id // Associate each image with the newly created product
            }));
            await Images.bulkCreate(imageRecords);
        }

        // Check if subCategoryId is provided
        if (subCategoryId) {
            const subCategory = await db.Subcategory.findByPk(subCategoryId);
            // This populates the Product_Categories Table with the id of product and subcategory
            await newProduct.addSubcategory(subCategory);
        }

        if (brandName){
            const brand = await db.Brand.findOne({
                where: {name: brandName}
            });

            if(brand){
                await newProduct.setBrand(brand);
            }
        }

        
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
// Update Product 
const updateProduct = async(req, res) => {
    const productId = req.params.id;
    const { title, shortDescription, longDescription, brand, quantity, price, discount, subCategoryId } = req.body;
    
    try {
        // Find Product by id
        const product = await Products.findByPk(productId);
        if (!product) {
            return res.status(404).json({message: "Product not found"});
        }

        // Update the product details
        await product.update({
            title,
            shortDescription,
            longDescription,
            brand,
            quantity,
            price,
            discount,
        });

        // If images have been uploaded, save their paths in the Images table
        if (req.uploadedFiles && req.uploadedFiles.length > 0) {
            const imageRecords = req.uploadedFiles.map(file => ({
                fileName: file.filename, // Assuming the file name is stored in filename property
                ProductId: product.id // Associate each image with the updated product
            }));
            await Images.bulkCreate(imageRecords);
        }

        if (subCategoryId) {
            const subCategory = await db.Subcategory.findByPk(subCategoryId);
            if (subCategory) {
                await product.setSubcategories([subCategory]);
            } else {
                throw new Error("Subcategory not found");
            }
        }

        res.status(200).json(product);
    } catch (err) {
        res.status(500).json({ error: err.message});
    }
}

// Delete Product
const deleteProduct = async (req, res) => {
    const productId = req.params.id;

    try {
        // Get product from database 
        const product = await Products.findByPk(productId);

        if (!product) { //if no product
            return res.status(404).json({ message: "Product not found" });
        }

        // Find all images associated with the product
        const images = await Images.findAll({
            where: { ProductId: productId }
        });

        // Delete each image file from the filesystem
        images.forEach(image => {
            const imagePath = path.join(__dirname, '..', '..', 'client', 'public', 'uploads', image.fileName);
            fs.unlink(imagePath, (err) => {
                if (err) console.error(`Failed to delete image file: ${imagePath}`, err);
            });
        });

        // Delete all image records from the database
        await Images.destroy({
            where: { ProductId: productId }
        });

        // Delete product
        await product.destroy();
        res.status(200).json({message: "Product deleted successfully"});
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

// Get unique product per category with associated image
const getUniqueProductPerCategory = async (req, res) => {
    try {
        const subCategories = await SubCategories.findAll({
            include: [{
                model: Products,
                include: [{
                    model: Images,
                    order: [['createdAt', 'DESC']] // Order by creation date
                },
                {
                    model: SubCategories
                }
            ],
                order: [['createdAt', 'DESC']] // Order by creation date
            }]
        });

        // Filter out categories without associated products
        const validCategories = subCategories.filter(subCategory => subCategory.Products.length > 0);

        // Extract the first product with image for each valid subCategory
        const uniqueProducts = validCategories.map(subCategory => {
            const product = subCategory.Products[0]; // Get the first product
            if (product) {
                product.Images = product.Images.slice(0, 1); // Get the first image for the product
            }
            return product;
        });

        res.status(200).json(uniqueProducts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const getProductImages = async (req, res) => {
    const { id } = req.params; // Extract productId from URL parameters
    if (id === null) {
        res.status(500).json({message: "No id has been provided"})
    }
    try {
        const images = await Images.findAll({
            where: { ProductId: id }
        });

        if (images.length > 0) {
            res.status(200).json(images);
        } else {
            res.status(404).json({ message: "No images found for this product." });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getBrands = async (req, res) => {
    try{
        const brands = await db.Brand.findAll();

        if (brands.length > 0) {
            res.status(200).json(brands);
        } else {
            res.status(404).json({message: "No brands where found!"});
        }
    } catch (err) {
        res.status(500).json({error: err.message})
    }
}

module.exports = {
    getProducts,
    getProductById,
    registerProduct,
    updateProduct,
    deleteProduct,
    getUniqueProductPerCategory,
    getProductImages,
    getBrands,
}