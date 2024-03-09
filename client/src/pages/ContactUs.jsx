import React from 'react'
import { Navbar } from '../components'
import contact from "../images/ContactUs.png"

const ContactUs = () => {
  
  return (
    <div>
      <div className='flex w-full justify-center'>
        <Navbar />
      </div>

      <div className='contact-container w-full flex justify-center my-12'>
        <div className='contact-content w-[80%] shadow-2xl justify-center  flex' style={{ height: '800px' }}>
          <div className='w-[100%] flex flex-col bg-[#FBEFF2] gap-10 p-5 justify-center'>

            <h1 className='text-[#A10550] text-3xl text-center'>Contact Us</h1>
            <input className='rounded-md p-4 placeholder-gray-400 w-[60%] mx-auto' type="text" name="name" placeholder='Name' id="" required />
            <input className='rounded-md p-4 placeholder-gray-400 w-[60%] mx-auto' type="email" name="email" placeholder='Email' id="" required />
            <input className='rounded-md p-4 placeholder-gray-400 w-[60%] mx-auto' type="number" name="number" placeholder='Number' id="" required />
            
            <textarea style={{resize: 'none'}} className='rounded-md p-4 w-[60%] mx-auto' name="textarea" placeholder='Write something...' id="" cols="40" rows="5"></textarea>

            <button className='border-black border-2 p-3 w-[30%] mx-auto text-[#0C0C0C] shadow-xl'>Contact Us</button>

          </div>

          <div className='w-[100%] h-[100%]'>
            <img src={contact} alt="" className="w-[100%] h-[800px]"  />
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default ContactUs