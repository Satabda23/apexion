const express = require("express");
const {
  getAllAppointments,
  updateAppointmentStatus,
} = require("../controllers/appointmentController");

const router = express.Router();

// ✅ GET all appointments (with search and filters)
router.get("/", getAllAppointments);

// ✅ PUT update appointment status
router.put("/:id/status", updateAppointmentStatus);

module.exports = router;
