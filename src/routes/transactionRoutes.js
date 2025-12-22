import express from "express";
import { getTransactionHistory, getAccountStatement } from "../controllers/transactionController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/history", protect, getTransactionHistory);


router.get("/statement", protect, getAccountStatement);


export default router;







