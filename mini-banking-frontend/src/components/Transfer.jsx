import { useState } from "react";
import api from "../api/axios";
import Layout from "./Layout";

export default function Transfer() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  const handleTransfer = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/transfer", { fromAccount: from, toAccount: to, amount: Number(amount) });
      setMessage(`Transfer successful! Sender Balance: ${res.data.senderBalance}`);
      setFrom(""); setTo(""); setAmount("");
    } catch (err) {
      setMessage(err.response?.data?.message || "Transfer failed");
    }
  };

  return (
    <Layout>
      <h2>Transfer Money</h2>
      <form onSubmit={handleTransfer} style={{ maxWidth: "400px", margin: "20px 0" }}>
        <input type="text" value={from} onChange={(e) => setFrom(e.target.value)} placeholder="From Account" required style={{ width: "100%", padding: "10px", marginBottom: "10px", borderRadius: "5px" }} />
        <input type="text" value={to} onChange={(e) => setTo(e.target.value)} placeholder="To Account" required style={{ width: "100%", padding: "10px", marginBottom: "10px", borderRadius: "5px" }} />
        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount" required style={{ width: "100%", padding: "10px", marginBottom: "10px", borderRadius: "5px" }} />
        <button type="submit" style={{ padding: "10px 20px", background: "#f6c23e", color: "white", border: "none", borderRadius: "5px" }}>
          Transfer
        </button>
      </form>
      {message && <p>{message}</p>}
    </Layout>
  );
}
