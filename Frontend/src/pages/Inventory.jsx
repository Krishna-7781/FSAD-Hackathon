import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Inventory() {
  const [form, setForm] = useState({
    center_id: "",
    vaccine_name: "",
    total_received: "",
    total_used: ""
  });

  const [centers, setCenters] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/centers")
      .then(res => setCenters(res.data));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:5000/inventory", form);
      alert("Inventory updated");
    } catch {
      alert("Error");
    }
  };

  return (
    <div className="page-container fade-in">

      <Link to="/" className="back-btn">← Back to Home</Link>

      <h2 className="text-xl font-semibold mb-4 text-gray-700">
        Vaccine Inventory Manager
      </h2>

      <div className="card space-y-3">

        <select name="center_id" onChange={handleChange} className="input">
          <option value="">Select Center</option>
          {centers.map(c => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>

        <input name="vaccine_name" placeholder="Vaccine Name" onChange={handleChange} className="input" />
        <input name="total_received" placeholder="Total Received" onChange={handleChange} className="input" />
        <input name="total_used" placeholder="Total Used" onChange={handleChange} className="input" />

        <button onClick={handleSubmit} className="btn-purple">
          Update Inventory
        </button>

      </div>

    </div>
  );
}

export default Inventory;