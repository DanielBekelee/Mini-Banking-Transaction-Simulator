import { useEffect, useState } from "react";
import api from "../api/axios";
import Layout from "./Layout";

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await api.get("/transactions/history");
        setTransactions(res.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load transactions");
      }
    };
    fetchTransactions();
  }, []);

  return (
    <Layout>
      <h2>Transaction History</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>Type</th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>Amount</th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>Date</th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>Description</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx, idx) => (
            <tr key={idx}>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>{tx.type}</td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>{tx.amount}</td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>{new Date(tx.date).toLocaleString()}</td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>{tx.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
}
