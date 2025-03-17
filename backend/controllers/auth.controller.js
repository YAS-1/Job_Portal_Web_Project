/* eslint-disable no-unused-vars */
import db from "../config/db.config.js";
import bcrypt from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/tokenGenerator.js";



//Register
export const register = async (req, res) => {
    try {
        const { email, password, role, name, contact } = req.body; //User provides email, password, role, name, contact

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; //Check if email is valid
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email" });
        }

        //checking if email already exists
        const [existingUser] = await db.query("SELECT * FROM users WHERE email = ?", [email]);

        if (existingUser.length > 0) {
            return res.status(400).json({ message: "Email already exists" });
        }

        //Hashing the registered password
        const salt = await bcrypt.genSalt(10); //generating salt
        const hashedPassword = await bcrypt.hash(password, salt); //hashing password

        //Creating new user
        const newUser = db.query("INSERT INTO users (email, password, role, name, contact) VALUES (?, ?, ?, ?, ?)", [email, hashedPassword, role, name, contact]);
        if (!newUser) {
            return res.status(400).json({ message: "Failed to register user" });
        }
        
        //Generating token
        generateTokenAndSetCookie(newUser.insertId, res);
        res.status(201).json({ message: "User registered successfully" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
};


//Login handler function
export const login = async (req, res) => {
    try {
        const { email, password } = req.body; //User provides email and password
        //Checking if the user provides email and password
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        //Checking if user exists
        const [users] = await db.query("SELECT * FROM users WHERE email = ?", [email]);

        const user = users[0];

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        //Comparing password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid password" });
        }

        //Generating token
        generateTokenAndSetCookie(user.id, res);
        res.status(200).json({ message: "User logged in successfully" });

    } catch (error) {
        console.log(`Error in logging in: ${error}`);
        res.status(500).json({ message: "Server error" });
    }
};

//Logout handler function
export const logout = async (req, res) => {
    try {
        res.clearCookie("jwt");
        res.status(200).json({ message: "User logged out successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
};

