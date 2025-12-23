import { useState } from "react";
import api from "../api/axios";
import Layout from "./Layout";

export default function Deposit() {
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  const handleDeposit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/accounts/deposit", { amount: Number(amount) });
      setMessage(`Deposit successful! New Balance: ${res.data.balance}`);
      setAmount("");
    } catch (err) {
      setMessage(err.response?.data?.message || "Deposit failed");
    }
  };

  return (
    <Layout>
      <h2>Deposit Money</h2>
      <form onSubmit={handleDeposit} style={{ maxWidth: "400px", margin: "20px 0" }}>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
          required
          style={{ width: "100%", padding: "10px", marginBottom: "10px", borderRadius: "5px" }}
        />
        <button type="submit" style={{ padding: "10px 20px", background: "#4e73df", color: "white", border: "none", borderRadius: "5px" }}>
          Deposit
        </button>
      </form>
      {message && <p>{message}</p>}
    </Layout>
  );
}
