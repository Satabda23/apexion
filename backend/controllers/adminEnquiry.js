// controllers/enquiryController.js
const { query } = require("../db");

const getAllEnquiries = async (req, res) => {
  try {
    const enquiries = await query(
      `SELECT 
         id, name, email, service, other_service, message, status,
         DATE_FORMAT(created_at, '%d %M %Y') AS formatted_date,
         created_at
       FROM contact_requests
       ORDER BY created_at DESC`
    );

    const totalResult = await query(
      "SELECT COUNT(*) AS total FROM contact_requests"
    );
    const total = totalResult[0]?.total || 0;
    const latest = enquiries.length > 0 ? enquiries[0] : null;

    res.status(200).json({ success: true, total, latest, enquiries });
  } catch (err) {
    console.error("getAllEnquiries error:", err);
    res
      .status(500)
      .json({
        success: false,
        message: "Error fetching enquiries",
        error: err.message,
      });
  }
};

const updateStatus = async (req, res) => {
  try {
    const { id, status } = req.body || {};
    if (!id || !status) {
      return res
        .status(400)
        .json({ success: false, message: "id and status are required" });
    }
    if (!["new", "replied", "closed"].includes(status)) {
      return res
        .status(400)
        .json({ success: false, message: "invalid status value" });
    }

    // Update
    const result = await query(
      "UPDATE contact_requests SET status = ? WHERE id = ?",
      [status, id]
    );

    // Optionally return updated row
    const updatedRows = await query(
      `SELECT id, name, email, service, other_service, message, status, DATE_FORMAT(created_at, '%d %M %Y') AS formatted_date 
       FROM contact_requests WHERE id = ?`,
      [id]
    );
    const updated = updatedRows[0] || null;

    res.status(200).json({ success: true, message: "Status updated", updated });
  } catch (err) {
    console.error("updateStatus error:", err);
    res
      .status(500)
      .json({
        success: false,
        message: "Error updating status",
        error: err.message,
      });
  }
};

module.exports = { getAllEnquiries, updateStatus };
