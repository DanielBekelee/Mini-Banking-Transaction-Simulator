import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import accountRoutes from "./routes/accountRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";
import transferRoutes from "./routes/transferRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

import { errorHandler } from "./middleware/errorMiddleware.js";

import helmet from "helmet";
import cors from "cors";
import User from "./models/User.js"; // ✅ REQUIRED
import aiRoutes from "./routes/aiRoutes.js";

dotenv.config();
connectDB();

const app = express();

// 🔐 Security middleware
app.use(helmet());
app.use(cors());

// 📦 Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 🚏 Routes
app.use("/api/auth", authRoutes);
app.use("/api/accounts", accountRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/transfer", transferRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/ai", aiRoutes);

// 🔍 Debug / test route
app.get("/api/users-with-accounts", async (req, res) => {
  const users = await User.find().populate("bankAccount");
  res.json(users);
});

// Health check
app.get("/", (req, res) => {
  res.send("Mini Banking API is running");
});

// ❗ Error handler MUST be last
app.use(errorHandler);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
