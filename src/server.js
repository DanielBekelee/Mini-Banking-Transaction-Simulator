import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js"; // add this line
import accountRoutes from "./routes/accountRoutes.js";

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes); // attach auth routes
app.use("/api/accounts", accountRoutes);

// Test route
app.get("/api/users-with-accounts", async (req, res) => {
  const users = await User.find().populate("bankAccount"); // populate linked account
  res.json(users);
});

app.get("/", (req, res) => {
  res.send("Mini Banking API is running");
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;



