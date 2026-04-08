import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import FullCertificate from "../components/FullCertificate";

function Administer() {
  const [form, setForm] = useState({
    citizen_id: "",
    vaccine_name: "",
    dose_number: ""
  });

  const [certId, setCertId] = useState("");
  const [name, setName] = useState("");
  const [showCert, setShowCert] = useState(false);

  // ✅ FIXED (inside component)
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const res = await axios.post(
        "https://fsad-hackathon-1.onrender.com/api/administer",
        form
      );

      setCertId(res.data.certId);
      setName(res.data.name);
      setShowCert(true);

    } catch (err) {
      console.error(err);
      alert("Error submitting");
    }

    setLoading(false);
  };

  if (showCert) {
    return (
      <div className="page-container text-center">
        <h2 className="text-2xl font-bold text-green-600 mb-4">
          ✅ Vaccination Successful
        </h2>

        <FullCertificate
          name={name}
          vaccine={form.vaccine_name}
          certId={certId}
        />

        <div className="flex justify-center gap-4 mt-4">
          <Link to={`/verify/${certId}`} className="btn-blue px-6">
            Verify Certificate
          </Link>

          <Link to="/" className="btn-purple px-6">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">

      <Link to="/" className="back-btn">← Back to Home</Link>

      <h2 className="text-xl font-semibold mb-4 text-gray-700">
        Administer Vaccine
      </h2>

      <input name="citizen_id" placeholder="Citizen ID" onChange={handleChange} className="input" />
      <input name="vaccine_name" placeholder="Vaccine Name" onChange={handleChange} className="input" />
      <input name="dose_number" placeholder="Dose Number" onChange={handleChange} className="input" />

      <button
        onClick={handleSubmit}
        disabled={loading}
        className={`btn-green ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        {loading ? "Processing..." : "Submit"}
      </button>

    </div>
  );
}

export default Administer;
