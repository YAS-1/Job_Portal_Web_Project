/* eslint-disable no-unused-expressions */
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import db from "./config/db.config.js";

import { createUsersTable } from "./models/users.model.js";
import { createJobsTable } from "./models/job.model.js";
import { createApplicationsTable } from "./models/application.model.js";

import AuthRouter from "./routes/auth.routes.js";
import JobsRouter from "./routes/job.routes.js";
import ApplicationsRouter from "./routes/application.routes.js";
import UserRouter from "./routes/user.routes.js"; // Import user routes


const app = express();

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

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
