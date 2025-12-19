import BankAccount from "../models/BankAccount.js";
import Transaction from "../models/Transaction.js";

export const transferMoney = async (req, res) => {
  const { toAccountNumber, amount } = req.body;

  if (!toAccountNumber || amount <= 0) {
    return res.status(400).json({ message: "Invalid transfer data" });
  }

  const senderAccount = await BankAccount.findOne({ user: req.user.id });
  if (!senderAccount) {
    return res.status(404).json({ message: "Sender account not found" });
  }

  if (senderAccount.accountNumber === toAccountNumber) {
    return res.status(400).json({ message: "Cannot transfer to same account" });
  }

  if (senderAccount.balance < amount) {
    return res.status(400).json({ message: "Insufficient balance" });
  }

  const receiverAccount = await BankAccount.findOne({
    accountNumber: toAccountNumber,
  });

  if (!receiverAccount) {
    return res.status(404).json({ message: "Receiver account not found" });
  }

  // Perform transfer
  senderAccount.balance -= amount;
  receiverAccount.balance += amount;

  await senderAccount.save();
  await receiverAccount.save();

  // Sender transaction
  await Transaction.create({
    user: senderAccount.user,
    account: senderAccount._id,
    type: "transfer-out",
    amount,
    balanceAfter: senderAccount.balance,
  });

  // Receiver transaction
  await Transaction.create({
    user: receiverAccount.user,
    account: receiverAccount._id,
    type: "transfer-in",
    amount,
    balanceAfter: receiverAccount.balance,
  });

  res.json({
    message: "Transfer successful",
    balance: senderAccount.balance,
  });
};
