import express from "express";

import {createBankAccount, depositMoney, withdrawMoney, transferMoney } from "../controllers/accountController.js";
import { protect } from "../middleware/authMiddleware.js";


const router = express.Router();
router.post("/", protect, createBankAccount);
router.post("/deposit", protect, depositMoney);
router.post("/withdraw", protect, withdrawMoney);
router.post("/transfer", protect, transferMoney);


export default router;








