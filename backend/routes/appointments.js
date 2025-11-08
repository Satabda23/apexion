const express = require("express");
const router = express.Router();
const db = require("../db"); // Your existing database connection
const { promisify } = require("util");
const {
  verifyRecaptcha,
  getRecaptchaErrorMessage,
} = require("../utils/recaptcha");
const { query } = require("../db");

// Convert db.query to promise-based
const queryAsync = promisify(db.query).bind(db);

// Validation helper functions
const isValidPhone = (phone) => /^[0-9]{10}$/.test(phone);
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

/**
 * POST /api/appointments
 * Book a new appointment with reCAPTCHA verification and SQL storage
 */
router.post("/", async (req, res) => {
  try {
    const { name, phone, email, message, recaptchaToken } = req.body;

    // Get client IP and user agent
    const clientIP =
      req.ip || req.connection.remoteAddress || req.socket.remoteAddress;
    const userAgent = req.get("User-Agent") || "";

    // Validation
    if (!name || !phone) {
      return res.status(400).json({
        success: false,
        message: "Name and phone number are required.",
      });
    }

    if (!isValidPhone(phone)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid 10-digit phone number.",
      });
    }

    if (email && !isValidEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address.",
      });
    }

    // reCAPTCHA validation
    if (!recaptchaToken) {
      return res.status(400).json({
        success: false,
        message: "reCAPTCHA verification is required.",
      });
    }

    const recaptchaResult = await verifyRecaptcha(recaptchaToken);
    if (!recaptchaResult.success) {
      const errorMessage = getRecaptchaErrorMessage(
        recaptchaResult["error-codes"]
      );
      return res.status(400).json({ success: false, message: errorMessage });
    }

    console.log(`✅ reCAPTCHA verified for appointment: ${name}`);

    // Duplicate check (24 hours)
    const duplicateQuery = `
      SELECT id FROM appointments 
      WHERE phone = ? AND created_at > DATE_SUB(NOW(), INTERVAL 24 HOUR)
      LIMIT 1
    `;

    const duplicateResults = await query(duplicateQuery, [phone.trim()]);
    if (duplicateResults.length > 0) {
      return res.status(400).json({
        success: false,
        message:
          "You have already submitted an appointment request in the last 24 hours. Please wait or call us directly.",
      });
    }

    // Insert appointment
    const insertQuery = `
      INSERT INTO appointments (
        name, phone, email, message, status, 
        recaptcha_verified, ip_address, user_agent, created_at
      ) VALUES (?, ?, ?, ?, 'pending', TRUE, ?, ?, NOW())
    `;

    const values = [
      name.trim(),
      phone.trim(),
      email ? email.trim() : null,
      message ? message.trim() : null,
      clientIP,
      userAgent,
    ];

    const result = await query(insertQuery, values);
    const appointmentId = result.insertId;

    console.log("📅 New appointment created:", {
      id: appointmentId,
      name: name.trim(),
      phone: phone.trim(),
      email: email || "Not provided",
      ip: clientIP,
      timestamp: new Date().toISOString(),
    });

    res.status(200).json({
      success: true,
      message:
        "Appointment request submitted successfully! We will contact you soon to confirm your appointment.",
      data: {
        appointmentId,
        name: name.trim(),
        phone: phone.trim(),
        status: "pending",
      },
    });
  } catch (error) {
    console.error("❌ Error processing appointment:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later or call us directly.",
      error: error.message,
    });
  }
});

/**
 * GET /api/appointments
 * Get all appointments (for admin panel)
 */
router.get("/", async (req, res) => {
  try {
    const { status, limit = 50, offset = 0 } = req.query;

    let query = `
            SELECT 
                id, name, phone, email, message, status, 
                appointment_date, created_at, updated_at
            FROM appointments
        `;

    const queryParams = [];

    // Filter by status if provided
    if (
      status &&
      ["pending", "confirmed", "cancelled", "completed"].includes(status)
    ) {
      query += " WHERE status = ?";
      queryParams.push(status);
    }

    // Add ordering and pagination
    query += " ORDER BY created_at DESC LIMIT ? OFFSET ?";
    queryParams.push(parseInt(limit), parseInt(offset));

    // Fixed: No destructuring, use queryAsync instead of db.execute
    const appointments = await queryAsync(query, queryParams);

    // Get total count for pagination
    let countQuery = "SELECT COUNT(*) as total FROM appointments";
    const countParams = [];

    if (
      status &&
      ["pending", "confirmed", "cancelled", "completed"].includes(status)
    ) {
      countQuery += " WHERE status = ?";
      countParams.push(status);
    }

    // Fixed: No destructuring, use queryAsync instead of db.execute
    const countResult = await queryAsync(countQuery, countParams);
    const total = countResult[0].total;

    res.json({
      success: true,
      message: "Appointments retrieved successfully",
      data: {
        appointments,
        pagination: {
          total,
          limit: parseInt(limit),
          offset: parseInt(offset),
          hasMore: parseInt(offset) + parseInt(limit) < total,
        },
      },
    });
  } catch (error) {
    console.error("❌ Error fetching appointments:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

module.exports = router;
