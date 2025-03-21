import express from "express";
import { 
  createJob, 
  getAllJobs, 
  getJobById, 
  updateJob, 
  deleteJob,
  searchJobs 
} from "../controllers/job.controller.js";
import { verifyToken } from "../middleware/auth.js";

const JobsRouter = express.Router();

// Get all active jobs
JobsRouter.get("/", getAllJobs);

// Search jobs
JobsRouter.get("/search", searchJobs);

// Get a single job by ID
JobsRouter.get("/:job_id", getJobById);

// Create a job (Only employers can post jobs)
JobsRouter.post("/", verifyToken, createJob);

// Update a job (Only the employer who created it can update it)
JobsRouter.put("/:job_id", verifyToken, updateJob);

// Delete a job (Only the employer who created it can delete it)
JobsRouter.delete("/:job_id", verifyToken, deleteJob);

export default JobsRouter;
