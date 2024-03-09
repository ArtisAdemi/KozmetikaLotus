// imports
const db = require('../models');
const { Sequelize, Op } = require('sequelize');
const Categories = db.Categories;
const Products = db.Products;
const Images = db.Images;

// Controller functions

// Get products
const getProducts = async (req, res) => {
    const page = parseInt(req.query.page) || 1; // Default page is 1
    const limit = parseInt(req.query.limit) || 12; // Default limit is 12
    const offset = (page - 1) * limit;
    const category = req.query.category;
    const productName = req.query.productName;

    let whereCondition = {};
    let includeCondition = [];

    if (productName) {
        whereCondition.title = { [Op.like]: `%${productName}%` };
    }

    if (category) {
        includeCondition.push({
            model: Categories,
            where: { name: category },
            through: { attributes: [] }, // Hide the join table attributes
        });
    } else {
        includeCondition.push({
            model: Categories,
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
        const product = await Products.findByPk(productId);
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
    const {title, description, brand, quantity, price, discount, categoryNames} = req.body;
    try{
        // Create new product using variables from body
        const newProduct = await Products.create({
            title: title,
            description: description,
            brand: brand,
            quantity: quantity,
            price: price,
            discount: discount,
        });

        // Check if categoryNames have been provided
        if (categoryNames && categoryNames.length > 0) {
            // Promise.all takes an array of promises and returns a new promise that holds in an array all the values of those promises 
            const categories = await Promise.all(
                // For each category name Find it in DB. If not existant create it.
                categoryNames.map(name => 
                    Categories.findOrCreate({ where: { name } })
                        .then(([category]) => category)
                )
            );
            // This populates the ProductsCategories Table with the id of product and category
            await newProduct.setCategories(categories);
        }
        
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(500).json({ error: err.message});
    }
}
// Update Product 
const updateProduct = async(req, res) => {
    const productId = req.params.id;
    const { title, description, brand, quantity, price, discount, categoryNames } = req.body;
    
    try{
        // Find Product by id
        const product = await Products.findByPk(productId);

        if (!product) {
            return res.status(404).json({message: "Product not found"});
        }

        // Update the product details
        await product.update({
            title: title,
            description: description,
            brand: brand,
            quantity: quantity,
            price: price,
            discount: discount,
        })

        // Update the categories associated with the product
        if (categoryNames && categoryNames.length > 0) {
          const categories = await Promise.all(
            categoryNames.map(name =>
                Categories.findOrCreate({ where: { name } })
                    .then(([category]) => category))
          );
          await product.setCategories(categories);  
        }

        res.status(200).json(product);
    } catch (err) {
        res.status(500).json({ error: err.message});
    }
}

// Delete Product
const deleteProduct = async (req, res) => {
    // get product id 
    const productId = req.params.id;

    try {
        // Get product from database 
        const product = await Products.findByPk(productId);

        if(!product) { //if no product
            res.status(404).json({message: "Product not found"});
        }

        //delete product
        await product.destroy();
        res.status(200).json({message: "Product deleted successfully"});
    } catch (err) {
        res.status(500).json({error: err.message})
    }
}

// Get unique product per category with associated image
const getUniqueProductPerCategory = async (req, res) => {
    try {
        const categories = await Categories.findAll({
            include: [{
                model: Products,
                include: [{
                    model: Images,
                    order: [['createdAt', 'DESC']] // Order by creation date
                },
                {
                    model: Categories
                }
            ],
                order: [['createdAt', 'DESC']] // Order by creation date
            }]
        });

        // Filter out categories without associated products
        const validCategories = categories.filter(category => category.Products.length > 0);

        // Extract the first product with image for each valid category
        const uniqueProducts = validCategories.map(category => {
            const product = category.Products[0]; // Get the first product
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
module.exports = {
    getProducts,
    getProductById,
    registerProduct,
    updateProduct,
    deleteProduct,
    getUniqueProductPerCategory
}