import { useState } from "react";
import api from "../api/axios";
import PageCard from "./PageCard";

export default function Transfer() {
  const [fromAccount, setFromAccount] = useState("");
  const [toAccount, setToAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  const handleTransfer = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/accounts/transfer", {
        fromAccount,
        toAccount,
        amount,
      });
      setMessage(res.data.message || "Transfer successful");
      setAmount("");
      setFromAccount("");
      setToAccount("");
    } catch (err) {
      setMessage(err.response?.data?.message || "Transfer failed");
    }
  };

  return (
    <PageCard title="Transfer Money">
      <form onSubmit={handleTransfer} className="space-y-4">
        <input
          placeholder="From Account Number"
          value={fromAccount}
          onChange={(e) => setFromAccount(e.target.value)}
          className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          required
        />

        <input
          placeholder="To Account Number"
          value={toAccount}
          onChange={(e) => setToAccount(e.target.value)}
          className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          required
        />

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          required
        />

        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition">
          Transfer
        </button>

        {message && (
          <p className="text-center text-sm text-gray-700 mt-3">{message}</p>
        )}
      </form>
    </PageCard>
  );
}
