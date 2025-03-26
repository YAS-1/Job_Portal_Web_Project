// checks if among the roles of the user the one required is present
export const checkRole = (requiredRole) => {
  return (req, res, next) => {
    try {
      if (!req.user || !req.user.roles) {
        return res.status(401).json({ message: "Unauthorized. User information is missing." });
      }

      const userRoles = req.user.roles.split(','); // Assuming `req.user.roles` is a comma-separated string
      if (!userRoles.includes(requiredRole)) {
        return res.status(403).json({ message: "Access denied. Insufficient permissions." });
      }

      next(); // User has the required role, proceed to the next middleware/controller
    } catch (error) {
      console.error("Error checking user role:", error);
      res.status(500).json({ message: "Internal server error." });
    }
  };
};