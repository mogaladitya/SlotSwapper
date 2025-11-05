require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const authRoutes = require("./routes/auth")
const eventRoutes = require('./routes/events')
const swapRoutes = require('./routes/swaps')

// Connect Database
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/events", eventRoutes)
app.use("/api/v1/swaps", swapRoutes)

// Root route
app.get("/", (req, res) => res.send("API is running..."));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
