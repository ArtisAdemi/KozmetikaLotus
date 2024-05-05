import axios from 'axios';
import buildUrl from '../helpers/BuildParam';
import Swal from 'sweetalert2';
const API_URL = 'http://localhost:3001/api/products';

// Create an axios instance for authenticated requests
const axiosInstance = axios.create({
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
});

const ProductService = {
    getProducts: async () => {
        try{

            const response = await axios.get(`${API_URL}`);
            return response.data;
        } catch (err) {
            console.error('Error fetching products:', err);
            return null
        }
    },

    getProductById: async(id) => {
        try{
            const response = await axios.get(`${API_URL}/${id}`)
            return response.data
        } catch (err){
            console.error('Error fetching products:', err);
            return null
        }
    },



    // Shembull qysh me kriju modelin per me perdore funksionin ma poshte
    // const filterModel = {
    //     category: 'example',
    //     name: 'example'
    //     page: 1,
    //     limit: 12,
    // }

    getProductsByFilter: async(filterModel) => {
        let endpoint = `${API_URL}?`;
        try {
            let params = {};
            if (filterModel.subCategory) {
                const subCategory = filterModel.subCategory.toLowerCase();
                params['subCategory'] = subCategory;
            }
            if (filterModel.name) {
                params['productName'] = filterModel.name;
            }
            if (filterModel.page) {
                params['page'] = filterModel.page;
            }
            if (filterModel.limit) {
                params['limit'] = filterModel.limit;
            }
            endpoint += buildUrl(params);
    
            const response = await axios.get(endpoint);
            return response.data;
        } catch (err) {
            console.error('Error fetching products: ', err);
            return null;
        }
    },

    // Get 1 product per Category
    
    getUniqueCategory: async () => {
        try{
            const response = await axios.get(`${API_URL}/productPerCategory`);
            return response;
        } catch (err) {
            console.error('Error fetching products:', err);
            return null
        }
    },

    // Product images
    getProductImages: async (productId) => {
        try{
            const res = await axios.get(`${API_URL}/${productId}/images`);
            return res.data;
        } catch (err) {
            console.error('Error fetching images', err);
            return [];
        }
    },
    
    registerProduct: async (productData, images) => {
    const formData = new FormData();
    // Append product data fields to formData, excluding categoryNames
    Object.keys(productData).forEach(key => {
            if (Array.isArray(productData[key])) {
                // If the value is an array, append each item individually
                productData[key].forEach(item => {
                    formData.append(`${key}[]`, item);
                });
            } else {
                // For non-array values, append them as before
                formData.append(key, productData[key]);
            }
    });
    
    // Append images to formData
    images.forEach(image => {
        formData.append('uploadedFiles', image);
    });
    
    try {
        const response = await axiosInstance.post(`${API_URL}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })

        return response.data;
    } catch (err) {
        console.error('Error registering product:', err);
        Swal.fire({
            title: "Error!",
            text: `${err.message}`,
            icon: "error",
            confirmButtonText: "Ok"
          })
        return null;
    }
},

    updateProduct: async (productId, productData) => {
        try {
            const response = await axiosInstance.put(`${API_URL}/${productId}`, productData);
            return response.data;
        } catch (err) {
            console.error('Error updating product:', err);
            Swal.fire({
                title: "Error!",
                text: "Product could not be saved",
                icon: "error",
                confirmButtonText: "Ok"
              })
            return null;
        }
    },

    deleteProduct: async (productId) => {
        try{
            const response = await axiosInstance.delete(`${API_URL}/${productId}`).then(() => {
                Swal.fire({
                    title: "Success!",
                    text: "Product was deleted successfully",
                    icon: "success",
                    confirmButtonText: "Ok"
                  })
            })
            return response;
        } catch (err){
            Swal.fire({
                title: "Error!",
                text: "Product could not be deleted",
                icon: "error",
                confirmButtonText: "Ok"
              })
            console.error('Error deleting product:', err);
            return null
        }
    },

    getBrands: async () => {
        try{
            const res = await axios.get(`${API_URL}/brands`);
            return res.data;
        } catch (err) {
            console.error('Error fetching images', err);
            return [];
        }
    },

    remindMeWhenInStock: async (productId, remindMe) => {
        try{
            console.log("productId in service", productId)
            console.log("remindMe in service", remindMe)
            const res = await axios.post(`${API_URL}/remindWhenInStock`, {
                productId: productId,
                remindMe: remindMe
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            return res.data
        } catch (err) {
            console.error('Error fetching images', err);
            return null;
        }
    }

};

export default ProductService;