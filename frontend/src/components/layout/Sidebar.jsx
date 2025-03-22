import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
	FaHome,
	FaUser,
	FaBriefcase,
	FaFileAlt,
	FaEdit,
	FaTrash,
	FaBars,
	FaTimes,
} from "react-icons/fa";

const Sidebar = () => {
	const [isOpen, setIsOpen] = useState(false);
	const navigate = useNavigate();

	const api = axios.create({
		baseURL: "http://localhost:3337",
		withCredentials: true,
	});

	const handleLogout = async () => {
		try {
			await api.post("/api/auth/logout");
			navigate("/login");
		} catch (error) {
			console.error("Logout error:", error);
		}
	};

	const menuItems = [
		{ icon: <FaHome />, label: "Home", path: "/home" },
		{ icon: <FaUser />, label: "User Account", path: "/profile" },
		{ icon: <FaBriefcase />, label: "Create Job", path: "/create-job" },
		{
			icon: <FaFileAlt />,
			label: "Manage Applications",
			path: "/manage-applications",
		},
		{ icon: <FaEdit />, label: "Update Job", path: "/update-job" },
		{ icon: <FaTrash />, label: "Delete Job", path: "/delete-job" },
	];

	return (
		<>
			{/* Hamburger Menu Button */}
			{!isOpen && (
				<button
					onClick={() => setIsOpen(true)}
					className='fixed top-[60px] left-[10px] z-50 flex items-center space-x-3 bg-[#4071ed] p-3 rounded-lg shadow-lg hover:shadow-xl hover:bg-[#4071ed]/90 transition-all duration-200 group'>
					<FaBars size={20} className='text-white' />
					<span className='text-white font-medium'>Open Menu</span>
					<div className='absolute left-full ml-2 bg-gray-800 text-white px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap'>
						Click to open navigation menu
					</div>
				</button>
			)}

			{/* Sidebar */}
			<div
				className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-40 ${
					isOpen ? "translate-x-0" : "-translate-x-full"
				}`}>
				<div className='p-4'>
					<div className='flex items-center justify-between mb-8'>
						<div className='flex'>
							<p className='text-[30px] font-bold'>Job</p>
							<p className='text-[20px] font-bold text-[#4071ed]'>Fern</p>
						</div>
						<button
							onClick={() => setIsOpen(false)}
							className='p-2 hover:bg-gray-100 rounded-full transition-colors duration-200'>
							<FaTimes size={20} className='text-gray-600' />
						</button>
					</div>

					<nav className='space-y-2'>
						{menuItems.map((item, index) => (
							<button
								key={index}
								onClick={() => {
									navigate(item.path);
									setIsOpen(false);
								}}
								className='w-full flex items-center space-x-3 p-3 text-gray-700 hover:bg-[#4071ed]/10 hover:text-[#4071ed] rounded-lg transition-all duration-200'>
								<span className='text-lg'>{item.icon}</span>
								<span className='font-medium'>{item.label}</span>
							</button>
						))}
					</nav>

					{/* Logout Button */}
					<button
						onClick={handleLogout}
						className='absolute bottom-4 left-4 right-4 flex items-center justify-center space-x-3 p-3 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200'>
						<FaTimes size={20} />
						<span className='font-medium'>Logout</span>
					</button>
				</div>
			</div>

			{/* Overlay */}
			{isOpen && (
				<div
					className='fixed inset-0 bg-black/30 backdrop-blur-sm z-30'
					onClick={() => setIsOpen(false)}></div>
			)}
		</>
	);
};

export default Sidebar;
