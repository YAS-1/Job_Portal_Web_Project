import { useState, useRef, useEffect } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { IoIosLogOut } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import placeHolder from "../../assets/default_photo.png"
import { useNavigate } from 'react-router-dom';


const UserDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  const navigate = useNavigate();
  const homepage = () => navigate("/home");

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        if (buttonRef.current && !buttonRef.current.contains(event.target)) {
          setIsOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
<<<<<<< HEAD
    <div className="relative inline-block z-20 animate-fade-in-up">
      {/* Profile button */}

      <div className='p-[1px] border-2 border-[#4071ed] cursor-pointer rounded-full'>
        <img src={placeHolder}  alt="" className='w-10 h-10  rounded-full 
=======
    <div className="relative inline-block z-20">
      {/* Profile button */}

      <div className='p-[1px] border-2 border-[#4071ed] cursor-pointer rounded-full'>
        <img src={placeHolder}  alt="" className='w-12 h-12  rounded-full 
>>>>>>> 9756ff4 (login&dashboard)
        hover:scale-105 object-cover' 
          ref={buttonRef}
          onClick={() => setIsOpen(!isOpen)}
        />
      </div>

      {/* Dropdown menu */}
      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute right-0 mt-2 w-48 origin-top animate-book-dropdown z-30"
        >
          <div className="bg-white rounded-lg shadow-xl shadow-[#4071ed]/50 overflow-hidden">
            <div className="p-4 bg-[#f8f9fa] border-b">
              <div className="text-sm font-medium text-[#1c2229]">John Doe</div>
              <div className="text-xs text-gray-500">jobfern@example.com</div>
            </div>

            <div className="py-1">
<<<<<<< HEAD
              <button className="flex items-center px-4 py-2 text-[#1c2229]/80 hover:bg-[#4071ed]/10
=======
              <button className="flex items-center px-4 py-2 text-[#1c2229] hover:bg-[#4071ed]/10
>>>>>>> 9756ff4 (login&dashboard)
              cursor-pointer">
                <CgProfile className="mr-3 text-[#4071ed]/70" size={20} />
                Profile
              </button>
<<<<<<< HEAD
              <button className="flex items-center px-4 py-2 text-[#1c2229]/80 hover:bg-[#4071ed]/10
=======
              <button className="flex items-center px-4 py-2 text-[#1c2229] hover:bg-[#4071ed]/10
>>>>>>> 9756ff4 (login&dashboard)
              cursor-pointer">
                <IoSettingsOutline className="mr-3 text-[#4071ed]/70" size={20} />
                Settings
              </button>

<<<<<<< HEAD
              <button className="flex items-center px-4 py-2 text-[#1c2229]/80 hover:bg-[#4071ed]/10
              cursor-pointer " onClick={homepage}>
=======
              <button className="flex items-center px-4 py-2 text-[#1c2229] hover:bg-[#4071ed]/10
              cursor-pointer" onClick={homepage}>
>>>>>>> 9756ff4 (login&dashboard)
                <IoIosLogOut className="mr-3 text-[#4071ed]/70" size={20} />
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = `
  @keyframes bookDropdown {
    0% {
      opacity: 0;
      transform: translateY(-20px) rotateX(45deg);
    }
    50% {
      opacity: 1;
      transform: translateY(10px) rotateX(-15deg);
    }
    100% {
      transform: translateY(0) rotateX(0);
    }
  }

  .animate-book-dropdown {
    animation: bookDropdown 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
    transform-origin: top right;
    perspective: 1000px;
  }
`;

// Inject the styles
const styleSheet = document.createElement('style');
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default UserDropdown;
