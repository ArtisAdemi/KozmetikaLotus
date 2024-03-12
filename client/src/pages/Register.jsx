import contact from "../images/ContactUs.png";

const Register = () => {
    return (
        <div>
            <div className='contact-container w-full flex justify-center my-12'>
                <div className='contact-content w-[80%] shadow-2xl justify-center flex' style={{ height: '800px' }}>

                    <div className='w-[100%] flex flex-col bg-[#FBEFF2] gap-10 p-5 justify-center'>

                        <h1 className='text-[#A10550] text-3xl text-center'>Register</h1>
                        <input className='rounded-md p-4 placeholder-gray-400 w-[60%] mx-auto' type="email" name="name" placeholder='Email' id="" required />
                        <input className='rounded-md p-4 placeholder-gray-400 w-[60%] mx-auto' type="text" name="text" placeholder='Username' id="" required />
                        <input className='rounded-md p-4 placeholder-gray-400 w-[60%] mx-auto' type="text" name="role" placeholder='Role' id="" required />
                        <input className='rounded-md p-4 placeholder-gray-400 w-[60%] mx-auto' type="password" name="password" placeholder='Password' id="" required />
            
                        
                        <button className='border-black border-2 p-3 w-[30%] mx-auto text-[#0C0C0C] shadow-xl'>Register</button>

                    </div>

                    <div className='w-[100%] h-[100%]'>
                      <img src={contact} alt="" className="w-[100%] h-[800px]"  />
                    </div>
          
                </div>
            </div>
        </div>
    )
}

export default Register

