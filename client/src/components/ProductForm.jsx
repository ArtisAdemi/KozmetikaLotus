import React, { useEffect, useState } from 'react';
import CategoryService from '../services/Categories';
import CategoriesInput from './CategoriesSelect';
import ProductService from '../services/Products';

const ProductFormModal = ({ closeModal, product }) => {
  const [formData, setFormData] = useState({
    title: product?.title || '',
    shortDescription: product?.shortDescription || '',
    longDescription: product?.longDescription || '',
    price: product?.price || '',
    categoryNames: product?.Categories?.map(category => category.name) || [], // Assuming Categories is an array of category objects
    images: [], // You'll need to handle pre-existing images separately
  });
  const [categories, setCategories] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState('');
  
  useEffect(() => {
    const fetchCategories = async () => {
      const result = await CategoryService.getCategories();
      if (result) {
        setCategories(result);
      } else {
        console.error('Unexpected response structure:', result);
        setCategories([]); // Fallback to ensure state remains valid
    }
    };
    fetchCategories();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    const newCategoryNames = checked
      ? [...formData.categoryNames, value]
      : formData.categoryNames.filter(name => name !== value);
    setFormData({ ...formData, categoryNames: newCategoryNames });
  };

  const addCategory = (e) => {
    e.preventDefault();
    if (newCategoryName.trim() && !categories.some(category => category.name === newCategoryName.trim())) {
      const updatedCategories = [...categories, { name: newCategoryName.trim() }];
      setCategories(updatedCategories);
      setFormData({ ...formData, categoryNames: [...formData.categoryNames, newCategoryName.trim()] });
      setNewCategoryName('');
    }
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, images: [...e.target.files] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if( product ) {
        await updateProduct();
    } else{
        await registerProduct();
    }
    closeModal();
  };

  const newProduct = {};

  const updateProduct = async () => {
    try {
        // Ensure you have a product ID to work with
        if (!product?.id) {
            throw new Error("Product ID is undefined");
        }
        const updatedProduct = {
            ...formData,
            // Convert price to a number, if necessary
            price: parseFloat(formData.price),
        };

        const res = await ProductService.updateProduct(product.id, updatedProduct);
        // Additional actions on successful update
    } catch (err) {
        console.error("Error updating product", err);
    }
};

  const registerProduct = async () => {
    let res;
    try{
      newProduct.title = formData.title;
      newProduct.shortDescription = formData.shortDescription;
      newProduct.longDescription = formData.longDescription;
      newProduct.price = formData.price;
      newProduct.categoryNames = formData.categoryNames;

      res = await ProductService.registerProduct(newProduct);
    } catch (err) {
      console.error("Error registering new product", err)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
    <div className="bg-white p-5 rounded-lg max-w-lg w-full space-y-4">
      <h2 className="text-xl font-semibold text-gray-900">Add New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
      <input type="text" name="title" onChange={handleInputChange} placeholder="Title" required className="input input-bordered w-full" value={formData.title} />
          <textarea name="shortDescription" onChange={handleInputChange} placeholder="Short Description" required className="textarea textarea-bordered w-full" value={formData.shortDescription}></textarea>
          <textarea name="longDescription" onChange={handleInputChange} placeholder="Long Description" required className="textarea textarea-bordered w-full" value={formData.longDescription}></textarea>
          <input type="number" name="price" onChange={handleInputChange} placeholder="Price" required className="input input-bordered w-full" value={formData.price} />
          {categories.map((category, index) => (
            <div key={index}>
              <input
                type="checkbox"
                id={`category-${index}`}
                value={category.name}
                checked={formData.categoryNames.includes(category.name)}
                onChange={handleCategoryChange}
              />
              <label htmlFor={`category-${index}`}>{category.name}</label>
            </div>
          ))}
          <div className="flex mt-2">
            <input
              type="text"
              placeholder="Add new category"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              className="flex-1"
            />
            <button type="button" onClick={addCategory}>Add</button>
          </div>
          <input type="file" multiple name="images" onChange={handleImageChange} className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer" />
          <div className="flex justify-end space-x-2">
            <button type="button" onClick={closeModal} className="btn btn-outline btn-accent">Cancel</button>
            <button type="submit" className="btn btn-primary">Add Product</button>
          </div>
        {/* More input fields and submission button */}
      </form>
    </div>
  </div>
  );
};

export default ProductFormModal;