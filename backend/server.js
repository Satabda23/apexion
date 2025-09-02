const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config(); // ← NEW: Load environment variables
require("./db"); // ← NEW: Ensure DB connection is established
const reviewRoutes = require("./routes/reviews");
const contactRoutes = require("./routes/contact");
const appointmentRoutes = require("./routes/appointments"); // ← NEW: Import appointments route

const app = express();
app.use(
  cors({
    origin: ["http://localhost:3000", process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  })
);
app.use(bodyParser.json());

// ← NEW: Middleware for client IP tracking (needed for security logging)
app.use((req, res, next) => {
  req.ip =
    req.headers["x-forwarded-for"] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    (req.connection.socket ? req.connection.socket.remoteAddress : null);
  next();
});

// routes
app.use("/api/reviews", reviewRoutes);
app.use("/api", contactRoutes);
app.use("/api/appointments", appointmentRoutes); // ← NEW: Use the new appointments route

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Server is running",
    timestamp: new Date().toISOString(),
  });
});

// ← NEW: 404 handler for unknown routes
// app.use("*", (req, res) => {
//   res.status(404).json({
//     success: false,
//     message: "Route not found",
//   });
// });

// ← NEW: Error handling middleware
// app.use((error, req, res, next) => {
//   console.error("❌ Unhandled error:", error);
//   res.status(500).json({
//     success: false,
//     message: "Internal server error",
//   });
// });

app.listen(5000, () => {
  console.log("🚀 Server running on port 5000");
  console.log("📊 Health check: http://localhost:5000/api/health");
});
