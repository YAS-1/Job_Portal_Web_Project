import { React, useState } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import SignUpImage from '../assets/home_image2.jpg';
import { MdArrowOutward } from "react-icons/md";
import { FaRegUser } from "react-icons/fa6";
import { MdOutlineEmail } from "react-icons/md";
import { TbLockPassword } from "react-icons/tb";
import { toast } from 'react-toastify';
<<<<<<< HEAD
<<<<<<< HEAD
import axios from 'axios';
=======
>>>>>>> 9756ff4 (login&dashboard)
=======
<<<<<<< HEAD
>>>>>>> 9756ff4 (login&dashboard)
=======
>>>>>>> 07e52f4d505aba68923c93fddbe25282ac2cf86a
>>>>>>> 054d5ca1d6f40fc08d0757101cd8792dd83d6366

export default function Login() {
  const navigate = useNavigate();
  const homepage = () => navigate("/home");

  const signUpNavigate = useNavigate();
  const signUppage = ()=>signUpNavigate("/signup");

  const forgotPasswordNavigate = useNavigate();
  const forgotPassword = ()=>forgotPasswordNavigate("forgotpassword");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
<<<<<<< HEAD
<<<<<<< HEAD
  const handleSubmit = async(e) => {
=======
  const handleSubmit = (e) => {
>>>>>>> 9756ff4 (login&dashboard)
=======
  const handleSubmit = (e) => {
<<<<<<< HEAD
>>>>>>> 9756ff4 (login&dashboard)
=======
>>>>>>> 07e52f4d505aba68923c93fddbe25282ac2cf86a
>>>>>>> 054d5ca1d6f40fc08d0757101cd8792dd83d6366
    e.preventDefault();
    let newErrors = {};

    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Invalid email format";
    if (!formData.password.trim()) newErrors.password = "Password is required";

    setErrors(newErrors);

<<<<<<< HEAD
<<<<<<< HEAD
    if (Object.keys(newErrors).length === 0) {
      console.log("Form Data Submitted:", formData);
      try {
        const response = await axios.post("http://localhost:3337/api/auth/login", formData, {withCredentials: true});
        toast.success("Login successful");
        navigate("/home");
      } catch (error) {
        if (error.response){
          toast.error(error.response.data.message);
        } else {
          toast.error("An error occurred, please try again.");
        }
      }
=======
=======
<<<<<<< HEAD
>>>>>>> 9756ff4 (login&dashboard)
=======
>>>>>>> 07e52f4d505aba68923c93fddbe25282ac2cf86a
>>>>>>> 054d5ca1d6f40fc08d0757101cd8792dd83d6366
    // submit from hereeee
    if (Object.keys(newErrors).length === 0) {
      // console.log("Form Data Submitted:", formData);
      toast.success('Login successfull')
      navigate('/useraccount');
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> 9756ff4 (login&dashboard)
=======
=======
>>>>>>> 054d5ca1d6f40fc08d0757101cd8792dd83d6366
>>>>>>> 9756ff4 (login&dashboard)
=======
>>>>>>> 07e52f4d505aba68923c93fddbe25282ac2cf86a
    }
  };

  return (


    <div className='relative h-screen w-full flex items-center justify-center font-poppins'>
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

        <div className='w-[450px] bg-white rounded-[25px] p-4 text-md'>
          <div className='flex flex-col items-center justify-center'>
            <p className='text-[30px] font-bold text-[#1c2229]'>Welcome to JobFern</p>
            <p className='font-medium text-[15px] text-[#1c2229]/70 pb-4'>Login To Your Account</p>
          </div>

          <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white rounded-lg">
            {['email', 'password'].map((field, index) => (
              <div key={index} className="mb-6 relative">
                <label className="block text-sm font-medium text-[#1c2229]/70 capitalize">{field.replace("confirmpassword", "Confirm Password")}</label>
                <input
                  type={field.includes("password") ? "password" : "text"}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className={`w-full p-2 border rounded-md bg-[#f7f7fa] ${errors[field] ? 'border-red-500' : 'border-[#d7d5de]'}
                    focus:ring-0 focus:ring-white focus:outline-none transition duration-500
                    focus:border-[#4071ed] focus:shadow-md pl-10`}
                />
                <div className="absolute left-[10px] top-[33px]">
                  {field === "name" && <FaRegUser color='gray' />}
                  {field === "email" && <MdOutlineEmail color='gray' />}
                  {field.includes("password") && <TbLockPassword color='gray' size={20} />}
                </div>
                {errors[field] && <p className="text-red-500 text-xs mt-1">{errors[field]}</p>}
              </div>
            ))}

            <div className="w-full flex flex-row justify-end">
              <button type="button" className="text-[#4071ed] underline cursor-pointer" onClick={forgotPassword}>Forgot Password?</button>
            </div>

            <button type="submit" className="w-full bg-[#4071ed]/90 text-white py-2 rounded-md my-4 
            cursor-pointer">Submit</button>

            <div className="w-full flex flex-row justify-center space-x-2">
              <p className="text-[#1c2229]/80">Don't have an account?</p>
              <button className="text-[#4071ed] underline cursor-pointer" onClick={signUppage}>Sign up</button>
            </div>
          </form>
        </div>
      </div>

      <Outlet />
    </div>
  );
<<<<<<< HEAD
<<<<<<< HEAD
}
=======
}
>>>>>>> 9756ff4 (login&dashboard)
=======
}
<<<<<<< HEAD
>>>>>>> 9756ff4 (login&dashboard)
=======
>>>>>>> 07e52f4d505aba68923c93fddbe25282ac2cf86a
>>>>>>> 054d5ca1d6f40fc08d0757101cd8792dd83d6366
