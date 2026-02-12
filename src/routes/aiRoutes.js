import express from "express";
import { analyzeTransactionAI } from "../services/aiService.js";

const router = express.Router();

router.post("/analyze", async (req, res, next) => {
  try {
    const result = await analyzeTransactionAI(req.body);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

export default router;
