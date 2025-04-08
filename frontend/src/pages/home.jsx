import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { toast } from "react-toastify";
import axios from "axios";

// Import assets and components
import HomeImage from "../assets/home_image3.jpg";
import AvailableJobs from "../components/homePage/availablejobs";
import Footer from "../components/homePage/footer";
import WhyChooseUs from "../components/homePage/whyChooseUs";
import Sidebar from "../components/layout/Sidebar";

export default function HomePage() {
  const navigate = useNavigate();

  // State management for search functionality
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // State to manage login status
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Create axios instance for API calls
  const api = axios.create({
    baseURL: "http://localhost:3337",
    withCredentials: true,
  });

  // Check if the user is logged in (you can check a token or user session here)
  useEffect(() => {
    // For example, check local storage for a token
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // If token exists, set logged in state to true
  }, []);

  // Debounce search: trigger search 500ms after user stops typing
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery.trim()) {
        performSearch(searchQuery);
      } else {
        // Clear search results if query is empty
        setSearchResults([]);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  // Function to perform the API search call
  const performSearch = async (query) => {
    try {
      setIsSearching(true);
      const response = await api.get("/api/jobs/search", {
        params: { q: query },
      });
      if (response.data && response.data.jobs) {
        setSearchResults(response.data.jobs);
        if (response.data.jobs.length === 0) {
          toast.info("No jobs found matching your search");
        }
      } else {
        toast.warning("No search results found");
      }
    } catch (error) {
      console.error("Search error:", error);
      toast.error(error.response?.data?.message || "Search failed");
    } finally {
      setIsSearching(false);
    }
  };

  // Handle Logout
  const handleLogout = () => {
    // Clear the token from local storage
    localStorage.removeItem("token");
    setIsLoggedIn(false); // Update the login state
    navigate("/login"); // Redirect to login page
    toast.success("Logged out successfully");
  };

  return (
    <div className="min-h-screen font-[Roboto] flex flex-col">
      {/* Navigation Bar */}
      <nav className="w-full bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-[#4071ed]">
            JobFern
          </Link>
          {/* Center the nav items */}
          <div className="flex space-x-6 items-center flex-grow justify-center">
            <Link to="/" className="text-gray-700 hover:text-[#4071ed]">
              Home
            </Link>
            <Link to="/jobs" className="text-gray-700 hover:text-[#4071ed]">
              Jobs
            </Link>
            {/* Conditionally render Login and Register links */}
            {!isLoggedIn ? (
              <>
                <Link to="/login" className="text-gray-700 hover:text-[#4071ed]">
                  Login
                </Link>
                <Link to="/signup" className="text-gray-700 hover:text-[#4071ed]">
                  Register
                </Link>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="text-gray-700 hover:text-[#4071ed]">
                Logout
              </button>
            )}
          </div>
          {/* Job Search Area in Nav Bar */}
          <div className="flex items-center justify-center w-2/5">
            <input
              type="text"
              placeholder="Search jobs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-3 py-2 border rounded-l-md focus:outline-none w-full"
            />
            <button
              onClick={() => performSearch(searchQuery)}
              disabled={isSearching}
              className="bg-[#4071ed] text-white px-3 py-2 rounded-r-md hover:bg-blue-700 flex items-center"
            >
              <CiSearch className="mr-1" />
              Search
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div
        className="relative h-[500px] flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${HomeImage})` }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl font-bold mb-4">Find Your Dream Job</h1>
        </div>
      </div>

      {/* Job Listings Section */}
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-6 text-center">
          {searchQuery ? "Search Results" : "Latest Job Openings"}
        </h2>
        {searchQuery ? (
          <div className="flex flex-wrap justify-center gap-8">
            {isSearching ? (
              <p className="text-center text-xl">Searching...</p>
            ) : searchResults.length > 0 ? (
              searchResults.map((job) => (
                <div
                  key={job.job_id}
                  className="bg-white shadow-md rounded-lg p-6 w-[450px] hover:shadow-lg transition cursor-pointer"
                  onClick={() => navigate(`/jobs/${job.job_id}`)}
                >
                  <h3 className="text-3xl font-semibold mb-3">{job.title}</h3>
                  <p className="text-gray-500 text-base"> <strong>Location: </strong>{job.location}</p>
                  <p className="text-gray-600 text-base"> <strong>Description: </strong>{job.description?.substring(0, 120)}...</p>
                </div>
              ))
            ) : (
              <p className="text-center text-xl">No jobs found matching your search.</p>
            )}
          </div>
        ) : (
          <AvailableJobs />
        )}
      </div>

      {/* Additional Sections */}
      <WhyChooseUs />
      <Footer />
      <Sidebar />
    </div>
  );
}
