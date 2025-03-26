import express from "express";
import { 
  createJob, 
  getAllJobs, 
  getJobById, 
  updateJob, 
  deleteJob,
  searchJobs,

} from "../controllers/job.controller.js";
import { verifyToken } from "../middleware/auth.js";
import { checkRole } from "../middleware/checkRole.js";

const JobsRouter = express.Router();

// Get all active jobs (Public route)
JobsRouter.get("/", getAllJobs);

// Search jobs (Public route)
JobsRouter.get("/search", searchJobs);

// Get a single job by ID (Public route)
JobsRouter.get("/:job_id", getJobById);

// Create a job (Only employers can post jobs)
JobsRouter.post("/", verifyToken, checkRole("employer"), createJob);

// Update a job (Only the employer who created it can update it)
JobsRouter.put("/:job_id", verifyToken, checkRole("employer"), updateJob);

// Delete a job (Only the employer who created it can delete it)
JobsRouter.delete("/:job_id", verifyToken, checkRole("employer"), deleteJob);




export default JobsRouter;