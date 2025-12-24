import DashboardLayout from "./DashboardLayout";
import { useEffect, useState } from "react";
import api from "../api/axios";

export default function AdminDashboard() {
  const [stats, setStats] = useState({});

  useEffect(() => {
    api.get("/admin/analytics").then(res => setStats(res.data));
  }, []);

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="Users" value={stats.totalUsers} />
        <StatCard title="Accounts" value={stats.totalAccounts} />
        <StatCard title="Deposits" value={stats.totalDeposits} />
        <StatCard title="Withdrawals" value={stats.totalWithdrawals} />
      </div>

      <div className="mt-8 bg-white p-6 rounded shadow">
        <h3 className="text-xl font-semibold mb-2">Top Account</h3>
        <p>Account: {stats.highestAccount}</p>
        <p>Balance: {stats.highestBalance}</p>
      </div>
    </DashboardLayout>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="bg-white rounded shadow p-6">
      <h4 className="text-gray-500">{title}</h4>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}
