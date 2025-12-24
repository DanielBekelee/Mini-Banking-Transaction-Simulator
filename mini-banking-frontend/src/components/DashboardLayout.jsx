export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-900 text-white p-6">
        <h2 className="text-2xl font-bold mb-8">MiniBank</h2>
        <nav className="space-y-4">
          <a href="/deposit" className="block hover:text-blue-300">Deposit</a>
          <a href="/withdraw" className="block hover:text-blue-300">Withdraw</a>
          <a href="/transfer" className="block hover:text-blue-300">Transfer</a>
          <a href="/transactions" className="block hover:text-blue-300">Transactions</a>
          <a href="/admin" className="block hover:text-blue-300">Admin</a>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}
