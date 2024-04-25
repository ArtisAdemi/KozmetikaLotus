import React, { useEffect, useState } from 'react';
import CategoryService from '../services/Categories';
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
    setFormData({ ...formData, images: Array.from(e.target.files) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { images, ...productData } = formData;

    if( product ) {
        await updateProduct();
    } else{
        await ProductService.registerProduct(productData, images);
    }
    closeModal();
  };


  const updateProduct = async () => {
    try {
        if (!product?.id) {
            throw new Error("Product ID is undefined");
        }
        const updatedProduct = {
            ...formData,
            price: parseFloat(formData.price),
        };

        const res = await ProductService.updateProduct(product.id, updatedProduct);
    } catch (err) {
        console.error("Error updating product", err);
    }
};

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
    <div className="bg-white p-5 rounded-lg max-w-lg w-full space-y-4">
      <h2 className="text-xl font-semibold text-gray-900">Add New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
      <input type="text" name="title" onChange={handleInputChange} placeholder="Title" required className="input p-3 input-bordered w-full" value={formData.title} />
          <textarea name="shortDescription" onChange={handleInputChange} placeholder="Short Description" required className="textarea px-3  textarea-bordered w-full" value={formData.shortDescription}></textarea>
          <textarea name="longDescription" onChange={handleInputChange} placeholder="Long Description" required className="textarea px-3  textarea-bordered w-full" value={formData.longDescription}></textarea>
          <input type="number" name="price" onChange={handleInputChange} placeholder="Price" required className="input p-3 input-bordered w-full" value={formData.price} />
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
          <div className="flex justify-between mt-2 w-full">
            <input
              type="text"
              placeholder="Add new category"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              className="p-3 w-2/3"
            />
            <button type="button" onClick={addCategory} className='btn md:w-[20%] btn-primary border rounded-lg py-3 px-6 bg-green-700 text-white hover:opacity-80'>
              Add
            </button>
          </div>
          <input type="file" multiple name="images" onChange={handleImageChange} className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer" />
          <div className="flex justify-end space-x-2">
            <button type="button" onClick={closeModal} className="btn btn-outline btn-accent border rounded-lg p-3 bg-[#A3A7FC] text-white hover:opacity-80">Cancel</button>
            <button type="submit" className="btn btn-primary border rounded-lg py-3 px-6 bg-green-700 text-white hover:opacity-80">Add Product</button>
          </div>
        {/* More input fields and submission button */}
      </form>
    </div>
  </div>
  );
};

export default ProductFormModal;