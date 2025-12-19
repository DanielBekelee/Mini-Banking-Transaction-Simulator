import express from "express";

import { depositMoney, withdrawMoney, transferMoney } from "../controllers/accountController.js";

const router = express.Router();

router.post("/deposit", depositMoney);
router.post("/withdraw", withdrawMoney);
router.post("/transfer", transferMoney);

export default router;
