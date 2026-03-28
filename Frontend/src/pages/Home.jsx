import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gradient-bg text-white">

      {/* TITLE */}
      <h1 className="text-5xl font-bold mb-12 text-center">
        Vaccination Management System
      </h1>

      {/* CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        <Link to="/register" className="glass-card">
          <div className="text-4xl mb-2">🧑</div>
          Citizen Portal
        </Link>

        <Link to="/administer" className="glass-card">
          <div className="text-4xl mb-2">💉</div>
          Health Worker
        </Link>

        <Link to="/dashboard" className="glass-card">
          <div className="text-4xl mb-2">📊</div>
          Admin Panel
        </Link>

      </div>

    </div>
  );
}

export default Home;