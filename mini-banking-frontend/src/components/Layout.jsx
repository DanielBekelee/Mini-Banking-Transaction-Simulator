import { Link } from "react-router-dom";

export default function Layout({ children }) {
  return (
    <div className="app-container">
      <aside className="sidebar">
        <h2>Mini Bank</h2>
        <Link to="/deposit">Deposit</Link>
        <Link to="/withdraw">Withdraw</Link>
        <Link to="/transfer">Transfer</Link>
        <Link to="/transactions">Transactions</Link>
        <Link to="/admin">Admin</Link>
      </aside>

      <main className="main-content">
        {children}
      </main>
    </div>
  );
}

