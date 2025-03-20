import React from 'react'

export default function Footer() {
  return (
    <>
      <div className=''>
        
        <svg className="m-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 300"><path fill="#1c2229" fill-opacity="1" 
        d="M0,192L80,213.3C160,235,320,277,480,266.7C640,256,800,192,960,165.3C1120,139,1280,149,1360,
        154.7L1440,160L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,
        320L0,320Z"></path></svg>

        <div className='flex h-full bg-[#1c2229] text-white px-6 pb-6
          space-x-4 '>
          <div className='max-w-[300px]'>
            <p className='text-[40px] font-bold  text-white pb-2'>Let's talk! </p>
            <p className='text-sm pb-4'> Whether you're looking for your next job opportunity or
              seeking top talent for your team, we're here to help. 
              Our platform connects job seekers with employers, 
              making the hiring process seamless and efficient. 
              Reach out to us today and take the next step in your career journey</p>
            <button className='rounded-md bg-white p-2 text-[#1c2229]'>
              Ask Your question
            </button>
          </div>

          <div className='flex justify-evenly'>
            
            <div>

            </div>

          </div>
        </div>
      </div>
    </>
  )
}
