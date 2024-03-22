import React from 'react'
import InstagramIcon from '../Icons/InstagramIcon'
import FacebookIcon from '../Icons/FacebookIcon'
import TwitterIcon from '../Icons/TwitterIcon'
import LocationIcon from '../Icons/LocationIcon'
import Indicator from '../Icons/Indicator'
import LotusIcon from '../Icons/LotusIcon'



const Footer = () => {
  return (
    <div className="bg-[#3D021E] text-white">
        <div className='ml-9 pt-4'>
            <div className='text-3xl font-bold'>
            <LotusIcon/>
            </div>
        </div>
    <div className="flex justify-between p-5">
        <div className="space-y-4 p-4">
            <div>
                <h2 className="font-bold text-lg">How Can We Help?</h2>
                <p><a href="/">Home</a></p>
                <p><a href="/about">About Us</a></p>
                <p><a href="/categories">Categories</a></p>
                <p><a href="/contact">Contact Us</a></p>
            </div>
        </div>
        <div className="space-y-4 p-4">
            <div>
                <h2 className="font-bold text-lg">Products</h2>
                <p><a href="/women-make-up">Women Make Up</a></p>
                <p><a href="/women-skincare">Women Skincare</a></p>
                <p><a href="/gifts-sets">Gifts & Sets</a></p>
            </div>
        </div>
        <div className="space-y-4 max-w-[600px] p-4">
            <h2 className="font-bold text-lg">About Us</h2>
            <p>Ne besojmë në rëndësinë e kujdesit të lëkurës prandaj ofrojmë produkte të specializuara për të mbajtur lëkurën të shëndetshme dhe të freskët.</p>
        </div>
    </div>
    <div className="bg-[#280114] flex justify-between items-center p-5 w-full">
        <div className='flex justify-center w-[50%]'>
            <div className='flex justify-around]'>
                <LocationIcon />
                <p className='mr-4'>Rruga..., Ferizaj </p>
                <Indicator />
                <p className='ml-4'> 044-233-233</p>
            </div>
        </div>
        <div className='flex mr-6 w-[50%] justify-center'>
            <div className='flex'>
            <InstagramIcon />
            <FacebookIcon />
            <TwitterIcon />
            </div>
        </div>
    </div>
    <div className='bg-[#14010A] text-center'>
            <span>© 2024 ProSolutions. All Rights Reserved.</span>
    </div>
</div>
  )
}

export default Footer