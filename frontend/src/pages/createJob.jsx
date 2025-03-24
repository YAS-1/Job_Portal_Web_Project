import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const CreateJob = () => {
  const navigate = useNavigate();
  const [jobData, setJobData] = useState({
    title: "",
    description: "",
    location: "",
    salary_range: "", // Updated field name
    jobType: "Full-time", // Default value
    requirements: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const api = axios.create({
    baseURL: "http://localhost:3337",
    withCredentials: true,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setJobData({ ...jobData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (!jobData.title || !jobData.description || !jobData.location) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await api.post("/api/jobs", jobData);
      toast.success("Job created successfully!");
      navigate("/home"); // Redirect to the jobs page
    } catch (error) {
      console.error("Error creating job:", error);
      toast.error(error.response?.data?.message || "Error creating job.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Create Job</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Job Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Job Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={jobData.title}
              onChange={handleInputChange}
              className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#4071ed] focus:border-[#4071ed]"
              placeholder="Enter job title"
              required
            />
          </div>

          {/* Job Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Job Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              value={jobData.description}
              onChange={handleInputChange}
              className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#4071ed] focus:border-[#4071ed]"
              placeholder="Enter job description"
              rows="5"
              required
            ></textarea>
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="location"
              value={jobData.location}
              onChange={handleInputChange}
              className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#4071ed] focus:border-[#4071ed]"
              placeholder="Enter job location"
              required
            />
          </div>

          {/* Salary Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Salary Range
            </label>
            <input
              type="text"
              name="salary_range" // Updated field name
              value={jobData.salary_range}
              onChange={handleInputChange}
              className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#4071ed] focus:border-[#4071ed]"
              placeholder="Enter salary range (e.g., 50,000 - 70,000)"
            />
          </div>

          {/* Job Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Job Type
            </label>
            <select
              name="jobType"
              value={jobData.jobType}
              onChange={handleInputChange}
              className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#4071ed] focus:border-[#4071ed]"
            >
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Remote">Remote</option>
            </select>
          </div>

          {/* Requirements */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Requirements
            </label>
            <textarea
              name="requirements"
              value={jobData.requirements}
              onChange={handleInputChange}
              className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#4071ed] focus:border-[#4071ed]"
              placeholder="Enter job requirements (optional)"
              rows="4"
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-3 bg-[#4071ed] text-white font-medium rounded-lg shadow-md hover:bg-[#4071ed]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4071ed] transition-all duration-200"
            >
              {isSubmitting ? "Submitting..." : "Create Job"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateJob;