import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AvailableJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [resume, setResume] = useState(null);
  const [coverLetter, setCoverLetter] = useState(null);
  const [appliedJobs, setAppliedJobs] = useState(new Set());
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false); // Job details modal state

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get("http://localhost:3337/api/jobs", {
          withCredentials: true,
        });
        setJobs(response.data.jobs);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const handleApply = (job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!resume || !coverLetter) {
      toast.error("Please upload both resume and cover letter");
      return;
    }

    const formData = new FormData();
    formData.append("resume", resume);
    formData.append("cover_letter", coverLetter);
    formData.append("job_id", selectedJob.job_id);

    try {
      await axios.post("http://localhost:3337/api/applications/apply", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      // Show toast notification
      toast.success("Application submitted successfully!");

      // Mark the job as applied
      setAppliedJobs((prev) => new Set([...prev, selectedJob.job_id]));

      // Close modal
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error applying for job:", error);
      toast.error("Error submitting application");
    }
  };

  const handleViewDetails = (job) => {
    setSelectedJob(job);
    setIsDetailsModalOpen(true);
  };

  if (isLoading) {
    return <p>Loading jobs...</p>;
  }

  if (jobs.length === 0) {
    return <p>No jobs available at the moment.</p>;
  }

  return (
    <div className="p-6 relative">
      <h2 className="text-2xl font-bold mb-4">Available Jobs</h2>

      <ToastContainer position="top-right" autoClose={3000} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <div
            key={job.job_id}
            className="bg-white shadow-lg rounded-lg p-4 cursor-pointer hover:shadow-xl transition"
            onClick={() => handleViewDetails(job)} // Open job details modal on click
          >
            <h3 className="text-lg font-bold mb-2">{job.title}</h3>
            <p className="text-gray-600 mb-1">
              <strong>Location:</strong> {job.location}
            </p>
            <p className="text-gray-600 mb-1">
              <strong>Salary Range:</strong> {job.salary_range || "N/A"}
            </p>
            <p className="text-gray-600 mb-1">
              <strong>Job Type:</strong> {job.job_type || "N/A"}
            </p>
            <p className="text-gray-700 mb-4 line-clamp-2">
              <strong>Description:</strong> {job.description}
            </p>
            <button
              className={`px-4 py-2 rounded transition-all ${
                appliedJobs.has(job.job_id)
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
              onClick={(e) => {
                e.stopPropagation(); // Prevent job details modal from opening when clicking Apply
                handleApply(job);
              }}
              disabled={appliedJobs.has(job.job_id)}
            >
              {appliedJobs.has(job.job_id) ? "Applied" : "Apply Now"}
            </button>
          </div>
        ))}
      </div>

      {/* Job Details Modal */}
      {isDetailsModalOpen && selectedJob && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full relative z-10">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-lg"
              onClick={() => setIsDetailsModalOpen(false)}
            >
              ✖
            </button>
            <h2 className="text-2xl font-bold mb-4">{selectedJob.title}</h2>
            <p className="text-gray-600 mb-2">
              <strong>Location:</strong> {selectedJob.location}
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Salary Range:</strong> {selectedJob.salary_range || "N/A"}
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Job Type:</strong> {selectedJob.job_type || "N/A"}
            </p>
            <p className="text-gray-700 mb-4">
              <strong>Description:</strong> {selectedJob.description}
            </p>
            <button
              className={`w-full px-4 py-2 rounded transition-all ${
                appliedJobs.has(selectedJob.job_id)
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
              onClick={() => handleApply(selectedJob)}
              disabled={appliedJobs.has(selectedJob.job_id)}
            >
              {appliedJobs.has(selectedJob.job_id) ? "Applied" : "Apply Now"}
            </button>
          </div>
        </div>
      )}

      {/* Apply Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full relative z-10">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-lg"
              onClick={() => setIsModalOpen(false)}
            >
              ✖
            </button>
            <h2 className="text-2xl font-bold mb-4">Apply for {selectedJob.title}</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="resume" className="block text-lg font-medium mb-2">
                  Upload Resume
                </label>
                <input
                  type="file"
                  id="resume"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => setResume(e.target.files[0])}
                  required
                  className="border p-2 w-full"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="coverLetter" className="block text-lg font-medium mb-2">
                  Upload Cover Letter
                </label>
                <input
                  type="file"
                  id="coverLetter"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => setCoverLetter(e.target.files[0])}
                  required
                  className="border p-2 w-full"
                />
              </div>
              <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-all">
                Submit Application
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AvailableJobs;
