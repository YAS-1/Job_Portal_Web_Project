import { useNavigate } from "react-router-dom";
import "../App.css";
import { CiSearch } from "react-icons/ci";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import HomeImage from "../assets/home_image3.jpg";
import JobList from "../components/homePage/availablejobs";
import Footer from "../components/homePage/footer";
import WhyChooseUs from "../components/homePage/whyChooseUs";
import Sidebar from "../components/layout/Sidebar";

export default function HomePage() {
	const navigate = useNavigate();
	const [searchQuery, setSearchQuery] = useState("");
	const [searchResults, setSearchResults] = useState([]);
	const [isSearching, setIsSearching] = useState(false);
	const [allJobs, setAllJobs] = useState([]);
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	// Create axios instance with default config
	const api = axios.create({
		baseURL: "http://localhost:3337",
		withCredentials: true, // Important for handling cookies
	});

	// Check authentication status when component mounts
	useEffect(() => {
		const checkAuth = async () => {
			try {
				try {
					await api.get("/api/applications/my-applications");
					setIsLoggedIn(true);
				} catch (error) {
					console.log(error);
					setIsLoggedIn(false);
				}
			} catch (error) {
				console.log(error);
				setIsLoggedIn(false);
			}
		};
		checkAuth();
	}, []);

	// Fetch all jobs when component mounts
	useEffect(() => {
		const fetchJobs = async () => {
			try {
				const response = await api.get("/api/jobs");
				setAllJobs(response.data.jobs);
			} catch (error) {
				console.error("Error fetching jobs:", error);
				toast.error("Error loading jobs");
			}
		};

		fetchJobs();
	}, []);

	const handleSignup = () => {
		navigate("/signup");
	};

	const handleLogout = async () => {
		try {
			await api.post("/api/auth/logout");
			setIsLoggedIn(false);
			toast.success("Logged out successfully");
		} catch (error) {
			console.error("Logout error:", error);
			toast.error("Error logging out");
		}
	};

	const handleSearch = async (e) => {
		e.preventDefault();
		if (!searchQuery.trim()) {
			toast.error("Please enter a search term");
			return;
		}

		try {
			setIsSearching(true);
			const response = await api.get(
				`/api/jobs/search?q=${encodeURIComponent(searchQuery)}`
			);

			if (response.data && response.data.jobs) {
				setSearchResults(response.data.jobs);
			} else {
				console.error("Invalid response format:", response.data);
				toast.error("Error processing search results");
			}
		} catch (error) {
			console.error("Search error:", error);
			toast.error("Error searching jobs");
		} finally {
			setIsSearching(false);
		}
	};

	// Handle search on input change
	const handleSearchChange = async (e) => {
		const query = e.target.value;
		setSearchQuery(query);

		if (query.trim()) {
			try {
				setIsSearching(true);
				const response = await api.get(
					`/api/jobs/search?q=${encodeURIComponent(query)}`
				);

				if (response.data && response.data.jobs) {
					setSearchResults(response.data.jobs);
				}
			} catch (error) {
				console.error("Search error:", error);
			} finally {
				setIsSearching(false);
			}
		} else {
			setSearchResults([]);
		}
	};

	return (
		<>
			{isLoggedIn && <Sidebar />}
			<section className='h-screen font-[Roboto] '>
				<div className='absolute top-[10px] left-[10px]'>
					<div className='flex'>
						<p className='text-[30px] font-bold'>Job</p>
						<p className='text-[20px] font-bold text-[#4071ed]'>Fern</p>
					</div>
				</div>

				<div className='p-4 flex'>
					<form
						onSubmit={handleSearch}
						className='flex w-full items-center justify-end relative'>
						<input
							type='text'
							className='w-[350px] p-[10px] bg-[#f2f2f5] rounded-[50px] pl-6
							placeholder:text-sm focus:ring-2 focus:ring-[#4071ed] focus:outline-none transition duration-500'
							placeholder='What job are you looking for?'
							value={searchQuery}
							onChange={handleSearchChange}
						/>

						<button
							type='submit'
							disabled={isSearching}
							className='absolute right-2 flex items-center justify-center bg-[#4071ed] rounded-full 
							p-2 hover:bg-[#4071ed]/80 transition-all duration-300'>
							<CiSearch color='white' />
						</button>
					</form>

					<nav className='flex flex-row w-full justify-end space-x-4 font-medium'>
						<button
							className='text-black p-2 rounded-lg hover:text-black hover:bg-[#4071ed]
							cursor-pointer'>
							About Us
						</button>

						{!isLoggedIn && (
							<button
								className='text-black p-2 rounded-lg cursor-pointer'
								onClick={handleSignup}>
								Signup
							</button>
						)}

						<button
							className={`${
								isLoggedIn
									? "bg-red-500 hover:bg-red-600"
									: "bg-[#1c2229] hover:bg-[#1c2229]/80"
							} text-white py-2 px-4 rounded-[50px] cursor-pointer transition-all duration-300`}
							onClick={isLoggedIn ? handleLogout : () => navigate("/login")}>
							{isLoggedIn ? "Logout" : "Login"}
						</button>
					</nav>
				</div>

				{!searchQuery && (
					<div className='relative h-[600px] welcome-text'>
						<img
							src={HomeImage}
							alt='Background Image'
							className='w-full h-full object-cover absolute'
							loading='lazy'
						/>
						<div
							className='absolute flex w-full h-full top-0 left-0 space-x-[60px] 
							items-center justify-center bg-black/70'></div>
						<div className=' text-white font-extrabold absolute top-20 left-10 w-[500px] z-20'>
							<p className='w-full bg-[#4071ed] h-2 '></p>
							<p className='text-[40px] pb-10 welcome-text overflow-auto'>
								It's enough with the job hunt struggles, we're here to help.
								Land your next role with JobFern!
							</p>
							{!isLoggedIn && (
								<button
									className='font-medium bg-[#4071ed] text-white rounded-md p-4 
									hover:bg-white hover:text-[#4071ed] transition duration-500 cursor-pointer'
									onClick={handleSignup}>
									Signup Now!
								</button>
							)}
						</div>
					</div>
				)}

				<JobList
					searchResults={searchResults}
					isSearching={isSearching}
					searchQuery={searchQuery}
					allJobs={allJobs}
				/>

				<WhyChooseUs />

				<Footer />
			</section>
		</>
	);
}
