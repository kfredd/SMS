const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Import User model

module.exports = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.split(" ")[1]; // Extract token
    if (!token) {
      console.log("❌ No token provided");
      return res.status(401).json({ message: "Access denied. No token provided." });
    }

    // // Debug: Check decoded user data console.log("✅ Token received:", token);

    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Decode token
    //// Debug: Check decoded user data console.log("✅ Decoded JWT:", decoded); 

    // Fetch user from DB
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      console.log("❌ User not found in DB");
      return res.status(401).json({ message: "User not found." });
    }

    req.user = user; // Attach user object to req
    // // Debug: Check if user is set console.log("✅ User attached to request:", req.user); 

    next();
  } catch (error) {
    console.error("❌ JWT Verification Failed:", error.message);
    return res.status(401).json({ message: "Invalid token." });
  }
};
