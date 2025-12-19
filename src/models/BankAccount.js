import mongoose from "mongoose";

const bankAccountSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    accountNumber: { type: String, required: true, unique: true },
    balance: { type: Number, default: 0 },
    transactions: [
      {
        type: { type: String, enum: ["deposit", "withdraw", "transfer"] },
        amount: Number,
        date: { type: Date, default: Date.now },
        description: String,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("BankAccount", bankAccountSchema);
