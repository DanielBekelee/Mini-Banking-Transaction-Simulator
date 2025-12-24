import { useState } from "react";
import api from "../api/axios";
import PageCard from "./PageCard";

export default function Withdraw() {
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  const handleWithdraw = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/accounts/withdraw", { amount });
      setMessage(res.data.message || "Withdrawal successful");
      setAmount("");
    } catch (err) {
      setMessage(err.response?.data?.message || "Withdrawal failed");
    }
  };

  return (
    <PageCard title="Withdraw Money">
      <form onSubmit={handleWithdraw} className="space-y-4">
        <input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          required
        />

        <button className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold transition">
          Withdraw
        </button>

        {message && (
          <p className="text-center text-sm text-gray-700 mt-3">{message}</p>
        )}
      </form>
    </PageCard>
  );
}
