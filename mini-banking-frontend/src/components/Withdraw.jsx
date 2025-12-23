import { useState } from "react";
import api from "../api/axios";

function Withdraw({ onSuccess }) {
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleWithdraw = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const res = await api.post("/accounts/withdraw", {
        amount: Number(amount),
      });

      setMessage("Withdrawal successful");
      setAmount("");

      if (onSuccess) {
        onSuccess(res.data.balance);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Withdrawal failed");
    }
  };

  return (
    <div>
      <h3>Withdraw Money</h3>

      <form onSubmit={handleWithdraw}>
        <input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <button type="submit">Withdraw</button>
      </form>

      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default Withdraw;
