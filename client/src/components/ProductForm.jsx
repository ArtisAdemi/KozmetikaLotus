import React, { useEffect, useState } from 'react';
import CategoryService from '../services/Categories';
import ProductService from '../services/Products';

const ProductFormModal = ({ closeModal, product }) => {
  const [formData, setFormData] = useState({
    title: product?.title || '',
    shortDescription: product?.shortDescription || '',
    longDescription: product?.longDescription || '',
    price: product?.price || '',
    brandName: '',
    subCategoryId: 0, // Changed from subCategoryIds to subCategoryId
    images: [],
  });
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [subCategories, setSubCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState('')

  useEffect(() => {
    const fetchBrands = async () => {
      await ProductService.getBrands().then((brands) => {
        setBrands(brands);
      });
    }
    const fetchCategories = async () => {
      const result = await CategoryService.getCategories();
      if (result) {
        setCategories(result);
        const subCategoriesData = await CategoryService.getSubcategories(result[0].id).then((subCategories) => {
          setSubCategories(subCategories)
        });
      } else {
        console.error('Unexpected response structure:', result);
        setCategories([]); // Fallback to ensure state remains valid
      }
    };
    fetchBrands();
    fetchCategories();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleCategorySelect = async (e) => {
    const categoryId = e.target.value;
    setSelectedCategory(categoryId);
    const subCategoriesData = await CategoryService.getSubcategories(categoryId);
    setSubCategories(subCategoriesData);
  };

  const handleBrandSelect = async (e) => {
    const brandName = e.target.value;
    setFormData({... formData, brandName: brandName});
    setSelectedBrand(brandName);
  };
  
  const handleSubCategoryChange = (e) => {
    const { name, value } = e.target;
    setFormData({... formData, [name]: value});
  };


  const handleImageChange = (e) => {
    setFormData({ ...formData, images: Array.from(e.target.files) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { images, ...productData } = formData;

    if (product) {
        await updateProduct();
    } else {
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
      <input type="text" name="title" onChange={handleInputChange} placeholder="Title" required className="input input-bordered w-full" value={formData.title} />
          <textarea name="shortDescription" onChange={handleInputChange} placeholder="Short Description" required className="textarea textarea-bordered w-full" value={formData.shortDescription}></textarea>
          <textarea name="longDescription" onChange={handleInputChange} placeholder="Long Description" required className="textarea textarea-bordered w-full" value={formData.longDescription}></textarea>
          <div className="flex items-center border border-gray-300 rounded-lg input-bordered w-full">
            <input
                type="number"
                name="price"
                onChange={handleInputChange}
                placeholder="Price"
                required
                className="flex-grow p-2 focus:outline-none"
                value={formData.price} // Ensure only numeric value is in state
            />
            <span className="p-2">€</span>
        </div>
          <div className='pt-3'>
          <span className='text-gray-500'>Brand</span>
          <select onChange={handleBrandSelect} name="brandName" value={selectedBrand} className="select select-bordered w-full">
            {/* Brands */}
            {brands.map((brand) => (
              <option key={brand.id} value={brand.name}>{brand.name}</option>
              ))}
          </select>
          </div>
          {/* Categories */}
          <div>
          <span className='text-gray-500'>Kategori</span>
          <select onChange={handleCategorySelect} value={selectedCategory} className="select select-bordered w-full">
            {categories.map((category) => (
              <option key={category.id} value={category.id}>{category.name}</option>
              ))}
          </select>
          </div>
          <div>
            {subCategories.length > 0 &&
              <span className='text-gray-500'>Nen Kategorite</span>
            }
            {/* Sub Categories */}
            {subCategories.map((subCategory, index) => (
              
                <div key={index}>
                    <input
                        type="radio"
                        name="subCategoryId"
                        id={`subCategory-${index}`}
                        value={subCategory.id}
                        onChange={handleSubCategoryChange}
                    />
                    <label htmlFor={`subCategory-${index}`}>{subCategory.name}</label>
                </div>
            ))}
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