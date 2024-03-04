import React, { useState } from 'react';
import ProductService from '../services/Products';

const ProductForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [brand, setBrand] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [price, setPrice] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [categoryNames, setCategoryNames] = useState([]);
    const [images, setImages] = useState([]);

    const handleAddCategory = () => {
        setCategoryNames([...categoryNames, '']);
    };

    const handleCategoryChange = (index, value) => {
        const updatedCategories = [...categoryNames];
        updatedCategories[index] = value;
        setCategoryNames(updatedCategories);
    };

    const handleAddImage = () => {
        setImages([...images, { url: '', data: '' }]);
    };

    const handleImageChange = (index, event) => {
        const updatedImages = [...images];
        const file = event.target.files[0];
    
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                updatedImages[index] = { ...updatedImages[index], url: reader.result, data: file };
                setImages(updatedImages);
            };
            reader.readAsDataURL(file); // Read the file as a data URL
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const newProduct = await ProductService.registerProduct({
                title,
                description,
                brand,
                quantity,
                price,
                discount,
                categoryNames,
                images
            });
            console.log('Product registered:', newProduct);
            setTitle('');
            setDescription('');
            setBrand('');
            setQuantity(0);
            setPrice(0);
            setDiscount(0);
            setCategoryNames([]);
            setImages([]);
        } catch (error) {
            console.error('Error registering product:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="product-form">
            <label>Title:</label>
            <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />

            <label>Description:</label>
            <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />

            <label>Brand:</label>
            <input type="text" placeholder="Brand" value={brand} onChange={(e) => setBrand(e.target.value)} />

            <label>Quantity:</label>
            <input type="number" placeholder="Quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} />

            <label>Price:</label>
            <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />

            <label>Discount:</label>
            <input type="number" placeholder="Discount" value={discount} onChange={(e) => setDiscount(e.target.value)} />

            {categoryNames.map((category, index) => (
                <div key={index}>
                    <label>Category:</label>
                    <input type="text" placeholder="Category" value={category} onChange={(e) => handleCategoryChange(index, e.target.value)} />
                </div>
            ))}
            <button type="button" onClick={handleAddCategory}>Add Category</button>

            {images.map((image, index) => (
                <div key={index}>
                    <label>Image URL:</label>
                    <input type="text" name="url" placeholder="Image URL" value={image.url} onChange={(e) => handleImageChange(index, e)} />
                    <label>Image Data:</label>
                    <input type="file" name="data" onChange={(e) => handleImageChange(index, e)} />
                </div>
            ))}
            <button type="button" onClick={handleAddImage}>Add Image</button>

            <button type="submit">Register Product</button>
        </form>
    );
};

export default ProductForm;