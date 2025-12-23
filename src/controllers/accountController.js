import BankAccount from "../models/BankAccount.js";
import Transaction from "../models/Transaction.js";

// 🔹 Get My Account Details
export const getMyAccount = async (req, res) => {
  try {
    const account = await BankAccount.findOne({ user: req.user._id });

    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    res.json({
      accountNumber: account.accountNumber,
      balance: account.balance,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};


// 🔹 Deposit Money
export const depositMoney = async (req, res) => {
  const { amount } = req.body;

  if (amount <= 0) {
    return res.status(400).json({ message: "Invalid amount" });
  }

  const account = await BankAccount.findOne({ user: req.user.id });
  if (!account) {
    return res.status(404).json({ message: "Account not found" });
  }

  account.balance += amount;
  await account.save();

  await Transaction.create({
    user: req.user.id,
    account: account._id,
    type: "deposit",
    amount,
    balanceAfter: account.balance,
  });

  res.json({
    message: "Deposit successful",
    balance: account.balance,
  });
};


// 🔹 Withdraw Money
export const withdrawMoney = async (req, res) => {
  const { amount } = req.body;

  if (amount <= 0) {
    return res.status(400).json({ message: "Invalid amount" });
  }

  const account = await BankAccount.findOne({ user: req.user.id });
  if (!account) {
    return res.status(404).json({ message: "Account not found" });
  }

  if (account.balance < amount) {
    return res.status(400).json({ message: "Insufficient balance" });
  }
  
if (amount > account.dailyLimit) {
  return res.status(400).json({ message: `Amount exceeds daily limit of ${account.dailyLimit}` });
}




  account.balance -= amount;
  await account.save();

  await Transaction.create({
    user: req.user.id,
    account: account._id,
    type: "withdraw",
    amount,
    balanceAfter: account.balance,
  });

  res.json({
    message: "Withdrawal successful",
    balance: account.balance,
  });
};



// 🔹 Transfer Money
export const transferMoney = async (req, res) => {
  try {
    const { fromAccount, toAccount, amount } = req.body;

    if (amount <= 0) {
      return res.status(400).json({ message: "Amount must be greater than zero" });
    }

    if (fromAccount === toAccount) {
      return res.status(400).json({ message: "Cannot transfer to same account" });
    }

    const sender = await BankAccount.findOne({ accountNumber: fromAccount });
    const receiver = await BankAccount.findOne({ accountNumber: toAccount });

    if (!sender || !receiver) {
      return res.status(404).json({ message: "Account not found" });
    }

    if (sender.balance < amount) {
      return res.status(400).json({ message: "Insufficient balance" });
    }

    // Update balances
    sender.balance -= amount;
    receiver.balance += amount;

    // Log transactions
    sender.transactions.push({
      type: "transfer",
      amount,
      description: `Transfer to ${toAccount}`,
    });

    receiver.transactions.push({
      type: "transfer",
      amount,
      description: `Transfer from ${fromAccount}`,
    });

    await sender.save();
    await receiver.save();

    res.json({
      message: "Transfer successful",
      senderBalance: sender.balance,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Create new account
export const createBankAccount = async (req, res) => {
  try {
    const { accountType, initialBalance } = req.body;

    const accountNumber = Math.floor(1000000000 + Math.random() * 9000000000); // random 10-digit number

    const account = await BankAccount.create({
      user: req.user._id,
      accountNumber,
      accountType, // ✅ save account type
      balance: initialBalance || 0,
    });

    res.status(201).json({ message: "Account created successfully", account });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};