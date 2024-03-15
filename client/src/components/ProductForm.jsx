import React, { useEffect, useState } from 'react';
import CategoryService from '../services/Categories';
import CategoriesInput from './CategoriesSelect';
import ProductService from '../services/Products';

const ProductFormModal = ({ closeModal }) => {
  const [formData, setFormData] = useState({
    title: '',
    shortDescription: '',
    longDescription: '',
    price: '',
    categoryNames: [],
    images: [],
  });
  const [categories, setCategories] = useState([]);
  const [categoryNames, setCategoryNames] = useState([]);

  const handleCategoriesUpdate = (selectedCategories) => {
    setFormData({ ...formData, categoryNames: selectedCategories });
  };
  
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

  const handleCategoryChange = (newValue, actionMeta) => {
    setFormData({ ...formData, categoryNames: newValue });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, images: [...e.target.files] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    registerProduct();
    closeModal();
  };

  const newProduct = {};

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
          <input type="text" name="title" onChange={handleInputChange} placeholder="Title" required className="input input-bordered w-full" />
          <textarea name="shortDescription" onChange={handleInputChange} placeholder="Short Description" required className="textarea textarea-bordered w-full"></textarea>
          <textarea name="longDescription" onChange={handleInputChange} placeholder="Long Description" required className="textarea textarea-bordered w-full"></textarea>
          <input type="number" name="price" onChange={handleInputChange} placeholder="Price" required className="input input-bordered w-full" />
          <CategoriesInput categoriesFromBackend={categories.map(category => category.name)} onUpdate={handleCategoriesUpdate}/>
          <input type="file" multiple name="images" onChange={handleImageChange} className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer" />
          <div className="flex justify-end space-x-2">
            <button type="button" onClick={closeModal} className="btn btn-outline btn-accent">Cancel</button>
            <button type="submit" className="btn btn-primary">Add Product</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductFormModal;