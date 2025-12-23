import express from "express";
import { protect } from "../middleware/authMiddleware.js";

import { registerUser, loginUser } from "../controllers/authController.js";
import { updatePassword } from "../controllers/updatePasswordController.js";
import { forgotPassword } from "../controllers/forgotPassworController.js";
import { resetPassword } from "../controllers/resetPasswordController.js";
import { forgotPasswordLimiter } from "../middleware/rateLimitMiddleware.js";
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/update-password", protect, updatePassword);
//forgot password
router.post("/forgot-password",forgotPasswordLimiter, forgotPassword);
// Reset password
router.put("/reset-password/:token", resetPassword);


export default router;
