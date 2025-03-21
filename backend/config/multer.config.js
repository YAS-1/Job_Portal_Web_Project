import multer from "multer";
import path from "path";

// Define storage for profile pictures
const profileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/profile_pictures/"); // Store profile pictures separately
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `profile-${req.user.userId}-${Date.now()}${ext}`);
  },
});

// Define storage for resumes and cover letters
const documentStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/documents/"); // Store resumes & cover letters separately
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${req.user.userId}-${Date.now()}${ext}`);
  },
});

// Define filters
const profileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only images are allowed for profile pictures!"), false);
  }
};

const documentFilter = (req, file, cb) => {
  if (
    file.mimetype === "application/pdf" ||
    file.mimetype === "application/msword" ||
    file.mimetype.startsWith("application/vnd.openxmlformats-officedocument.wordprocessingml.document")
  ) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only PDF and DOC/DOCX files are allowed!"), false);
  }
};

// Profile picture upload middleware
export const uploadProfilePicture = multer({
  storage: profileStorage,
  fileFilter: profileFilter,
  limits: { fileSize: 1024 * 1024 * 2 }, // Limit to 2MB
});

// Resume & Cover Letter upload middleware
export const uploadDocuments = multer({
  storage: documentStorage,
  fileFilter: documentFilter,
  limits: { fileSize: 1024 * 1024 * 5 }, // Limit to 5MB
});
