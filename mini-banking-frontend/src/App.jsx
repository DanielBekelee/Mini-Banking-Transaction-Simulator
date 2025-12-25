import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import Deposit from "./components/Deposit";
import Withdraw from "./components/Withdraw";
import Transfer from "./components/Transfer";
import Transactions from "./components/TransactionHistory";
import AdminDashboard from "./components/AdminDashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import { jwtDecode } from "jwt-decode";

function App() {
  const [user, setUser] = useState(null);

  // Load user from token
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser({
          token,
          role: decoded.role,
          id: decoded.id,
        });
      } catch (err) {
        localStorage.removeItem("token");
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <Router>
      {/* NAVBAR */}
      <nav className="bg-gray-900 text-white px-6 py-4 flex gap-6 items-center">
        <h1 className="font-bold text-lg">Mini Banking</h1>

        {user && (
          <>
            <Link to="/deposit" className="hover:text-blue-400">Deposit</Link>
            <Link to="/withdraw" className="hover:text-blue-400">Withdraw</Link>
            <Link to="/transfer" className="hover:text-blue-400">Transfer</Link>
            <Link to="/transactions" className="hover:text-blue-400">Transactions</Link>

            {user.role === "admin" && (
              <Link to="/admin" className="hover:text-yellow-400">Admin</Link>
            )}

            <button
              onClick={handleLogout}
              className="ml-auto bg-red-500 px-4 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        )}

        {!user && (
          <>
            <Link to="/login" className="ml-auto hover:text-blue-400">Login</Link>
            <Link to="/register" className="ml-4 hover:text-green-400">Register</Link>
          </>
        )}
      </nav>

      {/* ROUTES */}
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={user ? <Navigate to="/deposit" /> : <Login setUser={setUser} />} />
        <Route path="/register" element={user ? <Navigate to="/deposit" /> : <Register />} />

        <Route path="/deposit" element={user ? <Deposit /> : <Navigate to="/login" />} />
        <Route path="/withdraw" element={user ? <Withdraw /> : <Navigate to="/login" />} />
        <Route path="/transfer" element={user ? <Transfer /> : <Navigate to="/login" />} />
        <Route path="/transactions" element={user ? <Transactions /> : <Navigate to="/login" />} />

        <Route
          path="/admin"
          element={user?.role === "admin" ? <AdminDashboard /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
