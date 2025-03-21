import { React, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import JobApplicationForm from "../jobs/JobApplicationForm";

const JobList = ({ searchResults, isSearching, searchQuery, allJobs }) => {
	const [userApplications, setUserApplications] = useState([]);
	const [showApplicationForm, setShowApplicationForm] = useState(false);
	const [selectedJobId, setSelectedJobId] = useState(null);
	const navigate = useNavigate();

	// Create axios instance with default config
	const api = axios.create({
		baseURL: "http://localhost:3337",
		withCredentials: true, // Important for handling cookies
	});

	// Fetch user's applications if logged in
	useEffect(() => {
		const fetchUserApplications = async () => {
			try {
				const response = await api.get("/api/applications/my-applications");
				setUserApplications(response.data);
			} catch (error) {
				// Only log error if it's not a 401 (unauthorized) error
				if (error.response?.status !== 401) {
					console.error("Error fetching user applications:", error);
				}
			}
		};

		fetchUserApplications();
	}, []);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add("show-card");
					}
				});
			},
			{ threshold: 0.3 }
		);

		const cards = document.querySelectorAll(".hidden-card");
		cards.forEach((card) => observer.observe(card));

		return () => {
			cards.forEach((card) => observer.unobserve(card));
		};
	}, [allJobs, searchResults]);

	const handleApply = (jobId) => {
		// Check if user is logged in by making a test request
		api
			.get("/api/applications/my-applications")
			.then(() => {
				// If request succeeds, user is logged in
				const hasApplied = userApplications.some((app) => app.job_id === jobId);
				if (hasApplied) {
					toast.info("You have already applied for this job");
					return;
				}
				setSelectedJobId(jobId);
				setShowApplicationForm(true);
			})
			.catch((error) => {
				if (error.response?.status === 401) {
					toast.error("Please login to apply for jobs");
					navigate("/login");
				} else {
					toast.error("Error checking application status");
				}
			});
	};

	const displayJobs = searchQuery ? searchResults : allJobs;
	const isLoading = isSearching;

	if (isLoading) {
		return (
			<div className='p-6'>
				<p className='text-[#4071ed] my-2'>Top Picks</p>
				<p className='text-[30px] font-bold text-[#1c2229]/80'>
					{searchQuery
						? `Search Results for "${searchQuery}"`
						: "Featured Jobs"}
				</p>
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6'>
					{[1, 2, 3].map((i) => (
						<div
							key={i}
							className='bg-white shadow-lg rounded-2xl p-6 animate-pulse'>
							<div className='h-6 bg-gray-200 rounded w-3/4 mb-4'></div>
							<div className='h-4 bg-gray-200 rounded w-1/2 mb-4'></div>
							<div className='h-20 bg-gray-200 rounded mb-4'></div>
							<div className='h-10 bg-gray-200 rounded'></div>
						</div>
					))}
				</div>
			</div>
		);
	}

	return (
		<>
			<div className='p-6'>
				<p className='text-[#4071ed] my-2'>Top Picks</p>
				<p className='text-[30px] font-bold text-[#1c2229]/80'>
					{searchQuery
						? `Search Results for "${searchQuery}"`
						: "Featured Jobs"}
				</p>
			</div>
			{displayJobs.length === 0 ? (
				<div className='p-6 text-center'>
					<p className='text-gray-600 text-lg'>
						{searchQuery
							? `No jobs found matching "${searchQuery}"`
							: "No jobs available at the moment"}
					</p>
				</div>
			) : (
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6'>
					{displayJobs.map((job) => {
						const hasApplied = userApplications.some(
							(app) => app.job_id === job.job_id
						);
						return (
							<div
								key={job.job_id}
								className='hidden-card bg-white shadow-lg rounded-2xl p-6 hover:scale-105 transform transition-all duration-300 ease-in-out hover:shadow-2xl'>
								<h3 className='text-xl font-semibold text-gray-800'>
									{job.title}
								</h3>
								<p className='text-gray-600 mt-2'>
									{job.job_type} | {job.location}
								</p>
								<p className='mt-2 text-gray-600'>Salary: {job.salary_range}</p>
								<p className='mt-4 text-gray-700 line-clamp-3'>
									{job.description}
								</p>
								<div className='mt-4 flex justify-between items-center'>
									<span className='text-sm text-gray-500'>
										Posted: {new Date(job.created_at).toLocaleDateString()}
									</span>
									<button
										onClick={() => handleApply(job.job_id)}
										disabled={hasApplied}
										className={`px-4 py-2 rounded-lg transition-all duration-300 ${
											hasApplied
												? "bg-gray-300 text-gray-500 cursor-not-allowed"
												: "bg-[#4071ed] text-white hover:bg-[#4071ed]/80"
										}`}>
										{hasApplied ? "Applied" : "Apply Now"}
									</button>
								</div>
							</div>
						);
					})}
				</div>
			)}

			{showApplicationForm && (
				<JobApplicationForm
					jobId={selectedJobId}
					onClose={() => {
						setShowApplicationForm(false);
						setSelectedJobId(null);
					}}
				/>
			)}
		</>
	);
};

export default JobList;
