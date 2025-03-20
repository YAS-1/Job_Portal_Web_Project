import express from "express";
import {
  getMyProfile,
  getUserProfile,
  updateProfile,
  uploadProfilePicture,
  changePassword,
  upgradeToEmployer
} from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/auth.js";
import multer from "multer";
import path from "path";

// Configure Multer for profile pictures (images only)
const profileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/profile_pictures/");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `profile-${req.user.userId}-${Date.now()}${ext}`);
  },
});

const profileUpload = multer({
  storage: profileStorage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only images are allowed!"), false);
    }
  },
  limits: { fileSize: 1024 * 1024 * 2 }, // Max size: 2MB
});

const UserRouter = express.Router();

// Get logged-in user's profile
UserRouter.get("/me", verifyToken, getMyProfile);

// Get another user's profile by user_id
UserRouter.get("/:user_id", verifyToken, getUserProfile);

// Update profile (name, contact, email)
UserRouter.put("/update", verifyToken, updateProfile);

// Upload profile picture
UserRouter.post("/upload-profile-picture", verifyToken, profileUpload.single("profile_picture"), uploadProfilePicture);

// Change password
UserRouter.put("/change-password", verifyToken, changePassword);


// Allow job seekers to become employers
UserRouter.post("/upgrade-to-employer", verifyToken, upgradeToEmployer);

export default UserRouter;
