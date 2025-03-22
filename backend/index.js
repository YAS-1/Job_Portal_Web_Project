/* eslint-disable no-unused-expressions */
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import fs from 'fs';
import db from "./config/db.config.js";

import { createUsersTable } from "./models/users.model.js";
import { createJobsTable } from "./models/job.model.js";
import { createApplicationsTable } from "./models/application.model.js";

import AuthRouter from "./routes/auth.routes.js";
import JobsRouter from "./routes/job.routes.js";
import ApplicationsRouter from "./routes/application.routes.js";
import UserRouter from "./routes/user.routes.js"; // Import user routes

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create uploads directories if they don't exist
const uploadsDir = path.join(__dirname, 'uploads');
const profilePicturesDir = path.join(uploadsDir, 'profile_pictures');
const documentsDir = path.join(uploadsDir, 'documents');

[uploadsDir, profilePicturesDir, documentsDir].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: ["http://localhost:3000", "http://localhost:5173"],
    credentials: true,
}));

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const port = process.env.WEB_PORT || 3337;
//
//Routes
app.use("/api/auth", AuthRouter);
app.use("/api/jobs", JobsRouter);
app.use("/api/applications", ApplicationsRouter);
app.use("/api/user", UserRouter); // Add user routes

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    createUsersTable();
    createJobsTable();
    createApplicationsTable();
});
