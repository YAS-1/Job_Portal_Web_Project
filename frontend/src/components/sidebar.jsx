import { useState } from "react";
import {
  FaUser,
  FaBriefcase,
  FaFileUpload,
  FaCog,
  FaChevronLeft,
  FaChevronRight,
  FaAlignRight,
  FaAlignLeft 
} from "react-icons/fa";
import JobSearch from "./search";
import UserDropdown from "./userAccount/dropdown";
import JobSearchFilters from "./search";

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { icon: <FaUser />, label: "Profile", path: "#" },
    { icon: <FaBriefcase />, label: "Applications", path: "#" },
    { icon: <FaFileUpload />, label: "Post Resume", path: "#" },
    { icon: <FaCog />, label: "Settings", path: "#" },
  ];

  return (
    <>
      <aside
        className={`bg-[#1c2229] text-white transition-all duration-300 fixed md:relative
          ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 h-full z-50
          ${isExpanded ? "w-[200px]" : "w-16"}`}
      >

        <div className="">
          <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="w-full text-[#4071ed] hover:bg-[#4071ed]/10 pr-6 p-2 rounded-lg 
              flex justify-end cursor-pointer"
            >
              {isExpanded ? (
                <>
                <FaAlignRight className="text-xl" />
                </>
              ) : (
                <FaAlignLeft className="text-xl" />
              )}
            </button>
        </div>

        <button
          className="md:hidden fixed top-4 left-4 z-50 text-[#4071ed]"
          onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <FaChevronLeft /> : <FaChevronRight />}
        </button>
        <div className={`flex flex-col h-full`}>
          {/* Header */}
          <div className={`${isExpanded?"":"hidden"}`}>
            <div className='flex pl-6'>
                <p className='text-[30px] font-bold'>Job</p> 
                <p className='text-[20px] font-bold text-[#4071ed]'>Fern</p>
              </div>
          </div>
          <hr className="text-gray-400 mx-2"/>
          {/* Navigation */}
          <nav className="flex-1 p-2">
            <ul className="space-y-2">
              {navItems.map((item, index) => (
                <li key={index}>
                  <a
                    href={item.path}
                    className="flex items-center p-3 rounded-lg hover:bg-[#4071ed] 
                      transition-colors group"
                  >
                    <span className="text-xl">{item.icon}</span>
                    <span
                      className={`ml-3 ${
                        isExpanded ? "opacity-100" : "opacity-0"
                      } 
                        transition-opacity duration-200 md:group-hover:opacity-100`}
                    >
                      {item.label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Toggle Button */}
          <div className="p-4 border-t border-gray-700 hidden md:block cursor-pointer">
            <button className="w-full text-[#4071ed] hover:bg-[#4071ed]/10 pr-6 p-2 rounded-lg 
              flex justify-end cursor-pointer">
                Logout
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
