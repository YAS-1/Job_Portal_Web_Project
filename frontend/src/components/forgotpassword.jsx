import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SignUpImage from '../assets/home_image2.jpg';
import { MdArrowOutward } from "react-icons/md";
import { MdOutlineEmail } from "react-icons/md";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const homepage = () => navigate("/home");
  
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  // Handle input change
  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setError("Email is required");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Invalid email format");
    } else {
      setError("");
      console.log("Requesting OTP for:", email);
    }
  };

  return (
    <div className='relative h-screen w-full flex items-center justify-center font-poppins'>
      <img src={SignUpImage} alt="Background Image" className="w-screen h-screen object-cover absolute" />
      <div className='absolute flex w-full h-full top-0 left-0 space-x-[60px] items-center justify-center z-20 bg-black/80'>

        <div className='absolute top-[10px] left-[10px]'>
          <div className='flex'>
            <p className='text-[40px] font-bold text-white'>Job</p>
            <p className='text-[30px] font-bold text-[#4071ed]'>Fern</p>
          </div>
        </div>

        <div className='absolute top-[20px] right-[10px]'>
          <button className='flex font-medium bg-[#4071ed] text-white rounded-md p-2 hover:bg-white hover:text-[#4071ed] transition duration-500 items-center justify-center space-x-2' 
            onClick={homepage}>
            <p>Go to main page</p>
            <MdArrowOutward size={20} />
          </button>
        </div>

        <div className='w-[450px] bg-white rounded-[25px] p-4 text-md'>
          <div className='flex flex-col items-center justify-center'>
            <p className='text-[30px] font-bold text-[#1c2229]'>Forgot Password?</p>
            <p className='font-medium text-[15px] text-[#1c2229]/70 pb-4'>Enter your email to receive an OTP</p>
          </div>

          <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white rounded-lg">
            <div className="mb-6 relative">
              <label className="block text-sm font-medium text-[#1c2229]/70">Email</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={handleChange}
                className={`w-full p-2 border rounded-md bg-[#f7f7fa] ${error ? 'border-red-500' : 'border-[#d7d5de]'}
                  focus:ring-0 focus:ring-white focus:outline-none transition duration-500
                  focus:border-[#4071ed] focus:shadow-md pl-10`}
              />
              <div className="absolute left-[10px] top-[33px]">
                <MdOutlineEmail color='gray' />
              </div>
              {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
            </div>

            <button type="submit" className="w-full bg-[#4071ed]/90 text-white py-2 rounded-md my-4 cursor-pointer">Send OTP</button>
          </form>
        </div>
      </div>
    </div>
  );
}
