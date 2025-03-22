import React, { useState } from 'react';
import { FaUser, FaBriefcase, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { toast } from 'react-toastify'; // For notifications

export default function UserAccountPanel() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [userData] = useState({
    name: 'John Doe',
    email: 'john.doe@email.com',
    profilePicture: 'https://www.w3schools.com/w3images/avatar2.png',
    jobApplications: 5,
  });

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  const logout = () => {
    toast.success('Logged out successfully');
    // Add logic for logout (e.g., clear session, redirect to login)
  };

  return (
<<<<<<< HEAD
    <div className="flex h-screen bg-white text-[#1c2229]">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 w-[250px] h-full bg-[#4071ed] text-white transition-transform ${
          isSidebarOpen ? 'transform-none' : '-translate-x-full'
        }`}
        id="sidebar"
      >
        <div className="p-6">
          <div className="flex items-center space-x-4">
            <img
              src={userData.profilePicture}
              alt="Profile"
              className="w-12 h-12 rounded-full"
            />
            <div>
              <p className="font-semibold text-lg">{userData.name}</p>
              <p className="text-sm">{userData.email}</p>
            </div>
          </div>
          <div className="mt-8 space-y-6">
            <button className="flex items-center space-x-2 w-full py-2 px-4 hover:bg-white hover:text-[#4071ed] transition duration-300">
              <FaUser size={20} />
              <span>Profile</span>
            </button>
            <button className="flex items-center space-x-2 w-full py-2 px-4 hover:bg-white hover:text-[#4071ed] transition duration-300">
              <FaBriefcase size={20} />
              <span>Applications</span>
            </button>
            <button className="flex items-center space-x-2 w-full py-2 px-4 hover:bg-white hover:text-[#4071ed] transition duration-300">
              <FaCog size={20} />
              <span>Settings</span>
            </button>
            <button
              onClick={logout}
              className="flex items-center space-x-2 w-full py-2 px-4 hover:bg-white hover:text-[#4071ed] transition duration-300"
            >
              <FaSignOutAlt size={20} />
              <span>Logout</span>
            </button>
          </div>
        </div>
=======
    <>
      <div className="flex h-screen bg-gray-100">

        {/* Sidebar */}
        <Sidebar />
<<<<<<< HEAD
<<<<<<< HEAD
        {/* Main Content */}
        <MainPanel/>
=======

>>>>>>> 317081a (dashboard improvement)
      </div>
    </div>
  );
}
