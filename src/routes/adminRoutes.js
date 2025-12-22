import express from "express";
import { getAllAccounts } from "../controllers/adminController.js";
import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";

const router = express.Router();

router.get("/accounts", protect, adminOnly, getAllAccounts);

export default router;

