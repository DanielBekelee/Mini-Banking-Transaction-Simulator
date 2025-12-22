import BankAccount from "../models/BankAccount.js";
import User from "../models/User.js";

// View all bank accounts
export const getAllAccounts = async (req, res) => {
  const accounts = await BankAccount.find().populate("user", "name email");
  res.json(accounts);
};




// View all users
export const getAllUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
};


