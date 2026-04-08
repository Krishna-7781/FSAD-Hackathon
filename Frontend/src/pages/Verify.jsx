import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Verify() {
  const [certId, setCertId] = useState("");
  const [result, setResult] = useState(null);

  const handleVerify = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/verify/${certId}`);
      setResult(res.data);
    } catch {
      alert("Error verifying");
    }
  };

  return (
    <div className="page-container">

      <Link to="/" className="back-btn">← Back to Home</Link>

      <h2 className="text-xl font-semibold mb-4 text-gray-700">
        Verify Certificate
      </h2>

      <input
        placeholder="Enter Certificate ID"
        onChange={(e) => setCertId(e.target.value)}
        className="input"
      />

      <button onClick={handleVerify} className="btn-blue">
        Verify
      </button>

      {result && (
        <div className="mt-3">
          {result.valid ? (
            <div className="text-green-600">
              <h3>Valid Certificate ✅</h3>
              <p>Name: {result.data[0].name}</p>
              <p>Vaccine: {result.data[0].vaccine_name}</p>
              <p>Dose: {result.data[0].dose_number}</p>
            </div>
          ) : (
            <div className="text-red-600">
              <h3>Invalid Certificate ❌</h3>
            </div>
          )}
        </div>
      )}

    </div>
  );
}

export default Verify;
