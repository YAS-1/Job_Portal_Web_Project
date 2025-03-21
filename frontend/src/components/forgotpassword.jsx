import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SignUpImage from '../assets/home_image2.jpg';
import { MdArrowOutward } from "react-icons/md";
import { MdOutlineEmail } from "react-icons/md";
import { TbLockPassword } from "react-icons/tb";
import { MdLockClock } from "react-icons/md"; // Import for OTP icon
import { toast } from 'react-toastify';

export default function ForgotPassword() {
  const navigate = useNavigate();
  const homepage = () => navigate("/home");

  const loginNavigate = useNavigate();
  const loginpage = () => loginNavigate("/login");

  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [otpSent, setOtpSent] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle OTP submission
  const handleOtpSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};

    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Invalid email format";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      toast.success(`We have sent an OTP to ${formData.email}`)
      setOtpSent(true); // Show OTP fields after email is validated
    }
  };

  // Handle reset password form submission
  const handleResetPasswordSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};

    if (!formData.otp.trim()) newErrors.otp = "OTP is required";
    if (!formData.newPassword.trim()) newErrors.newPassword = "New password is required";
    if (formData.newPassword !== formData.confirmNewPassword) newErrors.confirmNewPassword = "Passwords do not match";

    setErrors(newErrors); 

    // WHEN ALL IS GOOD BACK TO LOGIN PAGE
    if (Object.keys(newErrors).length === 0) {
      console.log("Password reset successful");
      loginpage() //back to login page
    }
  };

  // Resend OTP handler
  const handleResendOtp = () => {
    setFormData({ ...formData, otp: "" }); // Clear OTP input field
    setErrors({}); // Clear any previous errors
    toast.success(`We have resent an OTP to ${formData.email}`)
  };

  return (
    <div className="relative h-screen w-full flex items-center justify-center font-poppins">
      <img
        src={SignUpImage}
        alt="Background Image"
        className="w-screen h-screen object-cover absolute"
      />
      <div className="absolute flex w-full h-full top-0 left-0 space-x-[60px] items-center justify-center z-20 bg-black/80">
        <div className="absolute top-[10px] left-[10px]">
          <div className="flex">
            <p className="text-[40px] font-bold text-white">Job</p>
            <p className="text-[30px] font-bold text-[#4071ed]">Fern</p>
          </div>
        </div>

        <div className="absolute top-[20px] right-[10px]">
          <button
            className="flex font-medium bg-[#4071ed] text-white rounded-md p-2 hover:bg-white hover:text-[#4071ed] transition duration-500 items-center justify-center space-x-2 cursor-pointer"
            onClick={homepage}
          >
            <p>Go to main page</p>
            <MdArrowOutward size={20} />
          </button>
        </div>

        <div className="w-[450px] bg-white rounded-[25px] p-4 text-md">
          <div className="flex flex-col items-center justify-center">
            <p className="text-lg font-bold text-[#1c2229]">Forgot Password</p>
            <p className="font-medium text-[15px] text-[#1c2229]/70">
              Enter your email to receive an OTP
            </p>
          </div>

          {!otpSent ? (
            // First stage: Email input to send OTP
            <form onSubmit={handleOtpSubmit} className="max-w-md mx-auto p-4 bg-white rounded-lg">
              <div className="mb-6 relative">
                <label className="block text-sm font-medium text-[#1c2229]/70">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full p-2 border rounded-md bg-[#f7f7fa] ${
                    errors.email ? "border-red-500" : "border-[#d7d5de]"
                  } focus:ring-0 focus:ring-white focus:outline-none transition duration-500 focus:border-[#4071ed] focus:shadow-md pl-10`}
                />
                <div className="absolute left-[10px] top-[33px]">
                  <MdOutlineEmail color="gray" />
                </div>
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              <button
                type="submit"
                className="w-full bg-[#4071ed]/90 text-white py-2 rounded-md my-4 cursor-pointer"
              >
                Send OTP
              </button>
            </form>
          ) : (
            // Second stage: OTP input and reset password
            <form
              onSubmit={handleResetPasswordSubmit}
              className="max-w-md mx-auto p-4 bg-white rounded-lg"
            >
              <div className="mb-6 relative">
                <label className="block text-sm font-medium text-[#1c2229]/70">OTP</label>
                <input
                  type="text"
                  name="otp"
                  value={formData.otp}
                  onChange={handleChange}
                  className={`w-full p-2 border rounded-md bg-[#f7f7fa] ${
                    errors.otp ? "border-red-500" : "border-[#d7d5de]"
                  } focus:ring-0 focus:ring-white focus:outline-none transition duration-500 focus:border-[#4071ed] focus:shadow-md pl-10`}
                />
                <div className="absolute left-[10px] top-[33px]">
                  <MdLockClock color="gray" />
                </div>
                {errors.otp && <p className="text-red-500 text-xs mt-1">{errors.otp}</p>}
              </div>

              <div className="mb-6 relative">
                <label className="block text-sm font-medium text-[#1c2229]/70">New Password</label>
                <input
                  type="password"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  className={`w-full p-2 border rounded-md bg-[#f7f7fa] ${
                    errors.newPassword ? "border-red-500" : "border-[#d7d5de]"
                  } focus:ring-0 focus:ring-white focus:outline-none transition duration-500 focus:border-[#4071ed] focus:shadow-md pl-10`}
                />
                <div className="absolute left-[10px] top-[33px]">
                  <TbLockPassword color="gray" />
                </div>
                {errors.newPassword && (
                  <p className="text-red-500 text-xs mt-1">{errors.newPassword}</p>
                )}
              </div>

              <div className="mb-6 relative">
                <label className="block text-sm font-medium text-[#1c2229]/70">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  name="confirmNewPassword"
                  value={formData.confirmNewPassword}
                  onChange={handleChange}
                  className={`w-full p-2 border rounded-md bg-[#f7f7fa] ${
                    errors.confirmNewPassword ? "border-red-500" : "border-[#d7d5de]"
                  } focus:ring-0 focus:ring-white focus:outline-none transition duration-500 focus:border-[#4071ed] focus:shadow-md pl-10`}
                />
                <div className="absolute left-[10px] top-[33px]">
                  <TbLockPassword color="gray" />
                </div>
                {errors.confirmNewPassword && (
                  <p className="text-red-500 text-xs mt-1">{errors.confirmNewPassword}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-[#4071ed]/90 text-white py-2 rounded-md mt-4 cursor-pointer"
              >
                Reset Password
              </button>

              {/* Resend OTP */}
              <div className="w-full flex flex-row justify-center space-x-2 mt-4">
                <p className="text-[#1c2229]/70">Didn't Receive OTP?</p>
                <button
                  type="button"
                  className="text-[#4071ed] underline cursor-pointer "
                  onClick={handleResendOtp}
                >
                  Resend OTP
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
