import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = (user_id, roles, res) => {
    const token = jwt.sign(
        { userId: user_id, roles },  // Use `user_id` from the database
        process.env.JWT_SECRET,
        { expiresIn: "15d" }
    );

    res.cookie("jwt", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        maxAge: 15 * 24 * 60 * 60 * 1000,
    });

    console.log("Generated Token:", token);
    console.log("Decoded Token:", jwt.decode(token)); // Debugging
};
