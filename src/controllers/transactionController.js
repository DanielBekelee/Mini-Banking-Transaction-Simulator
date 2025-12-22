import Transaction from "../models/Transaction.js";
import BankAccount from "../models/BankAccount.js";
export const getTransactionHistory = async (req, res) => {
  const transactions = await Transaction.find({ user: req.user.id })
    .sort({ createdAt: -1 });

  res.json(transactions);
};



export const getAccountStatement = async (req, res) => {
  const { startDate, endDate, type } = req.query;

  const account = await BankAccount.findOne({ user: req.user.id });
  if (!account) {
    return res.status(404).json({ message: "Account not found" });
  }

  const filter = {
    account: account._id,
  };

  if (type) {
    filter.type = type;
  }

  if (startDate || endDate) {
    filter.createdAt = {};
    if (startDate) filter.createdAt.$gte = new Date(startDate);
    if (endDate) filter.createdAt.$lte = new Date(endDate);
  }

  const transactions = await Transaction.find(filter).sort({ createdAt: -1 });

  res.json({
    accountNumber: account.accountNumber,
    totalTransactions: transactions.length,
    transactions,
  });
};

