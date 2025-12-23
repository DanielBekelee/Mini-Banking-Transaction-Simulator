import { useEffect, useState } from "react";
import api from "../api/axios";
import Deposit from "../components/Deposit";
import Withdraw from "../components/Withdraw";
import Transfer from "../components/Transfer";
import TransactionHistory from "../components/TransactionHistory";


function Dashboard() {
  const [account, setAccount] = useState(null);
  const [error, setError] = useState("");

  const fetchAccount = async () => {
    try {
      const res = await api.get("/accounts/me");
      setAccount(res.data);
    } catch (err) {
      setError("Failed to load account");
    }
  };

  useEffect(() => {
    fetchAccount();
  }, []);

  if (error) return <p>{error}</p>;
  if (!account) return <p>Loading...</p>;

  return (
    <div>
      <h2>Dashboard</h2>

      <p><strong>Account Number:</strong> {account.accountNumber}</p>
      <p><strong>Balance:</strong> {account.balance}</p>

      <hr />

      <Deposit onSuccess={fetchAccount} />
      <hr />
<Withdraw onSuccess={fetchAccount} />
<hr />
<Transfer onSuccess={fetchAccount} />
<hr />
<TransactionHistory />


    </div>
  );
}

export default Dashboard;
