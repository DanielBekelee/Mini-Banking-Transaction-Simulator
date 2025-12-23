import { useEffect, useState } from "react";
import api from "../api/axios";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api.get("/admin/analytics").then(res => {
      setStats(res.data);
    });
  }, []);

  if (!stats) return <p>Loading dashboard...</p>;

  return (
    <div className="dashboard">
      <h1>Admin Dashboard</h1>

      <div className="grid">
        <Card title="Total Users" value={stats.totalUsers} />
        <Card title="Total Accounts" value={stats.totalAccounts} />
        <Card title="Total Deposits" value={stats.totalDeposits} />
        <Card title="Total Withdrawals" value={stats.totalWithdrawals} />
        <Card title="Highest Balance" value={stats.highestBalance} />
        <Card title="Top Account" value={stats.highestAccount} />
      </div>
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div className="card">
      <h3>{title}</h3>
      <p>{value}</p>
    </div>
  );
}
