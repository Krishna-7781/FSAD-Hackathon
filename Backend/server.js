const express = require("express");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
const QRCode = require("qrcode");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ QR Folder
const qrFolder = path.join(__dirname, "qr");
if (!fs.existsSync(qrFolder)) {
  fs.mkdirSync(qrFolder);
}
app.use("/qr", express.static(qrFolder));

// ✅ Dummy Data Storage
let citizens = [];
let appointments = [];
let certificates = [];
let doseRecords = [];

// ✅ Dummy Centers
const centers = [
  { id: 1, name: "Center 1", location: "Hyderabad", pincode: "500001" },
  { id: 2, name: "Center 2", location: "Delhi", pincode: "110001" },
  { id: 3, name: "Center 3", location: "Mumbai", pincode: "400001" }
];

// ✅ Root test
app.get("/", (req, res) => {
  res.send("Server running");
});

// ✅ IMPORTANT TEST ROUTE (for debugging)
app.get("/api/test", (req, res) => {
  res.send("API working");
});

// ✅ Get Centers (MAIN FIX)
app.get("/api/centers", (req, res) => {
  console.log("✅ /api/centers hit");
  res.json(centers);
});

// ✅ Register
app.post("/api/register", (req, res) => {
  const { name, aadhaar, age, center_id, date } = req.body;

  if (!name || !aadhaar || !age || !center_id || !date) {
    return res.status(400).send("All fields required");
  }

  if (age < 18) {
    return res.status(400).send("Not eligible");
  }

  const citizen_id = citizens.length + 1;

  citizens.push({ id: citizen_id, name, aadhaar, age });
  appointments.push({ citizen_id, center_id, date });

  res.send({
    message: "Registration successful & slot booked",
    citizen_id
  });
});

// ✅ Administer
app.post("/api/administer", async (req, res) => {
  const { citizen_id, vaccine_name, dose_number } = req.body;

  if (!citizen_id || !vaccine_name || !dose_number) {
    return res.status(400).send("All fields required");
  }

  const citizen = citizens.find(c => c.id == citizen_id);

  if (!citizen) {
    return res.status(404).send("Invalid Citizen ID");
  }

  const certId = uuidv4();

  try {
    const qrPath = path.join(qrFolder, `qr_${certId}.png`);

    await QRCode.toFile(
      qrPath,
      `https://fsad-hackathon-1.onrender.com/api/verify/${certId}`
    );

    doseRecords.push({
      citizen_id,
      vaccine_name,
      dose_number
    });

    certificates.push({
      cert_id: certId,
      citizen_id
    });

    res.send({
      message: "Dose recorded & certificate generated",
      certId,
      name: citizen.name
    });

  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// ✅ Verify
app.get("/api/verify/:certId", (req, res) => {
  const certId = req.params.certId;

  const cert = certificates.find(c => c.cert_id === certId);

  if (!cert) {
    return res.send({ valid: false });
  }

  const citizen = citizens.find(c => c.id === cert.citizen_id);
  const doses = doseRecords.filter(d => d.citizen_id === cert.citizen_id);

  res.send({
    valid: true,
    data: {
      name: citizen.name,
      doses
    }
  });
});

// ✅ Dashboard
app.get("/api/dashboard", (req, res) => {
  const result = appointments.map(a => {
    const center = centers.find(c => c.id == a.center_id);
    const doseCount = doseRecords.filter(d => d.citizen_id === a.citizen_id).length;

    return {
      center_name: center?.name,
      date: a.date,
      total_doses: doseCount
    };
  });

  res.send(result);
});

// ✅ Inventory
app.post("/api/inventory", (req, res) => {
  res.send({ message: "Inventory updated (dummy)" });
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
