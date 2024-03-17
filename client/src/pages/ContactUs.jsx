import contact from "../images/ContactUs.png";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import MailerService from "../services/Mailer";
import Navbar from "../components/Navbar";

const ContactUs = () => {
    const validationSchema = yup.object({
        email: yup.string().email('Invalid email format').required('Email is required'),
        name: yup.string().required('Name is required'),
        phone: yup.string().matches(/^[0-9]+$/, 'Phone must contain only numbers').required('Phone is required'),
        message: yup.string().required('Message is required'),
    });

    const formik = useFormik({
        initialValues: {
            email: '',
            name: '',
            phone: '', // Initialize phone with an empty string
            message: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            let userData = {
                name: values.name,
                email: values.email,
                phone: values.phone,
                message: values.message,
            };
            try {
                alert('Email sent successfully!');
                navigate('/');
                await MailerService.sendEmail(userData);
            } catch (error) {
                console.error('Error sending email:', error);
            }
        },
    });

    const navigate = useNavigate();

    return (
        <div>
            <div className='flex w-full justify-center'>
                <Navbar />
            </div>

            <div className='contact-container w-full flex justify-center my-12'>
                <div className='contact-content w-[80%] shadow-2xl justify-center flex' style={{ height: '800px' }}>
                    <div className='w-[100%] flex bg-[#FBEFF2] '>
                        <form onSubmit={formik.handleSubmit} className='w-[100%] flex flex-col gap-10 justify-center'>
                            <h1 className='text-[#A10550] text-3xl text-center'>Contact Us</h1>

                            <input className='rounded-md p-4 placeholder-gray-400 w-[60%] mx-auto'
                                type="text" name="name" placeholder="Name" onChange={formik.handleChange} value={formik.values.name} />
                            {formik.errors.name && formik.touched.name &&
                                <h2 className='w-[60%] text-red-500 text-sm -mt-10 mx-auto'>{formik.errors.name}</h2>}

                            <input className='rounded-md p-4 placeholder-gray-400 w-[60%] mx-auto'
                                type="email" name="email" placeholder="Email" onChange={formik.handleChange} value={formik.values.email} />
                            {formik.errors.email && formik.touched.email &&
                                <h2 className='w-[60%] text-red-500 text-sm -mt-10 mx-auto'>{formik.errors.email}</h2>}

                            <input className='rounded-md p-4 placeholder-gray-400 w-[60%] mx-auto'
                                type="text" name="phone" placeholder="Phone" onChange={formik.handleChange} value={formik.values.phone} />
                            {formik.errors.phone && formik.touched.phone &&
                                <h2 className='w-[60%] text-red-500 text-sm -mt-10 mx-auto'>{formik.errors.phone}</h2>}

                            <textarea style={{ resize: 'none' }} className='rounded-md p-4 placeholder-gray-400 w-[60%] mx-auto' cols="40" rows="5"
                                type="textarea" name="message" placeholder="Write something..." onChange={formik.handleChange} value={formik.values.message} />
                            {formik.errors.message && formik.touched.message &&
                                <h2 className='w-[60%] text-red-500 text-sm -mt-10 mx-auto'>{formik.errors.message}</h2>}

                            <button type="submit" className='border-[#A10550] border-2 p-3 w-[30%] mx-auto text-[#A10550] shadow-xl'>Contact Us</button>
                        </form>
                    </div>

                    <div className='w-[100%] h-[100%]'>
                        <img src={contact} alt="" className="w-[100%] h-[800px]" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
