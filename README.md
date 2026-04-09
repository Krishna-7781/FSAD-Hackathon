# 💉 Vaccination Management System

A full-stack web application to manage vaccination registration, dose administration, certificate generation, and verification.

---

## 🚀 Live Demo

* 🌐 Frontend (Vercel):
  https://fsad-hackathon-euqb.vercel.app/

* ⚙️ Backend (Render):
  https://fsad-hackathon-1.onrender.com/

---

## 📌 Features

### 👤 Citizen

* Register for vaccination
* Select vaccination center and date
* Book slots easily

### 🧑‍⚕️ Worker (Administer)

* Record vaccine doses
* Generate vaccination certificate
* QR code generation for verification

### 🔍 Verification

* Verify certificates using QR code / ID
* Display vaccination details

### 📊 Dashboard

* View vaccination statistics
* Center-wise and date-wise dose tracking

### 📦 Inventory

* Manage vaccine inventory (basic functionality)

---

## 🛠️ Tech Stack

### Frontend

* React.js (Vite)
* Axios
* Tailwind CSS

### Backend

* Node.js
* Express.js

### Deployment

* Frontend: Vercel
* Backend: Render

---

## 📁 Project Structure

```
FSAD-Hackathon/
│
├── Frontend/ # React App
│ └── src/
│ ├── pages/
│ ├── components/
│
├── Backend/ # Express Server
│ ├── server.js
│
└── Database/ # (Optional/Schema)
```

---

## 🔗 API Endpoints

| Method | Endpoint            | Description                        |
| ------ | ------------------- | ---------------------------------- |
| GET    | /api/centers        | Get vaccination centers            |
| POST   | /api/register       | Register citizen                   |
| POST   | /api/administer     | Record dose & generate certificate |
| GET    | /api/verify/:certId | Verify certificate                 |
| GET    | /api/dashboard      | Get dashboard data                 |
| POST   | /api/inventory      | Update inventory                   |

---

## ⚙️ Setup Instructions (Local)

### 1️⃣ Clone the repository

```bash
git clone https://github.com/Krishna-7781/FSAD-Hackathon.git
cd FSAD-Hackathon
```

### 2️⃣ Run Backend

```bash
cd Backend
npm install
node server.js
```

### 3️⃣ Run Frontend

```bash
cd Frontend
npm install
npm run dev
```

---

## 🌍 Environment Notes

* Backend runs on Render cloud
* Frontend connects via API URLs
* All API routes are prefixed with `/api`

---

## 🎯 Future Improvements

* Database integration (MySQL / MongoDB)
* Authentication system (Admin login)
* Real-time slot availability
* Improved UI/UX
* Email/SMS notifications

---

## 👨‍💻 Author

A Sudarsan Krishna,
N Sai Suhaas,
P Rakesh,
Y Karthikeya

---

## 📄 License

This project is developed for academic and learning purposes.

---
