import { Link } from "react-router-dom";

function Navbar({ darkMode, setDarkMode }) {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-md px-6 py-3 flex justify-between items-center">

      <Link to="/" className="text-xl font-bold text-blue-600 dark:text-blue-400">
        Vaccine System
      </Link>

      <div className="flex gap-4 items-center">

        <Link to="/register" className="nav-link dark:text-gray-300">Citizen</Link>
        <Link to="/administer" className="nav-link dark:text-gray-300">Worker</Link>
        <Link to="/dashboard" className="nav-link dark:text-gray-300">Admin</Link>

        {/* 🌙 Toggle Button */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="ml-4 px-3 py-1 rounded bg-gray-200 dark:bg-gray-700"
        >
          {darkMode ? "☀️" : "🌙"}
        </button>

      </div>

    </div>
  );
}

export default Navbar;