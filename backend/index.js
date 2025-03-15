/* eslint-disable no-unused-expressions */
import express from "express";
import dotenv from "dotenv";
import db from "./config/db.config.js";
import { createUsersTable } from "./models/users.model.js";

const app = express();

dotenv.config();

app.use(express.json());

const port = process.env.WEB_PORT || 3333;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    createUsersTable();
});
