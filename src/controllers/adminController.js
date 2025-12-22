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
// Get platform analytics
export const getAnalytics = async (req, res) => {
  try {
    // Total users
    const totalUsers = await User.countDocuments();

    // Total accounts
    const totalAccounts = await BankAccount.countDocuments();

    // Total deposits & withdrawals
    const accounts = await BankAccount.find();
    let totalDeposits = 0;
    let totalWithdrawals = 0;
    let highestBalance = 0;
    let highestAccount = null;

    accounts.forEach(account => {
      account.transactions.forEach(tx => {
        if (tx.type === "deposit") totalDeposits += tx.amount;
        if (tx.type === "withdraw") totalWithdrawals += tx.amount;
      });

      if (account.balance > highestBalance) {
        highestBalance = account.balance;
        highestAccount = account.accountNumber;
      }
    });

    res.json({
      totalUsers,
      totalAccounts,
      totalDeposits,
      totalWithdrawals,
      highestBalance,
      highestAccount,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

