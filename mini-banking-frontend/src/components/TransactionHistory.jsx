import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = JSON.parse(localStorage.getItem("user"))?.token;

        const res = await api.get("/transactionHistory", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setTransactions(res.data);
      } catch (err) {
        setError("Failed to load transactions");
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Transaction History
        </h2>

        {loading && (
          <p className="text-center text-gray-500">Loading transactions...</p>
        )}

        {error && (
          <p className="text-center text-red-500">{error}</p>
        )}

        {!loading && transactions.length === 0 && (
          <p className="text-center text-gray-500">
            No transactions found
          </p>
        )}

        {!loading && transactions.length > 0 && (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                    Type
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                    Amount
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                    Description
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                    Date
                  </th>
                </tr>
              </thead>

              <tbody>
                {transactions.map((tx, index) => (
                  <tr
                    key={index}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td
                      className={`px-4 py-3 font-medium ${
                        tx.type === "deposit"
                          ? "text-green-600"
                          : tx.type === "withdraw"
                          ? "text-red-600"
                          : "text-blue-600"
                      }`}
                    >
                      {tx.type.toUpperCase()}
                    </td>

                    <td className="px-4 py-3">
                      {tx.amount}
                    </td>

                    <td className="px-4 py-3">
                      {tx.description || "-"}
                    </td>

                    <td className="px-4 py-3 text-sm text-gray-600">
                      {new Date(tx.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
