import jwt from "jsonwebtoken";

//middleware to check if the the current user is authenticated or not inorder to access the protected routes
export const verifyToken  = async (req, res, next) => { //checks for authentication and the runs the next handler function if the user is authenticated
    const token = req.cookies.jwt; //getting the token from the cookies

    if(!token){ //when token returns null value
        return res.status(403).json({ message: "No token provided" });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err){
            return res.status(401).json({ message: "Unauthorized to access this route" });
        }
        req.user = decoded; //retriving the user details from the decoded token
        next();//calling the next handler function
    });
};


//role-checking middleware
export const checkRole = (allowedRoles) => { //checkRole function accepts an array of allowed roles
    return (req, res, next) => {
        const roles = req.user.roles ? req.user.roles.split(",") : []; //splitting the user roles by a comma and converting it to an array
        const hasRole = allowedRoles.some(role => roles.includes(role)); //checking if any of the allowed roles exists in the user roles array

        if(!hasRole){ //Incase no allowed role is found
            return res.status(403).json({ message: "No permissions" });
        }
        next(); //calling the next handler function
    }
}