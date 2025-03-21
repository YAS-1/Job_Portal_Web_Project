import React, { useState } from "react";
import { FaUser, FaBriefcase, FaCog, FaSignOutAlt } from "react-icons/fa";
import { toast } from "react-toastify"; // For notifications
import Sidebar from "../components/userAccount/sidebar";
import UserDropdown from "../components/userAccount/dropdown";
import MainPanel from "../components/userAccount/mainPanel";

export default function UserAccountPanel() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [userData] = useState({
    name: "John Doe",
    email: "john.doe@email.com",
    profilePicture: "https://www.w3schools.com/w3images/avatar2.png",
    jobApplications: 5,
  });

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  const logout = () => {
    toast.success("Logged out successfully");
    // Add logic for logout (e.g., clear session, redirect to login)
  };

  return (
    <>
      <div className="flex h-screen bg-gray-100">

        {/* Sidebar */}
        <Sidebar />

      </div>
    </>
  );
}
