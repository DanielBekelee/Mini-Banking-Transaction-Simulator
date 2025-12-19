import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  let token;

  console.log("AUTH HEADER:", req.headers.authorization);

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");

      return next(); // <--- RETURN here
    } catch (error) {
      console.error("JWT VERIFY ERROR:", error.message);
      return res.status(401).json({ message: "Not authorized, invalid token" });
    }
  }

  // This runs ONLY if token is undefined
  return res.status(401).json({ message: "Not authorized, no token" });
};
