export const checkRole = (requiredRole) => {
    return (req, res, next) => {
      try {
        // Assuming `req.user` is populated by `verifyToken` middleware
        const userRole = req.user.role; // `role` should be part of the token payload or fetched from the database
  
        if (userRole !== requiredRole) {
          return res.status(403).json({ message: "Access denied. Insufficient permissions." });
        }
  
        next(); // User has the required role, proceed to the next middleware/controller
      } catch (error) {
        console.error("Error checking user role:", error);
        res.status(500).json({ message: "Internal server error." });
      }
    };
  };