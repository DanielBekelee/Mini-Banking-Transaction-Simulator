import { useState } from "react";
import api from "../api/axios";

function Transfer({ onSuccess }) {
  const [fromAccount, setFromAccount] = useState("");
  const [toAccount, setToAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleTransfer = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (fromAccount === toAccount) {
      setError("Cannot transfer to the same account");
      return;
    }

    try {
      const res = await api.post("/accounts/transfer", {
        fromAccount,
        toAccount,
        amount: Number(amount),
      });

      setMessage("Transfer successful");
      setFromAccount("");
      setToAccount("");
      setAmount("");

      if (onSuccess) {
        onSuccess(res.data.senderBalance);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Transfer failed");
    }
  };

  return (
    <div>
      <h3>Transfer Money</h3>

      <form onSubmit={handleTransfer}>
        <input
          type="text"
          placeholder="From Account Number"
          value={fromAccount}
          onChange={(e) => setFromAccount(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="To Account Number"
          value={toAccount}
          onChange={(e) => setToAccount(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />

        <button type="submit">Transfer</button>
      </form>

      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default Transfer;
