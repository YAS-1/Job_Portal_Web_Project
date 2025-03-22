import db from "../config/db.config.js";
import bcrypt from "bcryptjs";



// View logged-in user's profile
export const getMyProfile = async (req, res) => {
  try {
    const userId = req.user.userId;
    const [users] = await db.query("SELECT user_id, username, email, roles, profile_picture FROM users WHERE user_id = ?", [userId]);

    if (users.length === 0) {
      return res.status(404).json({ message: "User not found." });
    }

    // If there's a profile picture, convert the path to a URL
    const user = users[0];
    if (user.profile_picture) {
      // Convert the relative path to a URL
      user.profile_picture = `http://localhost:3337/${user.profile_picture.replace(/\\/g, '/')}`;
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Get Profile Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};



// View another user's profile
export const getUserProfile = async (req, res) => {
  try {
    const { user_id } = req.params;
    const [users] = await db.query("SELECT user_id, username, email, roles, profile_picture FROM users WHERE user_id = ?", [user_id]);

    if (users.length === 0) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json(users[0]);
  } catch (error) {
    console.error("Get User Profile Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};



// Update user profile (name, contact, email)
export const updateProfile = async (req, res) => {
  try {
    const { username, email } = req.body;
    const userId = req.user.userId;

    if (email) {
      const [existingUser] = await db.query("SELECT * FROM users WHERE email = ? AND user_id != ?", [email, userId]);
      if (existingUser.length > 0) {
        return res.status(400).json({ message: "Email is already in use by another user." });
      }
    }

    await db.query("UPDATE users SET username = ?, email = ? WHERE user_id = ?", [username || null, email || null, userId]);

    res.status(200).json({ message: "Profile updated successfully!" });
  } catch (error) {
    console.error("Update Profile Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};




// Upload profile picture
export const uploadProfilePicture = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded." });
    }

    const profilePicturePath = req.file.path;
    const userId = req.user.userId;

    await db.query("UPDATE users SET profile_picture = ? WHERE user_id = ?", [profilePicturePath, userId]);

    res.status(200).json({ message: "Profile picture updated successfully!", profile_picture: profilePicturePath });
  } catch (error) {
    console.error("Upload Profile Picture Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Change password
export const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const userId = req.user.userId;

    const [users] = await db.query("SELECT password FROM users WHERE user_id = ?", [userId]);
    const user = users[0];

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Incorrect old password." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    await db.query("UPDATE users SET password = ? WHERE user_id = ?", [hashedPassword, userId]);

    res.status(200).json({ message: "Password updated successfully!" });
  } catch (error) {
    console.error("Change Password Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


// Allow a jobseeker to become an employer
export const upgradeToEmployer = async (req, res) => {
  try {
    const userId = req.user.userId;

    // Check the current role
    const [user] = await db.query("SELECT roles FROM users WHERE user_id = ?", [userId]);
    if (user.length === 0) {
      return res.status(404).json({ message: "User not found." });
    }

    let currentRoles = user[0].roles.split(",");

    // If already an employer, do nothing
    if (currentRoles.includes("employer")) {
      return res.status(400).json({ message: "You are already an employer." });
    }

    // Add 'employer' role to the user
    currentRoles.push("employer");
    const newRoles = currentRoles.join(",");

    await db.query("UPDATE users SET roles = ? WHERE user_id = ?", [newRoles, userId]);

    res.status(200).json({ message: "You are now an employer!" });
  } catch (error) {
    console.error("Upgrade To Employer Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};