import express from "express";
import { register, login, logout, forgotPassword, verifyOTP, resetPassword } from "../controllers/auth.controller.js";

const AuthRouter = express.Router();

AuthRouter.post("/register", register);
AuthRouter.post("/login", login);
AuthRouter.post("/logout", logout);
AuthRouter.post("/forgot-password", forgotPassword);
AuthRouter.post("/verify-otp", verifyOTP);
AuthRouter.post("/reset-password", resetPassword);

export default AuthRouter;