import { useState, useRef, useEffect } from 'react';
import { FaUserCircle, FaCog, FaSignOutAlt } from 'react-icons/fa';

const UserDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

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
    <div className="relative inline-block z-20">
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-[#4071ed] hover:bg-[#3257b8] transition-colors"
      >
        <FaUserCircle className="text-white text-2xl" />
      </button>

      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute left-0 mt-2 w-48 origin-top animate-book-dropdown"
        >
          <div className="bg-white rounded-lg shadow-xl overflow-hidden">
            <div className="p-4 bg-[#f8f9fa] border-b">
              <div className="text-sm font-medium text-[#1c2229]">John Doe</div>
              <div className="text-xs text-gray-500">jobfern@example.com</div>
            </div>

            <div className="py-1">
              <a href="#" className="flex items-center px-4 py-2 text-sm text-[#1c2229] hover:bg-[#4071ed]/10">
                <FaUserCircle className="mr-3 text-[#4071ed]" />
                Profile
              </a>
              <a href="#" className="flex items-center px-4 py-2 text-sm text-[#1c2229] hover:bg-[#4071ed]/10">
                <FaCog className="mr-3 text-[#4071ed]" />
                Settings
              </a>
              <a href="#" className="flex items-center px-4 py-2 text-sm text-[#1c2229] hover:bg-[#4071ed]/10">
                <FaSignOutAlt className="mr-3 text-[#4071ed]" />
                Logout
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
