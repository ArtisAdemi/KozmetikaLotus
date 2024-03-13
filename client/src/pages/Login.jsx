import contact from "../images/ContactUs.png";
import { useFormik } from "formik";
import * as yup from "yup";

const Login = () => {

    const validationSchema = yup.object({
        email: yup.string().email('Invalid email format').required('Email is required'),
        password: yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
        });

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            // Handle form submission here
            console.log(values);
        },
    });


    return (
        <div>
            <div className='contact-container w-full flex justify-center my-12'>
                <div className='contact-content w-[80%] shadow-2xl justify-center flex' style={{ height: '800px' }}>
                    
                    <div className='w-[100%] flex bg-[#FBEFF2] '>

                        <form onSubmit={formik.handleSubmit} className='w-[100%] flex flex-col gap-10 justify-center'>

                            <h1 className='text-[#A10550] text-3xl text-center'>Login</h1>

                            <input className='rounded-md p-4 placeholder-gray-400 w-[60%] mx-auto'
                            type="email" name="email" placeholder="Email" onChange={formik.handleChange} value={formik.values.email} />
                            {formik.errors.email && formik.touched.email && 
                            <h2 className='w-[60%] text-red-500 text-sm -mt-10 mx-auto'>{formik.errors.email}</h2>}
   
                            <input className='rounded-md p-4 placeholder-gray-400 w-[60%] mx-auto' 
                            type="password" name="password" placeholder="Password" onChange={formik.handleChange} value={formik.values.password} />
                            {formik.errors.password && formik.touched.password && 
                            <h2 className='w-[60%] text-red-500 text-sm -mt-10 mx-auto'>{formik.errors.password}</h2>}
                            
                            <button className='border-black border-2 p-3 w-[30%] mx-auto text-[#0C0C0C] shadow-xl'>Login</button>

                        </form>

                    </div>

                    <div className='w-[100%] h-[100%]'>
                      <img src={contact} alt="" className="w-[100%] h-[800px]"  />
                    </div>
          
                </div>
            </div>
        </div>
    )
}

export default Login

