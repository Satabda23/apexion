const express = require("express");
const router = express.Router();
const { query } = require("../db");

router.post("/submit-contact", async (req, res) => {
  try {
    const { name, email, service, otherService, message } = req.body;

    // Validate required fields
    if (!name || !email || !service) {
      return res
        .status(400)
        .json({ success: false, message: "Required fields missing" });
    }

    // Insert into DB
    const sql = `
      INSERT INTO contact_requests (name, email, service, other_service, message)
      VALUES (?, ?, ?, ?, ?)
    `;

    await query(sql, [name, email, service, otherService || null, message || null]);

    res
      .status(200)
      .json({ success: true, message: "Contact request saved successfully" });
  } catch (err) {
    console.error("submitContact error:", err);
    res
      .status(500)
      .json({ success: false, message: "Database error", error: err.message });
  }
}

);

module.exports = router;
