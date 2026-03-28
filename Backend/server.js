const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const { v4: uuidv4 } = require("uuid");
const QRCode = require("qrcode");
const fs = require("fs");
const path = require("path");

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ QR Folder
const qrFolder = path.join(__dirname, "qr");
if (!fs.existsSync(qrFolder)) {
  fs.mkdirSync(qrFolder);
}
app.use("/qr", express.static(qrFolder));

// ✅ DB Connection (IMPORTANT: use promise wrapper)
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "msd@7781",
  database: "vaccination_db"
});

const dbPromise = db.promise();

db.connect((err) => {
  if (err) console.log("DB connection failed", err);
  else console.log("MySQL Connected");
});

// ✅ Test
app.get("/", (req, res) => {
  res.send("Server running");
});

app.get("/test-db", async (req, res) => {
  try {
    await dbPromise.query("SELECT 1");
    res.send("Database working");
  } catch (err) {
    res.send(err);
  }
});

// ✅ Get Centers
app.get("/centers", async (req, res) => {
  try {
    const [rows] = await dbPromise.query(`
      SELECT id, name, location, pincode 
      FROM vaccination_centers
    `);

    res.send(rows);

  } catch (err) {
    res.status(500).send("Error fetching centers");
  }
});

// ✅ Register
app.post("/register", async (req, res) => {
  const { name, aadhaar, age, center_id, date } = req.body;

  if (!name || !aadhaar || !age || !center_id || !date) {
    return res.status(400).send("All fields required");
  }

  if (age < 18) {
    return res.status(400).send("Not eligible");
  }

  try {
    const [citizenResult] = await dbPromise.query(
      "INSERT INTO citizens (name, aadhaar, age) VALUES (?, ?, ?)",
      [name, aadhaar, age]
    );

    const citizen_id = citizenResult.insertId;

    await dbPromise.query(
      "INSERT INTO appointments (citizen_id, center_id, date) VALUES (?, ?, ?)",
      [citizen_id, center_id, date]
    );

    res.send({
      message: "Registration successful & slot booked",
      citizen_id
    });

  } catch (err) {
    console.error(err);
    res.status(500).send("Registration failed");
  }
});

// ✅ ADMINISTER (🔥 FIXED MAIN ISSUE)
app.post("/administer", async (req, res) => {
  const { citizen_id, vaccine_name, dose_number } = req.body;

  if (!citizen_id || !vaccine_name || !dose_number) {
    return res.status(400).send("All fields required");
  }

  const certId = uuidv4();

  try {
    // 🔥 1. Get correct citizen
    const [rows] = await dbPromise.query(
      "SELECT name FROM citizens WHERE id = ?",
      [citizen_id]
    );

    if (rows.length === 0) {
      return res.status(404).send("Invalid Citizen ID");
    }

    const citizenName = rows[0].name;

    // 🔥 2. Generate QR
    const qrPath = path.join(qrFolder, `qr_${certId}.png`);
    await QRCode.toFile(
      qrPath,
      `http://localhost:5173/verify/${certId}`
    );

    // 🔥 3. Insert dose
    await dbPromise.query(
      "INSERT INTO dose_records (citizen_id, vaccine_name, dose_number) VALUES (?, ?, ?)",
      [citizen_id, vaccine_name, dose_number]
    );

    // 🔥 4. Insert certificate
    await dbPromise.query(
      "INSERT INTO certificates (cert_id, citizen_id) VALUES (?, ?)",
      [certId, citizen_id]
    );

    // 🔥 5. SEND NAME (THIS FIXES YOUR BUG)
    res.send({
      message: "Dose recorded & certificate generated",
      certId,
      name: citizenName
    });

  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// ✅ Verify
app.get("/verify/:certId", async (req, res) => {
  const certId = req.params.certId;

  try {
    const [rows] = await dbPromise.query(`
      SELECT c.cert_id, ct.name, d.vaccine_name, d.dose_number
      FROM certificates c
      JOIN citizens ct ON c.citizen_id = ct.id
      JOIN dose_records d ON ct.id = d.citizen_id
      WHERE c.cert_id = ?
    `, [certId]);

    if (rows.length > 0) {
      res.send({ valid: true, data: rows });
    } else {
      res.send({ valid: false });
    }

  } catch (err) {
    res.status(500).send("Verification error");
  }
});

// ✅ Dashboard
app.get("/dashboard", async (req, res) => {
  try {
    const [rows] = await dbPromise.query(`
      SELECT 
        vc.name AS center_name,
        a.date,
        COUNT(d.id) AS total_doses
      FROM dose_records d
      JOIN citizens c ON d.citizen_id = c.id
      JOIN appointments a ON c.id = a.citizen_id
      JOIN vaccination_centers vc ON a.center_id = vc.id
      GROUP BY vc.name, a.date
      ORDER BY a.date DESC
    `);

    res.send(rows);

  } catch (err) {
    res.status(500).send("Dashboard error");
  }
});

// ✅ Inventory
app.post("/inventory", async (req, res) => {
  const { center_id, vaccine_name, total_received, total_used } = req.body;

  try {
    await dbPromise.query(`
      INSERT INTO vaccine_inventory (center_id, vaccine_name, total_received, total_used)
      VALUES (?, ?, ?, ?)
    `, [center_id, vaccine_name, total_received, total_used]);

    res.send({ message: "Inventory updated" });

  } catch (err) {
    res.status(500).send("Inventory error");
  }
});

// ✅ Start
app.listen(5000, () => {
  console.log("Server started on port 5000");
});
