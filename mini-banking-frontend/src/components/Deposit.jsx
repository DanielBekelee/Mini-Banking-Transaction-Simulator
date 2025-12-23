import { useState } from "react";
import api from "../api/axios";

function Deposit({ onSuccess }) {
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleDeposit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const res = await api.post("/accounts/deposit", {
        amount: Number(amount),
      });

      setMessage("Deposit successful");
      setAmount("");

      if (onSuccess) {
        onSuccess(res.data.balance);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Deposit failed");
    }
  };

  return (
    <div>
      <h3>Deposit Money</h3>

      <form onSubmit={handleDeposit}>
        <input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <button type="submit">Deposit</button>
      </form>

      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default Deposit;
