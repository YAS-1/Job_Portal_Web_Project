import express from "express";
import { createJob, getJobs, updateJob, deleteJob } from "../controllers/jobs.controller";
import { verifyToken } from "../middleware/auth";

const JobsRouter = express.Router();


JobsRouter.get("/", getJobs);
JobsRouter.post("/", verifyToken, createJob);
JobsRouter.put("/:job_id", verifyToken, updateJob);
JobsRouter.delete("/:job_id", verifyToken, deleteJob);

export default JobsRouter;