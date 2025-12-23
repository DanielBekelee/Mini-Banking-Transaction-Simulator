import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import Deposit from "./components/Deposit";
import Withdraw from "./components/Withdraw";
import Transfer from "./components/Transfer";
import Transactions from "./components/TransactionHistory";
import AdminDashboard from "./components/AdminDashboard";
import Layout from "./components/Layout";
import Login from "./pages/Login"; // you can create simple login page
import api from "./api/axios";
import { jwtDecode } from "jwt-decode";


function App() {
  const [user, setUser] = useState(null);

useEffect(() => {
  const token = localStorage.getItem("token");
  if (token) {
    const decoded = jwtDecode(token);
    setUser({
      token,
      role: decoded.role,
      id: decoded.id,
    });
  }
}, []);


  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <Router>
      <Layout>
        <nav style={{ display: "flex", gap: "15px", marginBottom: "20px" }}>
          {user ? (
            <>
              <Link to="/deposit">Deposit</Link>
              <Link to="/withdraw">Withdraw</Link>
              <Link to="/transfer">Transfer</Link>
              <Link to="/transactions">Transactions</Link>
              {user.role === "admin" && <Link to="/admin">Admin</Link>}
              <button onClick={handleLogout} style={{ marginLeft: "auto" }}>Logout</button>
            </>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </nav>

        <Routes>
          <Route path="/" element={<Navigate to={user ? "/deposit" : "/login"} />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/deposit" element={user ? <Deposit /> : <Navigate to="/login" />} />
          <Route path="/withdraw" element={user ? <Withdraw /> : <Navigate to="/login" />} />
          <Route path="/transfer" element={user ? <Transfer /> : <Navigate to="/login" />} />
          <Route path="/transactions" element={user ? <Transactions /> : <Navigate to="/login" />} />
          <Route path="/admin" element={user?.role === "admin" ? <AdminDashboard /> : <Navigate to="/" />} />
       

        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
