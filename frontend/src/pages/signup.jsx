import React from 'react'
import { useNavigate } from 'react-router-dom'
import SignUpImage from '../assets/home_image2.jpg'
import { MdArrowOutward } from "react-icons/md";

export default function SignUp() {
  const navigate = useNavigate();
  const homepage = ()=>{

    navigate("/home");

  }

  return (
    <>
    <div className={`'relative h-screen w-full items-center justify-center  font-poppins`}>
      <img src={SignUpImage} alt="Background Image" className="w-screen h-screen
        object-cover absolute "/>
        <div className='absolute flex w-full h-full top-0 left-0 space-x-[60px] 
            items-center justify-center z-20 bg-black/80'>

        <div className='absolute top-[10px] left-[10px]'>
          <div className='flex'>
            <p className='text-[40px] font-bold text-white'>Job</p> 
            <p className='text-[30px] font-bold text-[#4071ed]'>Fern</p>
          </div>
        </div>

        <div className='absolute top-[20px] right-[10px]'>
          <button className='flex font-medium bg-[#4071ed] text-white rounded-md p-2
          hover:bg-white hover:text-[#4071ed] transition duration-500 
          items-center justify-center space-x-2' 
          onClick={homepage}>
            <p>Go to main page</p>
            <MdArrowOutward size={20}/>
          </button>
        </div>

        <div className='w-[500px] bg-white rounded-[12px] p-4
        text-md' >
          
          <div className='flex flex-col items-center justify-center space-x-2'>
            <p className='font-bold text-[#1c2229]'>Create your account</p>
            <p className='font-medium text-[15px] text-[#1c2229]/70'>Simply fill out the form below to get started</p>
          </div>
        </div>

      </div>
    </div>
    </>
  )
}
