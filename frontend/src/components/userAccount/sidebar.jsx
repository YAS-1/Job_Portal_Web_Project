import { useState } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaAlignRight,
  FaAlignLeft,
} from "react-icons/fa";
import { RxDashboard } from "react-icons/rx";
import { IoIosApps, IoIosLogOut } from "react-icons/io";
import { BsFillJournalBookmarkFill } from "react-icons/bs";
import { IoSettingsOutline } from "react-icons/io5";
import { FaPerbyte } from "react-icons/fa";
import JobSearch from "./search";
import UserDropdown from "./dropdown";
import Dashboard from "./dashboard";
import Applications from "./applications";
import Settings from "./settings";

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeContent, setActiveContent] = useState("dashboard");

  const navItems = [
    { key: "dashboard", icon: <RxDashboard />, label: "Dashboard" },
    { key: "applications", icon: <FaPerbyte />, label: "Applications" },
    { key: "jobs", icon: <BsFillJournalBookmarkFill />, label: "Jobs" },
    { key: "settings", icon: <IoSettingsOutline />, label: "Settings" },
  ];

  const renderContent = () => {
    switch (activeContent) {
      case "dashboard":
        return <Dashboard/>;
      case "applications":
        return <Applications/>;
      case "jobs":
        return <JobSearch />;
      case "settings":
        return <Settings/>
      default:
        return <div className="p-4">Select a menu item</div>;
    }
  };

  return (
    <>
      <aside
        className={`bg-[#1c2229] text-white transition-all duration-300 fixed md:relative
          ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 h-full z-50 flex flex-col
          ${isExpanded ? "w-[200px]" : "w-16"}`}
      >
        <div className="flex justify-end">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-[#4071ed] hover:bg-[#4071ed]/10 p-2 rounded-lg cursor-pointer"
          >
            {isExpanded ? (
              <FaAlignRight className="text-xl" />
            ) : (
              <FaAlignLeft className="text-xl" />
            )}
          </button>
        </div>

        <button
          className="md:hidden fixed top-4 left-4 z-50 text-[#4071ed] cursor-pointer"
          onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <FaChevronLeft /> : <FaChevronRight />}
        </button>

        <div className="flex flex-col flex-1">
          <div className={`${isExpanded ? "" : "hidden"} pb-2`}>
            <div className="flex pl-6">
              <p className="text-[30px] font-bold">Job</p>
              <p className="text-[20px] font-bold text-[#4071ed]">Fern</p>
            </div>
          </div>
          <hr className="text-gray-400 mx-2" />

          <nav className="flex-1 p-2">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.key}>
                  <button
                    onClick={() => {
                      setActiveContent(item.key);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center p-3 rounded-lg transition-colors group 
                    text-left transform duration-500 cursor-pointer
                      ${
                        activeContent === item.key
                          ? "bg-[#4071ed]"
                          : "hover:bg-[#4071ed]"
                      }`}
                  >
                    <span className="text-xl">{item.icon}</span>
                    <span
                      className={`ml-3 ${
                        isExpanded ? "opacity-100" : "opacity-0"
                      } transition-opacity duration-200 md:group-hover:opacity-100`}
                    >
                      {item.label}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div className="p-4 border-t border-gray-700 hidden md:block">
            <button
              className="w-full flex items-center p-3 rounded-lg hover:bg-[#4071ed] 
                transition-colors group text-left cursor-pointer"
            >
              <span className="text-xl"><IoIosLogOut /></span>
              <span
                className={`ml-3 ${
                  isExpanded ? "opacity-100" : "opacity-0"
                } transition-opacity duration-200 md:group-hover:opacity-100 cursor-pointer`}
              >
                Logout
              </span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 md:ml-6 transition-margin duration-300 overflow-auto
      ">
        <header className="flex justify-end items-center mb-6">
          <UserDropdown />
        </header>
        {renderContent()}
      </main>
    </>
  );
};

export default Sidebar;