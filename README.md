# 🕒 SlotSwapper

**SlotSwapper** is a full-stack peer-to-peer time-slot scheduling web application built using the **MERN Stack (MongoDB, Express, React, Node.js)**.
Users can create, view, and manage their calendar events, mark specific time slots as *swappable*, and exchange slots with other users via a simple swap request flow.

---

## 🚀 Live Demo

* **Frontend (React)** → [https://slot-swapper-aditya.vercel.app/](#)
* **Backend (Node + Express)** → [https://slotswapper-1-y3k3.onrender.com](https://slotswapper-1-y3k3.onrender.com)

---

## 📦 Tech Stack

| Layer              | Technology                                  |
| ------------------ | ------------------------------------------- |
| **Frontend**       | React.js, Tailwind CSS, Axios, React Router |
| **Backend**        | Node.js, Express.js, Mongoose               |
| **Database**       | MongoDB Atlas                               |
| **Authentication** | JWT (JSON Web Tokens)                       |
| **Deployment**     | Frontend → Vercel, Backend → Render         |

---

## 🧠 Core Features

### 🔐 Authentication

* User Sign Up / Login using email and password
* JWT-based authentication for secure API access

### 📅 Event Management

* Create, update, and delete personal calendar events
* Mark specific events as `SWAPPABLE`

### 🔄 Slot Swapping

* View all available *swappable* slots from other users
* Request to swap one of your slots for another user’s slot
* Accept or reject incoming swap requests
* Automatically update event owners after successful swap

### 💬 Dynamic State Management

* Real-time UI updates without refreshing
* Protected routes for authenticated users

---

## 📁 Folder Structure

```
SlotSwapper/
├── Backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── .env
└── Frontend/
    ├── src/
    │   ├── context/
    │   ├── layouts/
    │   ├── pages/
    │   ├── components/
    │   ├── App.jsx
    │   └── main.jsx
    ├── package.json
    └── vite.config.js or cra config
```

---

## ⚙️ Installation & Setup

### 🧩 1. Clone Repository

```bash
git clone https://github.com/your-username/SlotSwapper.git
cd SlotSwapper
```

---

### 🧠 2. Backend Setup

```bash
cd Backend
npm install
```

Create a `.env` file inside `/Backend`:

```
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret
```

Start backend server:

```bash
npm start
```

Your backend will run at
👉 [http://localhost:5000](http://localhost:5000)

---

### 💻 3. Frontend Setup

```bash
cd ../Frontend
npm install
```

Update API base URL in:

```
/src/context/AuthContext.jsx
```

```js
const api = axios.create({
  baseURL: "http://localhost:5000/api/v1",
});
```

Start frontend:

```bash
npm run dev
```

Frontend runs at
👉 [http://localhost:5173](http://localhost:5173) (Vite)
or
👉 [http://localhost:3000](http://localhost:3000) (CRA)

---

## 🔗 API Endpoints Overview

### **Auth Routes (`/api/v1/auth`)**

| Method | Endpoint    | Description              |
| ------ | ----------- | ------------------------ |
| POST   | `/register` | Register a new user      |
| POST   | `/login`    | Log in and get JWT token |
| GET    | `/getUser`  | Get logged-in user info  |

---

### **Event Routes (`/api/v1/events`)**

| Method | Endpoint | Description         |
| ------ | -------- | ------------------- |
| GET    | `/`      | Get all user events |
| POST   | `/`      | Create a new event  |
| PUT    | `/:id`   | Update an event     |
| DELETE | `/:id`   | Delete an event     |

---

### **Swap Routes (`/api/v1/swaps`)**

| Method | Endpoint                    | Description                             |
| ------ | --------------------------- | --------------------------------------- |
| GET    | `/swappable-slots`          | View other users’ swappable slots       |
| POST   | `/swap-request`             | Create a swap request                   |
| POST   | `/swap-response/:requestId` | Accept/Reject a swap                    |
| GET    | `/requests`                 | Get all incoming/outgoing swap requests |

---

## 💾 Sample .env File

```
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/slotswapper
JWT_SECRET=mysecretkey123
```

---

## 🚢 Deployment Guide

### 🧱 Backend (Render)

1. Push your code to GitHub
2. Go to [Render](https://render.com) → **New Web Service**
3. Set **Root Directory** = `Backend`
4. Build Command → `npm install`
5. Start Command → `npm start`
6. Add environment variables (`MONGO_URI`, `JWT_SECRET`, `PORT`)

---

### 🌐 Frontend (Vercel)

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com) → **New Project**
3. Set **Root Directory** = `Frontend`
4. Build Command → `npm run build`
5. Output Directory → `dist` (or `build`)
6. Update backend API URL to your Render link in `AuthContext.jsx`



