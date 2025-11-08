const morgan = require("morgan");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
require("./db");

const reviewRoutes = require("./routes/reviews");
const contactRoutes = require("./routes/contact");
const appointmentRoutes = require("./routes/appointments");
const adminRoutes = require("./routes/admin");
const adminappointmentRoutes = require("./routes/adminAppointments");
const adminEnquiryRoutes = require("./routes/adminEnquiry");
const adminReviewRoutes = require("./routes/adminReviews");
const app = express();

app.use(
  cors({
    // origin: "*",
    origin: ["http://localhost:3000", process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  })
);
app.use(bodyParser.json());

app.use((req, res, next) => {
  req.ip =
    req.headers["x-forwarded-for"] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    (req.connection.socket ? req.connection.socket.remoteAddress : null);
  next();
});
app.use(morgan("tiny"));
// routes
app.use("/api/reviews", reviewRoutes);
app.use("/api", contactRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/admin/appointments", adminappointmentRoutes);
app.use("/api/admin/enquiries", adminEnquiryRoutes);
app.use("/api/admin/reviews", adminReviewRoutes);

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
