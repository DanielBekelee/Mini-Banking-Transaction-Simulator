import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const bgRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 30; // movement range
      const y = (e.clientY / innerHeight - 0.5) * 30;

      const circles = bgRef.current.querySelectorAll(".circle");
      circles.forEach((circle, i) => {
        circle.style.transform = `translate(${x * (i + 1) * 0.3}px, ${y * (i + 1) * 0.3}px)`;
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="relative min-h-screen bg-gray-50 flex flex-col overflow-hidden">
      {/* Animated & Interactive Background Circles */}
      <div ref={bgRef} className="absolute top-0 left-0 w-full h-full -z-10">
        <span className="circle absolute w-72 h-72 bg-blue-500 rounded-full opacity-30 animate-pulse-slow top-10 left-10"></span>
        <span className="circle absolute w-56 h-56 bg-yellow-400 rounded-full opacity-30 animate-pulse-slow top-40 right-20"></span>
        <span className="circle absolute w-80 h-80 bg-green-400 rounded-full opacity-20 animate-pulse-slow bottom-20 left-1/3"></span>
      </div>

      {/* Hero Section */}
      <header className="bg-blue-900 text-white w-full">
        <div className="container mx-auto px-6 py-20 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-bounce">
            Welcome to MiniBank
          </h1>
          <p className="text-lg md:text-xl mb-8 animate-fadeIn">
            Your trusted online banking solution. Manage deposits, withdrawals, transfers, and more.
          </p>
          <div className="flex justify-center gap-4 animate-fadeInDelay">
            <Link
              to="/login"
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-6 py-3 rounded shadow transform hover:scale-105 transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded shadow transform hover:scale-105 transition"
            >
              Register
            </Link>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="container mx-auto px-6 py-20 relative z-10">
        <h2 className="text-3xl font-bold text-center mb-12 animate-fadeIn">
          Our Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="bg-white p-6 rounded shadow hover:shadow-lg transition transform hover:scale-105 animate-fadeIn">
            <h3 className="text-xl font-semibold mb-2">Secure Transactions</h3>
            <p>Deposit, withdraw, and transfer money with top-notch security.</p>
          </div>
          <div className="bg-white p-6 rounded shadow hover:shadow-lg transition transform hover:scale-105 animate-fadeInDelay">
            <h3 className="text-xl font-semibold mb-2">Account Management</h3>
            <p>View your account details, transaction history, and balance anytime.</p>
          </div>
          <div className="bg-white p-6 rounded shadow hover:shadow-lg transition transform hover:scale-105 animate-fadeInDelay">
            <h3 className="text-xl font-semibold mb-2">Admin Dashboard</h3>
            <p>Admins can manage users, accounts, and monitor analytics efficiently.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-6 mt-auto relative z-10 animate-fadeIn">
        <div className="container mx-auto px-6 text-center">
          &copy; {new Date().getFullYear()} MiniBank. All rights reserved.
        </div>
      </footer>

      {/* Tailwind Animations */}
      <style>
        {`
          @keyframes fadeIn {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeIn { animation: fadeIn 1s ease forwards; }
          .animate-fadeInDelay { animation: fadeIn 1.5s ease forwards; }
          @keyframes pulse-slow {
            0%, 100% { transform: scale(1); opacity: 0.3; }
            50% { transform: scale(1.2); opacity: 0.5; }
          }
          .animate-pulse-slow { animation: pulse-slow 6s ease-in-out infinite; }
        `}
      </style>
    </div>
  );
}
