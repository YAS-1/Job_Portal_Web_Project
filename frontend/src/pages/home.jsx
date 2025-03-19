import {react } from 'react';
import { CiSearch } from "react-icons/ci";

export default function HomePage(){
  // const color = new Color("oklch(0.2533 0.016 252.42)");
  // console.log(color.hex);


  return(
    <>
    <section className=' h-screen font-[Roboto]'>

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

          <button className='text-black p-2 rounded-lg hover:text-white'>
            About Us 
          </button>

          <button className='text-black p-2 rounded-lg'>
            Signup 
          </button>

          <button className='bg-[#1c2229] text-white py-2 px-4 rounded-[50px]'>
            Login 
          </button>

        </nav>
      </div>


      <div className=''>
        
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 300"><path fill="#1c2229" fill-opacity="1" 
        d="M0,192L80,213.3C160,235,320,277,480,266.7C640,256,800,192,960,165.3C1120,139,1280,149,1360,
        154.7L1440,160L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,
        320L0,320Z"></path></svg>

        <div className='flex h-full bg-[#1c2229] text-white px-6 pb-6
          space-x-4'>
          <div className='max-w-[300px]'>
            <p className='text-[40px] font-bold  text-white pb-2'>Let's talk! </p>
            <p className='text-sm pb-4'> Whether you're looking for your next job opportunity or
              seeking top talent for your team, we're here to help. 
              Our platform connects job seekers with employers, 
              making the hiring process seamless and efficient. 
              Reach out to us today and take the next step in your career journey</p>
            <button className='rounded-md bg-white p-2 text-black'>
              Ask Your question
            </button>
          </div>

          <div className='flex justify-evenly'>
            
            <div>

            </div>

          </div>
        </div>
      </div>

    </section>

    </>
  );
}