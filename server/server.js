const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const path = require("path");

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Test Route
app.get("/", (req, res) => {
    res.send("API is running...");
});

// Routes
app.use("/api/auth", require("./routes/authRoutes"));

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/projects", require("./routes/projectRoutes"));
app.use("/api/tickets", require("./routes/ticketRoutes"));
app.use("/api/comments", require("./routes/commentRoutes"));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

