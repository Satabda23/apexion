const express = require("express");
const router = express.Router();
const db = require("../db"); // Your existing database connection
const { promisify } = require("util");
const {
  verifyRecaptcha,
  getRecaptchaErrorMessage,
} = require("../utils/recaptcha");

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

    // Get client IP and user agent for security logging
    const clientIP =
      req.ip || req.connection.remoteAddress || req.socket.remoteAddress;
    const userAgent = req.get("User-Agent") || "";

    // Validate required fields
    if (!name || !phone) {
      return res.status(400).json({
        success: false,
        message: "Name and phone number are required",
      });
    }

    // Validate phone number
    if (!isValidPhone(phone)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid 10-digit phone number",
      });
    }

    // Validate email if provided
    if (email && !isValidEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address",
      });
    }

    // 🔥 RECAPTCHA VERIFICATION
    if (!recaptchaToken) {
      return res.status(400).json({
        success: false,
        message: "reCAPTCHA verification is required",
      });
    }

    // Verify reCAPTCHA with Google
    const recaptchaResult = await verifyRecaptcha(recaptchaToken);

    if (!recaptchaResult.success) {
      const errorMessage = getRecaptchaErrorMessage(
        recaptchaResult["error-codes"]
      );
      return res.status(400).json({
        success: false,
        message: errorMessage,
      });
    }

    // 🔥 reCAPTCHA VERIFIED SUCCESSFULLY!
    console.log(`✅ reCAPTCHA verified for appointment: ${name}`);

    // Check for duplicate appointment (same phone in last 24 hours)
    const duplicateCheckQuery = `
            SELECT id FROM appointments 
            WHERE phone = ? AND created_at > DATE_SUB(NOW(), INTERVAL 24 HOUR)
            LIMIT 1
        `;

    // Fixed: No destructuring, use queryAsync instead of db.query
    const duplicateResults = await queryAsync(duplicateCheckQuery, [
      phone.trim(),
    ]);

    if (duplicateResults.length > 0) {
      return res.status(400).json({
        success: false,
        message:
          "You have already submitted an appointment request in the last 24 hours. Please wait or call us directly.",
      });
    }

    // 🔥 INSERT APPOINTMENT INTO DATABASE
    const insertQuery = `
            INSERT INTO appointments (
                name, phone, email, message, status, 
                recaptcha_verified, ip_address, user_agent, created_at
            ) VALUES (?, ?, ?, ?, 'pending', TRUE, ?, ?, NOW())
        `;

    const appointmentData = [
      name.trim(),
      phone.trim(),
      email ? email.trim() : null,
      message ? message.trim() : null,
      clientIP,
      userAgent,
    ];

    // Fixed: No destructuring, use queryAsync instead of db.execute
    const insertResult = await queryAsync(insertQuery, appointmentData);
    const appointmentId = insertResult.insertId;

    // Log successful appointment creation
    console.log("📅 New appointment created:", {
      id: appointmentId,
      name: name.trim(),
      phone: phone.trim(),
      email: email || "Not provided",
      ip: clientIP,
      timestamp: new Date().toISOString(),
    });

    // Send success response
    res.json({
      success: true,
      message:
        "Appointment request submitted successfully! We will contact you soon to confirm your appointment.",
      data: {
        appointmentId: appointmentId,
        name: name.trim(),
        phone: phone.trim(),
        status: "pending",
      },
    });
  } catch (error) {
    console.error("❌ Error processing appointment:", error);

    // Check if it's a database error
    if (error.code) {
      console.error("Database error code:", error.code);
      console.error("Database error message:", error.message);
    }

    res.status(500).json({
      success: false,
      message: "Server error. Please try again later or call us directly.",
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
