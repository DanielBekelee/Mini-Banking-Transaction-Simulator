import Transaction from "../models/Transaction.js";

export const getTransactionHistory = async (req, res) => {
  const transactions = await Transaction.find({ user: req.user.id })
    .sort({ createdAt: -1 });

  res.json(transactions);
};
