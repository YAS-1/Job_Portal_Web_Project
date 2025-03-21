import express from "express";
import {
  applyForJob,
  getJobApplications,
  getUserApplications,
  downloadFile,
} from "../controllers/applications.controller.js";
import { verifyToken } from "../middleware/auth.js";
import multer from "multer";
import path from "path";

// Configure Multer for resumes & cover letters (PDF/DOCX only)
const documentStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/documents/");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${req.user.userId}-${Date.now()}${ext}`);
  },
});

const documentUpload = multer({
  storage: documentStorage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === "application/pdf" ||
      file.mimetype === "application/msword" ||
      file.mimetype.startsWith("application/vnd.openxmlformats-officedocument.wordprocessingml.document")
    ) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only PDF and DOC/DOCX files are allowed!"), false);
    }
  },
  limits: { fileSize: 1024 * 1024 * 5 }, // Max size: 5MB
});

const ApplicationsRouter = express.Router();

// Apply for a job (upload resume & cover letter)
ApplicationsRouter.post(
  "/apply",
  verifyToken,
  documentUpload.fields([
    { name: "resume", maxCount: 1 },
    { name: "cover_letter", maxCount: 1 },
  ]),
  applyForJob
);

// Get applications for a specific job (for employers)
ApplicationsRouter.get("/job/:job_id", verifyToken, getJobApplications);

// Get applications submitted by the logged-in user
ApplicationsRouter.get("/my-applications", verifyToken, getUserApplications);

// Download resume or cover letter
ApplicationsRouter.get("/download/:application_id/:fileType", verifyToken, downloadFile);

export default ApplicationsRouter;
