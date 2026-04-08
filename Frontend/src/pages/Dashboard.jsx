import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

// ✅ Chart imports
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

function Dashboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("https://fsad-hackathon-1.onrender.com/api/dashboard")
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="page-container fade-in">

      <Link to="/" className="back-btn">← Back to Home</Link>

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-700">
          Daily Dose Reports
        </h2>

        <Link to="/inventory" className="btn-purple px-4">
          Inventory
        </Link>
      </div>

      {/* ✅ STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">

        <div className="card text-center">
          <p className="text-gray-500">Total Records</p>
          <h2 className="text-2xl font-bold text-blue-600">
            {data.length}
          </h2>
        </div>

        <div className="card text-center">
          <p className="text-gray-500">Total Doses</p>
          <h2 className="text-2xl font-bold text-green-600">
            {data.reduce((sum, item) => sum + item.total_doses, 0)}
          </h2>
        </div>

        <div className="card text-center">
          <p className="text-gray-500">Centers</p>
          <h2 className="text-2xl font-bold text-purple-600">
            {[...new Set(data.map(d => d.center_name))].length}
          </h2>
        </div>

      </div>

      {/* ✅ CHART */}
      <div className="bg-white rounded-xl shadow p-4 mb-6">

        <h3 className="text-lg font-semibold mb-3 text-gray-700">
          Vaccination Overview
        </h3>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="center_name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="total_doses" />
          </BarChart>
        </ResponsiveContainer>

      </div>

      {/* ✅ TABLE */}
      <table className="table">

        <thead>
          <tr>
            <th>Center</th>
            <th>Date</th>
            <th>Total Doses</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item, i) => (
            <tr key={i}>
              <td>{item.center_name}</td>
              <td>{new Date(item.date).toLocaleDateString()}</td>
              <td className="font-semibold text-blue-600">
                {item.total_doses}
              </td>
            </tr>
          ))}
        </tbody>

      </table>

    </div>
  );
}

export default Dashboard;
