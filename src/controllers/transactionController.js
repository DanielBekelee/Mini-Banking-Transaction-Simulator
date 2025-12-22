import Transaction from "../models/Transaction.js";
import BankAccount from "../models/BankAccount.js";
export const getTransactionHistory = async (req, res) => {
  const transactions = await Transaction.find({ user: req.user.id })
    .sort({ createdAt: -1 });

  res.json(transactions);
};





// Get account statement with optional filters
export const getAccountStatement = async (req, res) => {
  try {
    const account = await BankAccount.findOne({ user: req.user._id });

    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    // Get query params
    const { type, startDate, endDate, minAmount, maxAmount } = req.query;

    // Filter transactions
    let filtered = account.transactions;

    if (type) {
      filtered = filtered.filter(tx => tx.type === type);
    }
    if (startDate) {
      const start = new Date(startDate);
      filtered = filtered.filter(tx => new Date(tx.date) >= start);
    }
    if (endDate) {
      const end = new Date(endDate);
      filtered = filtered.filter(tx => new Date(tx.date) <= end);
    }
    if (minAmount) {
      filtered = filtered.filter(tx => tx.amount >= Number(minAmount));
    }
    if (maxAmount) {
      filtered = filtered.filter(tx => tx.amount <= Number(maxAmount));
    }

    res.json({ transactions: filtered });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};


