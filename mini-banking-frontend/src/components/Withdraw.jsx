import { useState } from "react";
import api from "../api/axios";
import Layout from "./Layout";

export default function Withdraw() {
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  const handleWithdraw = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/accounts/withdraw", { amount: Number(amount) });
      setMessage(`Withdraw successful! New Balance: ${res.data.balance}`);
      setAmount("");
    } catch (err) {
      setMessage(err.response?.data?.message || "Withdraw failed");
    }
  };

  return (
    <Layout>
      <h2>Withdraw Money</h2>
      <form onSubmit={handleWithdraw} style={{ maxWidth: "400px", margin: "20px 0" }}>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
          required
          style={{ width: "100%", padding: "10px", marginBottom: "10px", borderRadius: "5px" }}
        />
        <button type="submit" style={{ padding: "10px 20px", background: "#e74a3b", color: "white", border: "none", borderRadius: "5px" }}>
          Withdraw
        </button>
      </form>
      {message && <p>{message}</p>}
    </Layout>
  );
}
