// src/components/AdminDashboard.jsx
import DashboardLayout from "./DashboardLayout";
import { useEffect, useState } from "react";
import api from "../api/axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function AdminDashboard() {
  const [stats, setStats] = useState({});
  const [chartData, setChartData] = useState({});

  // Fetch stats from API
  const fetchStats = async () => {
    try {
      const res = await api.get("/admin/analytics");
      setStats(res.data);

      // Update chart data
      setChartData({
        labels: ["Users", "Accounts", "Deposits", "Withdrawals"],
        datasets: [
          {
            label: "Statistics",
            data: [
              res.data.totalUsers,
              res.data.totalAccounts,
              res.data.totalDeposits,
              res.data.totalWithdrawals,
            ],
            backgroundColor: ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"],
          },
        ],
      });
    } catch (error) {
      console.error("Failed to fetch analytics:", error);
    }
  };

  // Fetch initially and every 5 seconds
  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, 5000); // live update every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="Users" value={stats.totalUsers} color="bg-blue-500" />
        <StatCard title="Accounts" value={stats.totalAccounts} color="bg-green-500" />
        <StatCard title="Deposits" value={stats.totalDeposits} color="bg-yellow-500" />
        <StatCard title="Withdrawals" value={stats.totalWithdrawals} color="bg-red-500" />
      </div>

      <div className="mt-8 bg-white p-6 rounded shadow">
        <h3 className="text-xl font-semibold mb-2">Top Account</h3>
        <p>Account: {stats.highestAccount}</p>
        <p>Balance: {stats.highestBalance}</p>
      </div>

      <div className="mt-8 bg-white p-6 rounded shadow">
        <h3 className="text-xl font-semibold mb-4">Live Stats Chart</h3>
        {chartData.datasets ? <Bar data={chartData} /> : <p>Loading chart...</p>}
      </div>
    </DashboardLayout>
  );
}

function StatCard({ title, value, color }) {
  return (
    <div className={`rounded shadow p-6 text-white ${color}`}>
      <h4 className="text-gray-100">{title}</h4>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}
