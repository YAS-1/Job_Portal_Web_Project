import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = (userId, role, res) => {
    // Generate a JWT that includes the user's role and expires in 15 days
    const token = jwt.sign({ userId, role }, process.env.JWT_SECRET, {
        expiresIn: '15d',
    });

    res.cookie("jwt", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV !== "development",
    });
};