import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER, // Handles emailing for the web appication
        pass: process.env.EMAIL_PASS // Generated app password
    },
});

//Function that handles sending the reset password OTP code takes in two parameters email and otp
export const ResetEmail = async (email, otp) => {
    const mail = {
        from: process.env.EMAIL_USER, //The sending email
        to: email, //The receiving email - the user email
        subject: 'Password reset OTP code', //The subject of the email
        text: `Your OTP code is: ${otp}`, //The body of the email
    };

    try{//if the email is successfully sent
        await transporter.sendMail(mail);
        console.log('Email sent successfully',email);
    }
    catch(err){ //if the email fails to send
        console.log(`Error in sending email: ${err}`);
    }
};