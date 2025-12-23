import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("user", JSON.stringify({ ...res.data.user, token: res.data.token }));
      localStorage.setItem("token", res.data.token);

      setUser({ ...res.data.user, token: res.data.token });
      navigate("/deposit");
    } catch (err) {
      setMessage(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "20px auto" }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ width: "100%", padding: "10px", marginBottom: "10px", borderRadius: "5px" }} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ width: "100%", padding: "10px", marginBottom: "10px", borderRadius: "5px" }} />
        <button type="submit" style={{ width: "100%", padding: "10px", background: "#4e73df", color: "white", border: "none", borderRadius: "5px" }}>
          Login
        </button>
      </form>
      {message && <p style={{ color: "red" }}>{message}</p>}
    </div>
  );
}
//ITSSO-06