import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import Sidebar from "../components/layout/Sidebar";
import {
	FaUser,
	FaEnvelope,
	FaPhone,
	FaCamera,
	FaLock,
	FaBriefcase,
} from "react-icons/fa";

const UserProfile = () => {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(true);
	const [isUpdating, setIsUpdating] = useState(false);
	const [previewImage, setPreviewImage] = useState(null);
	const [userProfile, setUserProfile] = useState({
		username: "",
		email: "",
		contact: "",
		roles: [],
		profile_picture: null,
	});
	const [passwordData, setPasswordData] = useState({
		currentPassword: "",
		newPassword: "",
		confirmPassword: "",
	});

	const api = axios.create({
		baseURL: "http://localhost:3337",
		withCredentials: true,
	});

	// Fetch user profile data
	useEffect(() => {
		const fetchProfile = async () => {
			try {
				setIsLoading(true);
				const response = await api.get("/api/user/me");
				console.log("Profile response:", response.data);

				if (response.data) {
					setUserProfile({
						username: response.data.username || "",
						email: response.data.email || "",
						contact: response.data.contact || "",
						roles: response.data.roles ? response.data.roles.split(",") : [],
						profile_picture: response.data.profile_picture || null,
					});

					// Set the preview image if there's a profile picture
					if (response.data.profile_picture) {
						setPreviewImage(response.data.profile_picture);
					}
				}
			} catch (error) {
				console.error("Error fetching profile:", error);
				if (error.response?.status === 401) {
					navigate("/login");
				} else {
					toast.error(error.response?.data?.message || "Error loading profile");
				}
			} finally {
				setIsLoading(false);
			}
		};

		fetchProfile();
	}, [navigate]);

	// Handle profile picture upload
	const handleUploadProfilePicture = async (e) => {
		const file = e.target.files[0];
		if (!file) return;

		// Validate file type
		if (!file.type.startsWith("image/")) {
			toast.error("Please upload an image file");
			return;
		}

		// Validate file size (2MB limit)
		if (file.size > 2 * 1024 * 1024) {
			toast.error("File size should be less than 2MB");
			return;
		}

		try {
			setIsUpdating(true);
			const formData = new FormData();
			formData.append("profile_picture", file);

			const response = await api.post(
				"/api/user/upload-profile-picture",
				formData,
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
				}
			);

			if (response.data.profile_picture) {
				setPreviewImage(response.data.profile_picture);
				setUserProfile((prev) => ({
					...prev,
					profile_picture: response.data.profile_picture,
				}));
				toast.success("Profile picture updated successfully!");
			}
		} catch (error) {
			console.error("Error uploading profile picture:", error);
			toast.error(
				error.response?.data?.message || "Error uploading profile picture"
			);
		} finally {
			setIsUpdating(false);
		}
	};

	// Handle profile update
	const handleProfileUpdate = async (e) => {
		e.preventDefault();
		setIsUpdating(true);

		try {
			await api.put("/api/user/update", {
				username: userProfile.username,
				email: userProfile.email,
				contact: userProfile.contact,
			});

			toast.success("Profile updated successfully");
		} catch (error) {
			console.error("Error updating profile:", error);
			toast.error("Error updating profile");
		} finally {
			setIsUpdating(false);
		}
	};

	// Handle password change
	const handlePasswordChange = async (e) => {
		e.preventDefault();
		if (passwordData.newPassword !== passwordData.confirmPassword) {
			toast.error("New passwords do not match");
			return;
		}

		try {
			await api.put("/api/user/change-password", {
				currentPassword: passwordData.currentPassword,
				newPassword: passwordData.newPassword,
			});

			toast.success("Password changed successfully");
			setPasswordData({
				currentPassword: "",
				newPassword: "",
				confirmPassword: "",
			});
		} catch (error) {
			console.error("Error changing password:", error);
			toast.error("Error changing password");
		}
	};

	// Handle upgrade to employer
	const handleUpgradeToEmployer = async () => {
		try {
			await api.post("/api/user/upgrade-to-employer");
			toast.success("Successfully upgraded to employer role");
			// Refresh profile data
			const response = await api.get("/api/user/me");
			setUserProfile(response.data.user);
		} catch (error) {
			console.error("Error upgrading to employer:", error);
			toast.error("Error upgrading to employer");
		}
	};

	if (isLoading) {
		return (
			<div className='min-h-screen flex items-center justify-center'>
				<div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#4071ed]'></div>
			</div>
		);
	}

	return (
		<>
			<Sidebar />
			<div className='min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8'>
				<div className='max-w-4xl mx-auto'>
					{/* Header Section */}
					<div className='mb-8'>
						<h1 className='text-3xl font-bold text-gray-900'>My Account</h1>
						<p className='mt-2 text-sm text-gray-600'>
							Manage your profile information and account settings
						</p>
					</div>

					{/* Main Content Grid */}
					<div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
						{/* Left Column - Profile Picture */}
						<div className='lg:col-span-1'>
							<div className='bg-white rounded-lg shadow-lg p-6 mb-6'>
								<h2 className='text-2xl font-bold text-gray-800 mb-6'>
									Profile Picture
								</h2>
								<div className='flex items-center space-x-6'>
									<div className='relative'>
										<img
											src={previewImage || "https://via.placeholder.com/150"}
											alt='Profile'
											className='w-32 h-32 rounded-full object-cover border-4 border-gray-200'
											onError={(e) => {
												e.target.onerror = null; // Prevent infinite loop
												e.target.src = "https://via.placeholder.com/150";
											}}
										/>
										<label className='absolute bottom-0 right-0 bg-[#4071ed] text-white p-2 rounded-full cursor-pointer hover:bg-[#4071ed]/90 transition-colors duration-200'>
											<FaCamera size={20} />
											<input
												type='file'
												accept='image/*'
												onChange={handleUploadProfilePicture}
												className='hidden'
											/>
										</label>
									</div>
									<div>
										<p className='text-sm text-gray-600'>
											Recommended: Square image, max 2MB
										</p>
										<p className='text-sm text-gray-600'>
											Supported formats: JPG, PNG, GIF
										</p>
									</div>
								</div>
							</div>

							{/* Account Status Card */}
							<div className='mt-6 bg-white shadow-lg rounded-xl p-6'>
								<h3 className='text-lg font-medium text-gray-900 mb-4'>
									Account Status
								</h3>
								<div className='space-y-3'>
									<div className='flex items-center justify-between p-3 bg-gray-50 rounded-lg'>
										<span className='text-sm text-gray-600'>Account Type</span>
										<span className='text-sm font-medium text-[#4071ed] px-3 py-1 bg-[#4071ed]/10 rounded-full'>
											{userProfile.roles.includes("employer")
												? "Employer"
												: "Job Seeker"}
										</span>
									</div>
									{!userProfile.roles.includes("employer") && (
										<button
											onClick={handleUpgradeToEmployer}
											className='w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-md hover:shadow-lg text-sm font-medium text-white bg-[#4071ed] hover:bg-[#4071ed]/80 transition-all duration-200'>
											<FaBriefcase className='mr-2' />
											Upgrade to Employer
										</button>
									)}
								</div>
							</div>
						</div>

						{/* Right Column - Forms */}
						<div className='lg:col-span-2 space-y-6'>
							{/* Profile Information Form */}
							<div className='bg-white shadow-lg rounded-xl p-8'>
								<h2 className='text-xl font-semibold text-gray-900 mb-6'>
									Profile Information
								</h2>
								<form onSubmit={handleProfileUpdate} className='space-y-6'>
									<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
										<div>
											<label className='block text-sm font-medium text-gray-700 mb-2'>
												Username
											</label>
											<div className='relative rounded-lg shadow-sm'>
												<div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none'>
													<FaUser className='h-5 w-5 text-gray-400' />
												</div>
												<input
													type='text'
													value={userProfile.username}
													onChange={(e) =>
														setUserProfile({
															...userProfile,
															username: e.target.value,
														})
													}
													className='focus:ring-2 focus:ring-[#4071ed] focus:border-[#4071ed] block w-full pl-12 pr-4 py-3 sm:text-sm border-gray-300 rounded-lg transition-all duration-200'
													placeholder='Enter your username'
												/>
											</div>
										</div>

										<div>
											<label className='block text-sm font-medium text-gray-700 mb-2'>
												Email
											</label>
											<div className='relative rounded-lg shadow-sm'>
												<div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none'>
													<FaEnvelope className='h-5 w-5 text-gray-400' />
												</div>
												<input
													type='email'
													value={userProfile.email}
													onChange={(e) =>
														setUserProfile({
															...userProfile,
															email: e.target.value,
														})
													}
													className='focus:ring-2 focus:ring-[#4071ed] focus:border-[#4071ed] block w-full pl-12 pr-4 py-3 sm:text-sm border-gray-300 rounded-lg transition-all duration-200'
													placeholder='Enter your email'
												/>
											</div>
										</div>

										<div>
											<label className='block text-sm font-medium text-gray-700 mb-2'>
												Contact
											</label>
											<div className='relative rounded-lg shadow-sm'>
												<div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none'>
													<FaPhone className='h-5 w-5 text-gray-400' />
												</div>
												<input
													type='tel'
													value={userProfile.contact || ""}
													onChange={(e) =>
														setUserProfile({
															...userProfile,
															contact: e.target.value,
														})
													}
													className='focus:ring-2 focus:ring-[#4071ed] focus:border-[#4071ed] block w-full pl-12 pr-4 py-3 sm:text-sm border-gray-300 rounded-lg transition-all duration-200'
													placeholder='Enter your contact number'
												/>
											</div>
										</div>
									</div>

									<div className='flex justify-end'>
										<button
											type='submit'
											disabled={isUpdating}
											className='px-8 py-3 border border-transparent rounded-lg shadow-md hover:shadow-lg text-sm font-medium text-white bg-[#4071ed] hover:bg-[#4071ed]/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4071ed] transition-all duration-200'>
											{isUpdating ? "Updating..." : "Update Profile"}
										</button>
									</div>
								</form>
							</div>

							{/* Change Password Form */}
							<div className='bg-white shadow-lg rounded-xl p-8'>
								<h2 className='text-xl font-semibold text-gray-900 mb-6'>
									Change Password
								</h2>
								<form onSubmit={handlePasswordChange} className='space-y-6'>
									<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
										<div>
											<label className='block text-sm font-medium text-gray-700 mb-2'>
												Current Password
											</label>
											<div className='relative rounded-lg shadow-sm'>
												<div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none'>
													<FaLock className='h-5 w-5 text-gray-400' />
												</div>
												<input
													type='password'
													value={passwordData.currentPassword}
													onChange={(e) =>
														setPasswordData({
															...passwordData,
															currentPassword: e.target.value,
														})
													}
													className='focus:ring-2 focus:ring-[#4071ed] focus:border-[#4071ed] block w-full pl-12 pr-4 py-3 sm:text-sm border-gray-300 rounded-lg transition-all duration-200'
													placeholder='Enter current password'
												/>
											</div>
										</div>

										<div>
											<label className='block text-sm font-medium text-gray-700 mb-2'>
												New Password
											</label>
											<div className='relative rounded-lg shadow-sm'>
												<div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none'>
													<FaLock className='h-5 w-5 text-gray-400' />
												</div>
												<input
													type='password'
													value={passwordData.newPassword}
													onChange={(e) =>
														setPasswordData({
															...passwordData,
															newPassword: e.target.value,
														})
													}
													className='focus:ring-2 focus:ring-[#4071ed] focus:border-[#4071ed] block w-full pl-12 pr-4 py-3 sm:text-sm border-gray-300 rounded-lg transition-all duration-200'
													placeholder='Enter new password'
												/>
											</div>
										</div>

										<div>
											<label className='block text-sm font-medium text-gray-700 mb-2'>
												Confirm New Password
											</label>
											<div className='relative rounded-lg shadow-sm'>
												<div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none'>
													<FaLock className='h-5 w-5 text-gray-400' />
												</div>
												<input
													type='password'
													value={passwordData.confirmPassword}
													onChange={(e) =>
														setPasswordData({
															...passwordData,
															confirmPassword: e.target.value,
														})
													}
													className='focus:ring-2 focus:ring-[#4071ed] focus:border-[#4071ed] block w-full pl-12 pr-4 py-3 sm:text-sm border-gray-300 rounded-lg transition-all duration-200'
													placeholder='Confirm new password'
												/>
											</div>
										</div>
									</div>

									<div className='flex justify-end'>
										<button
											type='submit'
											className='px-8 py-3 border border-transparent rounded-lg shadow-md hover:shadow-lg text-sm font-medium text-white bg-[#4071ed] hover:bg-[#4071ed]/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4071ed] transition-all duration-200'>
											Change Password
										</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default UserProfile;
