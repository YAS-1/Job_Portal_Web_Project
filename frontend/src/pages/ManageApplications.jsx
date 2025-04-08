// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";

// const ManageApplications = () => {
//   const [jobs, setJobs] = useState([]); // For storing the jobs
//   const [applications, setApplications] = useState({}); // Key-value store for job applications
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const api = axios.create({
//     baseURL: "http://localhost:3337",
//     withCredentials: true,
//   });

//   const fetchJobsAndApplications = async () => {
//     try {
//       setLoading(true);
//       // Fetch jobs created by the employer
//       const jobResponse = await api.get("/api/jobs/my-jobs", {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });

//       setJobs(jobResponse.data);

//       // For each job, fetch the applications using the modified getJobApplications API
//       const jobApplications = {};
//       for (let job of jobResponse.data) {
//         const applicationsResponse = await api.get(`/api/applications/job/${job.job_id}`, {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         });
//         jobApplications[job.job_id] = applicationsResponse.data.applications; // Extract applications from the API response
//       }

//       setApplications(jobApplications);
//     } catch (error) {
//       console.error("Error fetching data:", error.response);
//       setError("Failed to fetch data.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchJobsAndApplications();
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-6">
//         <h1 className="text-2xl font-bold text-gray-900 mb-4">Manage Applications</h1>

//         {/* Applications List */}
//         {loading ? (
//           <p className="text-center text-gray-500">Loading applications...</p>
//         ) : error ? (
//           <p className="text-center text-red-500">{error}</p>
//         ) : jobs.length === 0 ? (
//           <p className="text-center text-gray-500">No jobs found.</p>
//         ) : (
//           <div className="space-y-4">
//             {jobs.map((job) => (
//               <div key={job.job_id} className="p-4 border rounded-lg shadow-sm bg-gray-50">
//                 <h2 className="text-lg font-semibold">{job.title}</h2>
//                 <p className="text-gray-600">
//                   <strong>Applications for this job:</strong>
//                 </p>
//                 {applications[job.job_id] && applications[job.job_id].length === 0 ? (
//                   <p className="text-gray-500">No applications for this job yet.</p>
//                 ) : (
//                   applications[job.job_id]?.map((app) => (
//                     <div key={app.application_id} className="p-4 border rounded-lg shadow-sm bg-gray-100">
//                       <h3 className="text-md font-semibold">{app.applicant_name}</h3>
//                       <p className="text-gray-600">
//                         <strong>Applied on:</strong> {new Date(app.application_date).toLocaleString()}
//                       </p>
//                       <p className="text-gray-600">
//                         <strong>Status:</strong>
//                         <span
//                           className={`px-2 py-1 rounded ${
//                             app.status === "pending"
//                               ? "bg-yellow-200 text-yellow-700"
//                               : app.status === "accepted"
//                               ? "bg-green-200 text-green-700"
//                               : "bg-red-200 text-red-700"
//                           }`}
//                         >
//                           {app.status}
//                         </span>
//                       </p>

//                       {/* Resume & Cover Letter Links */}
//                       <div className="mt-2">
//                         {app.resume && (
//                           <a
//                             href={`http://localhost:3337/uploads/${app.resume}`}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="text-blue-600 hover:underline"
//                           >
//                             View Resume
//                           </a>
//                         )}
//                         {app.cover_letter && (
//                           <p className="text-gray-600 mt-1">
//                             <strong>Cover Letter:</strong> {app.cover_letter}
//                           </p>
//                         )}
//                       </div>

//                       {/* Employer Actions (For Applications Received) */}
//                       <div className="flex space-x-2 mt-3">
//                         <button
//                           className="px-4 py-2 bg-green-600 text-white rounded-lg"
//                           onClick={() => updateApplicationStatus(app.application_id, "accepted")}
//                         >
//                           Accept
//                         </button>
//                         <button
//                           className="px-4 py-2 bg-red-600 text-white rounded-lg"
//                           onClick={() => updateApplicationStatus(app.application_id, "rejected")}
//                         >
//                           Reject
//                         </button>
//                       </div>
//                     </div>
//                   ))
//                 )}
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// const updateApplicationStatus = async (application_id, newStatus) => {
//   try {
//     const response = await axios.put(
//       `http://localhost:3337/api/applications/${application_id}`,
//       { status: newStatus },
//       { withCredentials: true }
//     );
//     toast.success(`Application ${newStatus}`);
//   } catch (error) {
//     toast.error("Failed to update application status.");
//   }
// };

// export default ManageApplications;

import React from 'react'

function ManageApplications() {
  return (
    <div>ManageApplications</div>
  )
}

export default ManageApplications
