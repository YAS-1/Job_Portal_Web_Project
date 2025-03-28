import db from "../config/db.config.js";
import bcrypt from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/tokenGenerator.js";
import { ResetEmail } from "../utils/mailer.js";
import jwt from "jsonwebtoken";


//Registering a new user
export const register = async (req, res) => {
    try {
        const { username, email, password, role} = req.body; // Include role in the request body

        // Validate required fields
        if (!username || !email || !password) {
            console.log("All fields are required");
            return res.status(400).json({ message: "All fields are required" });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regular expression to validate email format
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email" });
        }

        // Check if the user already exists
        const [existingUsers] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
        if (existingUsers.length > 0) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Set the default role to jobseeker if no role is provided
        const userRole = role || "jobseeker";

        // Insert the user into the database
        const [result] = await db.query(
            "INSERT INTO users (username, email, password, roles) VALUES (?, ?, ?, ?)",
            [username, email, hashedPassword, userRole]
        );

        // Generate a token with the user's role
        generateTokenAndSetCookie(result.insertId, userRole, res);
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.log(`Error in registering user: ${error}`);
        res.status(500).json({ message: "Error in registering new user" });
    }
};


//Login a user
export const login = async (req, res) => {
    try {
        const { email, password } = req.body; // Getting the user details from the request body
        if (!email || !password) {
            return res.status(400).json({ message: "Please enter both email and password" });
        }

        // Fetching the user details from the database
        const [row] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
        if (!row.length) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        
        const user = row[0];
        console.log("User Data:", user); // Debugging
        console.log("User Roles:", user.roles); // Debugging

        // Compare passwords
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({ message: "Invalid password" });
        }

        // Generate token using `user.user_id`
        generateTokenAndSetCookie(user.user_id, user.roles, res);
        
        res.status(200).json({ message: "User logged in successfully" });
    } catch (error) {
        console.log(`Error in logging in user: ${error}`);
        res.status(500).json({ message: "Error in logging in user" });
    }
};




//Logout a user
export const logout = async (req, res) =>{
    try {
        res.clearCookie("jwt"); //clearing the cookie
        res.status(200).json({message: "User logged out successfully"});
    } catch (error) {
        console.log(`Error in logging out user: ${error}`);
        res.status(500).json({message: "Error in logging out user"});       
    }
};


//The forgot password function
export const forgotPassword = async (req, res) => {

    try {
        const {email} = req.body; // getting the user email from the request body
        if(!email){
            return res.status(400).json({message: "Please enter your email"});
        }

        //getting the user details from the database
        const [user] = await db.query("SELECT * FROM users WHERE email = ?", [email]);

        if(!user.length){
            return res.status(400).json({message: "Error finding user"});
        }

        //generating the OTP code
        const otp = Math.floor(10000 + Math.random() * 90000); //generating a random 5 digit number between 10000 and 99999
        const otpExpires = new Date(Date.now() + 10 * 60 * 1000); //setting the OTP code to expire in 10 minutes

        //updating the user details in the database
        await db.query("UPDATE users SET otp_code = ?, otp_expires = ? WHERE email = ?", [otp, otpExpires, email]);

        //sending the OTP code to the user email
        await ResetEmail(email, otp);
        res.status(200).json({message: "OTP code sent successfully"});

    } catch (error) {
        console.log(`Forgot password error: ${error}`);
        res.status(500).json({message: "Error in forgot password"});
    }
};


//Verifying the OTP code
export const verifyOTP = async (req, res) => {
    try {
        const {email, otp} = req.body; // getting the user email and OTP code from the request body
        if(!email || !otp){
            return res.status(400).json({message: "Please enter your email and OTP code"});
        }

        //getting the user details from the database
        const [user] = await db.query("SELECT * FROM users WHERE email = ? AND otp_code = ?", [email, otp]);
        if(!user.length){
            return res.status(400).json({message: "Invalid OTP code"});
        }

        //checking if the OTP code has expired
        const {otp_expires} = user[0];
        if(new Date() > new Date(otp_expires)){
            return res.status(400).json({message: "OTP code has expired"});
        }
        res.status(200).json({message: "OTP code verified successfully"});

    } catch (error) {
        console.log(`Error in verifying OTP: ${error}`);
        res.status(500).json({message: "Error in verifying OTP"});
    }
};


//Resetting the password
export const resetPassword = async (req, res) => {
    try {
        const {email, newPassword} = req.body; // getting the user email and new password from the request body
        if(!email || !newPassword){
            return res.status(400).json({message: "Please enter your email and new password"});
        }

        //getting the user details from the database
        const[user] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
        if(!user.length){
            return res.status(400).json({message: "Error finding user"});
        }
        //hashing the new password
        const salt = await bcrypt.genSalt(10); //generating a salt
        const hashedPassword = await bcrypt.hash(newPassword, salt); //hashing the new password by applying the generated salt

        //updating the user details in the database
        await db.query("UPDATE users SET password = ?, otp_code = NULL, otp_expires = NULL WHERE email = ?", [hashedPassword, email]);
        res.status(200).json({message: "Password reset successfully. Please login with your new password"});
        
    } catch (error) {
        console.log(`Error in resetting password: ${error}`);
        res.status(500).json({message: "Error in resetting password"});
    }
};
