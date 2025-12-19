import express from "express";
import { transferMoney } from "../controllers/transferController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/transfer", protect, transferMoney);

export default router;
