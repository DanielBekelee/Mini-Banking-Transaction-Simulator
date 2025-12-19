import BankAccount from "../models/BankAccount.js";

// 🔹 Deposit Money
export const depositMoney = async (req, res) => {
  try {
    const { accountNumber, amount } = req.body;

    if (amount <= 0) {
      return res.status(400).json({ message: "Amount must be greater than zero" });
    }

    const account = await BankAccount.findOne({ accountNumber });

    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    account.balance += amount;

    account.transactions.push({
      type: "deposit",
      amount,
      description: "Cash deposit",
    });

    await account.save();

    res.json({
      message: "Deposit successful",
      balance: account.balance,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// 🔹 Withdraw Money
export const withdrawMoney = async (req, res) => {
  try {
    const { accountNumber, amount } = req.body;

    if (amount <= 0) {
      return res.status(400).json({ message: "Amount must be greater than zero" });
    }

    const account = await BankAccount.findOne({ accountNumber });

    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    if (account.balance < amount) {
      return res.status(400).json({ message: "Insufficient balance" });
    }

    account.balance -= amount;

    account.transactions.push({
      type: "withdraw",
      amount,
      description: "Cash withdrawal",
    });

    await account.save();

    res.json({
      message: "Withdrawal successful",
      balance: account.balance,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
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

