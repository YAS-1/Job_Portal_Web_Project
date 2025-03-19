import db from "../config/db.config.js";
import bcrypt from "bcrypt";
import { generateTokenAndSetCookie } from "../utils/tokenGenerator.js";
import { ResetEmail } from "../utils/mailer.js";


//Registering a new user
export const register = async (req, res) =>{
    try {
        const { username, email, password, role } = req.body; // getting the user details from the request body
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regular expression to validate email format
        if(!emailRegex.test(email)){
            return res.status(400).json({message: "Invalid email"});
        }

        //checking if the user already exists
        const [existingUser] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
        if (existingUser.length>0){
            return res.status(400).json({message: "User already exists"});
        }

        //hashing the password
        const salt = await bcrypt.genSalt(10); //generating a salt
        const hashedPassword = await bcrypt.hash(password, salt); //hashing the password by applying the generated salt

        //inserting the user details into the database
        const [result] = await db.query("INSERT INTO users (username, email, password, roles) VALUES (?, ?, ?, ?)", [username, email, hashedPassword, role]);

        //Generating a token for the created user
        generateTokenAndSetCookie(result.insertId, res); //inserting the user id into the cookie
        res.status(201).json({message: "User registered successfully"});

    } catch (error) {
        console.log(`Error in registering user: ${error}`);
        res.status(500).json({message: "Error in registering new user"});
    }
};


//Logging in a user
export const login = async (res, req) => {
    try {
        const {email, password} = req.body; // getting the user details from the request body
        if(!email || !password){
            return res.status(400).json({message: "Please enter both email and password"});
        }

        //getting the user details from the database
        const [user] = await db.query("SELECT * FROM users WHERE email = ?", [email]);

        if(user.length === 0){
            return res.status(400).json({message: "User not found"});
        }
        //Comparing the password entered by the user with the hashed password stored in the database
        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if(!isPasswordMatch){
            return res.status(400).json({message: "Invalid password"});
        }

        //Generating a token for the logged in user
        generateTokenAndSetCookie(user.user_id, res); //inserting the user id into the cookie
        res.status(200).json({message: "User logged in successfully"});

    } catch (error) {
        console.log(`Error in logging in user: ${error}`);
        res.status(500).json({message: "Error in logging in user"});
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
            return res.status(400).json({message: "User not found"});
        }

        //generating the OTP code
        const otp = Math.floor(10000 + Math.random() * 90000); //generating a random 5 digit number between 10000 and 99999
        const otpExpires = new Date(Date.now() + 10 * 60 * 1000); //setting the OTP code to expire in 10 minutes

        //updating the user details in the database
        await db.query("UPDATE users SET otp_code = ?, otp_expires = ? WHERE user_id = ?", [otp, otpExpires, user.user_id]);

        //sending the OTP code to the user email
        await ResetEmail(email, otp);
        res.status(200).json({message: "OTP code sent successfully"});

    } catch (error) {
        console.log(`Forgot password error: ${error}`);
        res.status(500).json({message: "Error in forgot password"});
    }
};

