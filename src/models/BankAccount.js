import mongoose from "mongoose";

const bankAccountSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    accountNumber: { type: String, required: true, unique: true },
    accountType: { type: String, enum: ["savings", "checking"], default: "savings" }, // ✅ new field
    balance: { type: Number, default: 0 },
    dailyLimit: { type: Number, default: 5000 }, // optional daily deposit/withdraw limit
    transactions: [
      {
        type: { type: String, enum: ["deposit", "withdraw", "transfer"] },
        amount: Number,
        description: String,
        date: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

const BankAccount = mongoose.model("BankAccount", bankAccountSchema);
export default BankAccount;
