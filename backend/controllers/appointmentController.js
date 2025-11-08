const { query } = require("../db.js");

// ✅ 1. Get all appointments (with search + filters)
const getAllAppointments = async (req, res) => {
  try {
    const { search, status, from, to } = req.query;

    let sql = `SELECT * FROM appointments WHERE 1=1`;
    const params = [];

    // Search (by name, email, phone)
    if (search) {
      sql += ` AND (name LIKE ? OR email LIKE ? OR phone LIKE ?)`;
      const like = `%${search}%`;
      params.push(like, like, like);
    }

    // Filter by status
    if (status) {
      sql += ` AND status = ?`;
      params.push(status);
    }

    // Filter by date range
    if (from && to) {
      sql += ` AND appointment_date BETWEEN ? AND ?`;
      params.push(from, to);
    } else if (from) {
      sql += ` AND appointment_date >= ?`;
      params.push(from);
    } else if (to) {
      sql += ` AND appointment_date <= ?`;
      params.push(to);
    }

    sql += ` ORDER BY appointment_date DESC`;

    const results = await query(sql, params);
    res.json({
      success: true,
      count: results.length,
      data: results,
    });
  } catch (err) {
    console.error("❌ Error fetching appointments:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ✅ 2. Update appointment status
const updateAppointmentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!id || !status) {
      return res
        .status(400)
        .json({ success: false, message: "Missing id or status" });
    }

    const validStatuses = ["pending", "confirmed", "cancelled", "completed"];
    if (!validStatuses.includes(status)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid status value" });
    }

    const sql = `UPDATE appointments 
                 SET status = ?, updated_at = CURRENT_TIMESTAMP 
                 WHERE id = ?`;
    const result = await query(sql, [status, id]);

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Appointment not found" });
    }

    res.json({
      success: true,
      message: "Status updated successfully",
    });
  } catch (err) {
    console.error("❌ Error updating status:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = {
  getAllAppointments,
  updateAppointmentStatus,
};
