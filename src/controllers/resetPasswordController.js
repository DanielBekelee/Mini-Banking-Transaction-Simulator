import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;


    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }

    // ✅ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ Find user
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // ✅ Hash new password
    user.password = await bcrypt.hash(password, 10);
    await user.save();

    res.json({ message: "Password reset successful" });

  } catch (error) {
    console.error(error);

    if (error.name === "TokenExpiredError") {
      return res.status(400).json({ message: "Token expired" });
    }

    res.status(400).json({ message: "Invalid or expired token" });
  }
};
