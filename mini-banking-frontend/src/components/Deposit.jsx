import { useState } from "react";
import api from "../api/axios";
import PageCard from "./PageCard";

export default function Deposit() {
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  const handleDeposit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/accounts/deposit", { amount });
      setMessage(res.data.message || "Deposit successful");
      setAmount("");
    } catch (err) {
      setMessage(err.response?.data?.message || "Deposit failed");
    }
  };

  return (
    <PageCard title="Deposit Money">
      <form onSubmit={handleDeposit} className="space-y-4">
        <input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        />

        <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition">
          Deposit
        </button>

        {message && (
          <p className="text-center text-sm text-gray-700 mt-3">{message}</p>
        )}
      </form>
    </PageCard>
  );
}
