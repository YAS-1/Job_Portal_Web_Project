import jwt from "jsonwebtoken";


export const verifyToken = (req, res, next) => {
    const token = req.cookies.jwt;
    console.log("Token:", token);

    if (!token) {
        return res.status(401).json({ message: "Unauthorized. No token provided." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { userId: decoded.userId, roles: decoded.roles }; // Ensure `userId` and `roles` are set
        console.log("Decoded Token:", decoded); // Debugging line
        next();
    } catch (error) {
        console.error("Invalid token:", error);
        res.status(403).json({ message: "Forbidden. Invalid token." });
    }
};
