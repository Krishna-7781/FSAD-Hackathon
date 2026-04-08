import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Register() {

  const [loading, setLoading] = useState(false); // ✅ FIXED

  const [form, setForm] = useState({
    name: "",
    aadhaar: "",
    age: "",
    center_id: "",
    date: ""
  });

  const [centers, setCenters] = useState([]);
  const [success, setSuccess] = useState(false);
  const [citizenId, setCitizenId] = useState("");

  useEffect(() => {
    axios.get("https://fsad-hackathon-1.onrender.com/api/centers")
      .then(res => setCenters(res.data))
      .catch(() => alert("Error loading centers"));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const res = await axios.post("https://fsad-hackathon-1.onrender.com/api/register", form);
      setCitizenId(res.data.citizen_id);
      setSuccess(true);
    } catch {
      alert("Error registering");
    }

    setLoading(false);
  };

  if (success) {
    return (
      <div className="page-container text-center">
        <h2 className="text-2xl font-bold text-green-600 mb-4">
          ✅ Slot Booked Successfully!
        </h2>

        <p><b>Name:</b> {form.name}</p>
        <p><b>Citizen ID:</b> {citizenId}</p>
        <p><b>Date:</b> {form.date}</p>

        <Link to="/" className="btn-blue inline-block px-6">
          Go to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="page-container">

      <Link to="/" className="back-btn">← Back to Home</Link>

      <h2 className="text-xl font-semibold mb-4 text-gray-700">
        Vaccination Registration
      </h2>

      <input name="name" placeholder="Name" onChange={handleChange} className="input" />
      <input name="aadhaar" placeholder="Aadhaar" onChange={handleChange} className="input" />
      <input name="age" placeholder="Age" onChange={handleChange} className="input" />

      <select name="center_id" onChange={handleChange} className="input">
        <option value="">Select Center</option>
        {centers.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name} - {c.location} ({c.pincode})
          </option>
        ))}
      </select>

      <input type="date" name="date" onChange={handleChange} className="input" />

      <button
        onClick={handleSubmit}
        disabled={loading}
        className={`btn-blue ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        {loading ? "Processing..." : "Book Slot"}
      </button>

    </div>
  );
}

export default Register;
