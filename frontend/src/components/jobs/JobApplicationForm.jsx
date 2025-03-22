import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const JobApplicationForm = ({ jobId, onClose }) => {
	const [formData, setFormData] = useState({
		resume: null,
		cover_letter: null,
	});
	const [isSubmitting, setIsSubmitting] = useState(false);

	const api = axios.create({
		baseURL: "http://localhost:3337",
		withCredentials: true,
	});

	const handleFileChange = (e) => {
		const { name, files } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: files[0],
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsSubmitting(true);

		try {
			const formDataToSend = new FormData();
			formDataToSend.append("resume", formData.resume);
			formDataToSend.append("cover_letter", formData.cover_letter);
			formDataToSend.append("job_id", jobId); // Changed from jobId to job_id to match backend expectation

			console.log("Submitting application for job ID:", jobId); // Debug log

			const response = await api.post(
				"/api/applications/apply",
				formDataToSend,
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
				}
			);

			console.log("Application response:", response.data); // Debug log

			toast.success("Application submitted successfully!");
			onClose();
		} catch (error) {
			console.error("Application error:", error);
			toast.error(
				error.response?.data?.message || "Error submitting application"
			);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
			<div className='bg-white rounded-lg p-6 w-full max-w-md'>
				<h2 className='text-2xl font-bold mb-4'>Apply for Job</h2>
				<form onSubmit={handleSubmit} className='space-y-4'>
					<div>
						<label className='block text-sm font-medium text-gray-700 mb-1'>
							Resume (PDF/DOC/DOCX)
						</label>
						<input
							type='file'
							name='resume'
							onChange={handleFileChange}
							accept='.pdf,.doc,.docx'
							required
							className='w-full p-2 border rounded-md'
						/>
					</div>
					<div>
						<label className='block text-sm font-medium text-gray-700 mb-1'>
							Cover Letter (PDF/DOC/DOCX)
						</label>
						<input
							type='file'
							name='cover_letter'
							onChange={handleFileChange}
							accept='.pdf,.doc,.docx'
							required
							className='w-full p-2 border rounded-md'
						/>
					</div>
					<div className='flex justify-end space-x-3 mt-6'>
						<button
							type='button'
							onClick={onClose}
							className='px-4 py-2 text-gray-600 hover:text-gray-800'>
							Cancel
						</button>
						<button
							type='submit'
							disabled={isSubmitting}
							className='px-4 py-2 bg-[#4071ed] text-white rounded-md hover:bg-[#4071ed]/80 disabled:opacity-50'>
							{isSubmitting ? "Submitting..." : "Submit Application"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default JobApplicationForm;
