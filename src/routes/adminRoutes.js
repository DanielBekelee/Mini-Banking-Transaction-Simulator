import express from "express";
import { protect, isAdmin } from "../middleware/authMiddleware.js"; // named imports
import { getAllUsers, getAllAccounts } from "../controllers/adminController.js";

const router = express.Router();

router.get("/users", protect, isAdmin, getAllUsers);
router.get("/accounts", protect, isAdmin, getAllAccounts);

export default router;
