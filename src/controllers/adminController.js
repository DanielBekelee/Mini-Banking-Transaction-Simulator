import BankAccount from "../models/BankAccount.js";
import User from "../models/User.js";

export const getAllAccounts = async (req, res) => {
  try {
    const accounts = await BankAccount.find()
      .populate("user", "name email role")
      .select("accountNumber balance createdAt");

    res.json(accounts);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
