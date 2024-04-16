import React, {useState, useEffect} from 'react';
import { Navbar } from '../components';
import AuthService from '../services/AuthService';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons'
import { useFormik } from 'formik';
import * as yup from "yup";


const Checkout = () => {
    const [user, setUser] = useState({});

    const getUserData = async () => {
        let res;
        try{
          res = await AuthService.decodeUser();
          setUser(res.data);
        } catch (err) {
          console.error(err)
          return null;
        }
      }

      const validationSchema = yup.object({
        city: yup.string().required('City is Required'),
        address: yup.string().required('Address is Required'),
        postalCode: yup.string()
        .matches(/^[0-9]/, 'Postal Code must contain only numbers')
        .required('Postal Code is required'),
      });

      
      const formik = useFormik({
        initialValues: {
            // Preload user data into initialValues
            firstName: user.firstName || '', // Ensure to handle cases where user.firstName might be undefined
            lastName: user.lastName || '',
            email: user.email || '',
            phoneNumber: user.phoneNumber || '',
            city: '',
            address: '',
            postalCode: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            // Handle form submission here
            console.log(values);

        },
    });

      useEffect(() => {
        getUserData();
      }, [])

      //Second useEffect is to handle the form changes -- (to set initial pre-loaded user data)
      useEffect(() => {
        // Set formik initialValues when user data changes
        formik.setValues({
            firstName: user.firstName || '',
            lastName: user.lastName || '',
            email: user.email || '',
            phoneNumber: user.phoneNumber || '',
            city: '',
            address: '',
            postalCode: '',
        });
    }, [user]); // Listen for changes in the user state
    
    return (
        <div>
            <div className='flex w-full justify-center'>
                <Navbar />
            </div>

            <div className='profile-container flex justify-center w-full my-12'>
                <div className='profile-content w-[80%] justify-center md:flex'>
                    
                    <div className='w-[100%] flex '>
                        <div className='w-[100%] flex flex-col gap-10 justify-center md:my-12'>

                            <div className='flex w-full'>

                                <div className='flex md:w-[40%] flex-col'>

                                    <form onSubmit={formik.handleSubmit}>

                                        <h1 className='text-[#212121] pb-4 mb-8 border border-b-[#E0E0E0] border-l-0 border-r-0 border-t-0 font-semibold text-3xl'>
                                            Fatura e Adresimit
                                        </h1>

                                        <div className='flex mb-5 justify-start items-center'>
                                            <h2 className='w-[25%] md:w-[20%] text-sm md:text-base font-medium'>Emri: </h2>
                                            <input className='rounded-md w-[75%] md:w-[80%] text-sm md:text-base p-3 md:p-4 border bg-[#FBFCFDF0] border-[#E4E7EB]'
                                             type="text" name='firstName' disabled onChange={formik.handleChange} value={formik.values.firstName} />
                                        </div>

                                        <div className='flex mb-5 justify-start items-center'>
                                            <h2 className='w-[25%] md:w-[20%] text-sm md:text-base font-medium'>Mbiemri: </h2>
                                            <input className='rounded-md w-[75%] md:w-[80%] text-sm md:text-base p-3 md:p-4 border bg-[#FBFCFDF0] border-[#E4E7EB]'
                                             type="text" name='lastName' disabled onChange={formik.handleChange} value={formik.values.lastName} />
                                        </div>

                                        <div className='flex mb-5 justify-start items-center'>
                                            <h2 className='w-[25%] md:w-[20%] text-sm md:text-base font-medium'>Email: </h2>
                                            <input className='rounded-md w-[75%] md:w-[80%] text-sm md:text-base p-3 md:p-4 border bg-[#FBFCFDF0] border-[#E4E7EB]'
                                             type="text" name='email' disabled onChange={formik.handleChange} value={formik.values.email} />
                                        </div>

                                        <div className='flex mb-5 justify-start items-center'>
                                            <h2 className='w-[25%] md:w-[20%] text-sm md:text-base font-medium'>Nr. Telefonit: </h2>
                                            <input className='rounded-md w-[75%] md:w-[80%] text-sm md:text-base p-3 md:p-4 border bg-[#FBFCFDF0] border-[#E4E7EB]'
                                             type="text" name='phoneNumber' disabled onChange={formik.handleChange} value={formik.values.phoneNumber} />
                                        </div>

                                        <div className='flex mb-5 justify-start items-center'>
                                            <h2 className='w-[25%] md:w-[20%] text-sm md:text-base font-medium'>Qyteti: </h2>
                                            <input className='rounded-md w-[75%] md:w-[80%] text-sm md:text-base p-3 md:p-4 border bg-[#FBFCFDF0] border-[#E4E7EB]'
                                             type="text" name='city' onChange={formik.handleChange} value={formik.values.city} />
                                        </div>
                                             {formik.errors.city && formik.touched.city && 
                                            <h2 className='w-[50%] md:w-[60%] text-red-500 text-xs md:text-sm -mt-4 mx-auto'>{formik.errors.city}</h2>}

                                        <div className='flex mb-5 justify-start items-center'>
                                            <h2 className='w-[25%] md:w-[20%] text-sm md:text-base font-medium'>Adresa: </h2>
                                            <input className='rounded-md w-[75%] md:w-[80%] text-sm md:text-base p-3 md:p-4 border bg-[#FBFCFDF0] border-[#E4E7EB]'
                                             type="text" name='address' onChange={formik.handleChange} value={formik.values.address}/>
                                        </div>
                                             {formik.errors.address && formik.touched.address && 
                                            <h2 className='w-[50%] md:w-[60%] text-red-500 text-xs md:text-sm -mt-4 mx-auto'>{formik.errors.address}</h2>}

                                        <div className='flex justify-start mb-8 items-center'>
                                            <h2 className='w-[25%] md:w-[20%] text-sm md:text-base font-medium'>Kodi Postal: </h2>
                                            <input className='rounded-md w-[75%] md:w-[80%] text-sm md:text-base p-3 md:p-4 border bg-[#FBFCFDF0] border-[#E4E7EB]'
                                             type="text" name='postalCode' onChange={formik.handleChange} value={formik.values.postalCode}/>
                                        </div>
                                             {formik.errors.postalCode && formik.touched.postalCode && 
                                            <h2 className='w-[50%] md:w-[60%] text-red-500 text-xs md:text-sm -mt-4 mx-auto'>{formik.errors.postalCode}</h2>}

                                      <button type='submit' className='border-[#A3A7FC] bg-[#A3A7FC] rounded-md border-2 p-3 md:p-4 w-full md:w-[50%]  text-[#FFFFFF] shadow-xl hover:opacity-80'>
                                          Porosit
                                      </button>

                                 </form>

                                </div>

                            </div>

                            <div className='flex items-center'>
                                <FontAwesomeIcon icon={faChevronLeft} color='#828282'/>
                                <h2 className=' ml-3 text-[#828282]'><a href="/products/all">Back to Products</a></h2>
                            </div>

                        </div>
                    </div>          
                </div>
            </div>
        </div>

    )
}

export default Checkout

