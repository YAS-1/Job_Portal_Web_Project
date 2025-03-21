import {react, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import { CiSearch } from "react-icons/ci";

import HomeImage from '../assets/home_image3.jpg'
import JobList from '../components/homePage/availablejobs';
import Footer from '../components/homePage/footer';
import WhyChooseUs from '../components/homePage/whyChooseUs';



export default function HomePage(){

  const navigate = useNavigate()
  const handleSignup = () => {
    navigate("/signup"); // Redirect to signup page
  };

  const handleLogin = () =>{
    navigate('/login')
  }

  return(
    <>
    <section className='h-screen font-[Roboto] '>

      <div className='absolute top-[10px] left-[10px]'>
        <div className='flex'>
          <p className='text-[30px] font-bold'>Job</p> 
          <p className='text-[20px] font-bold text-[#4071ed]'>Fern</p>
        </div>
      </div>

      <div className='p-4 flex'>

        <div className='flex w-full items-center justify-end relative'>
          <input type="text" className='w-[350px] p-[10px] bg-[#f2f2f5] rounded-[50px] pl-6
          placeholder:text-sm focus:ring-2 focus:ring-[#4071ed] focus:outline-none transition duration-500' 
          placeholder='What job are you looking for?'/>

          <button className='absolute right-2 flex items-center justify-center bg-[#4071ed] rounded-full 
          p-2 '>
            <CiSearch color='white'/>
          </button>

          

        </div>

        <nav className='flex flex-row w-full justify-end space-x-4 font-medium'>

          <button className='text-black p-2 rounded-lg hover:text-white 
          cursor-pointer'>
            About Us 
          </button>

          <button className='text-black p-2 rounded-lg cursor-pointer' onClick={handleSignup}>
            Signup 
          </button>

          <button className='bg-[#1c2229] text-white py-2 px-4 rounded-[50px] 
          cursor-pointer' onClick={handleLogin}>
            Login 
          </button>

        </nav>


      </div>

      <div className='relative h-[600px] welcome-text'>
        <img src={HomeImage} alt="Background Image" className="w-full h-full object-cover absolute" loading="lazy"/>
        <div className='absolute flex w-full h-full top-0 left-0 space-x-[60px] 
            items-center justify-center bg-black/70'>

        </div>
        <div className=' text-white font-extrabold absolute top-20 left-10 w-[500px] z-20'>
          <p className='w-full bg-[#4071ed] h-2 '></p>
          <p className='text-[40px] pb-10 welcome-text overflow-auto'>It's enough with the job hunt struggles, we're here to help. 
            Land your next role with JobFern!</p>
          <button className='font-medium bg-[#4071ed] text-white rounded-md p-4 
          hover:bg-white hover:text-[#4071ed] transition duration-500 cursor-pointer' 
          onClick={handleSignup}>
            Signup Now!
          </button>
        </div>


      </div>

      <JobList/>

      <WhyChooseUs />

      <Footer/>



    </section>

    </>
  );
}