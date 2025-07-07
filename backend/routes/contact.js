const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/submit-contact", (req, res) => {
  const { name, email, service, otherService, message } = req.body;
  if (!name || !email || !service) {
    return res
      .status(400)
      .json({ success: false, message: "Required fields missing" });
  }
  const query = `
    INSERT INTO contact_requests (name, email, service, other_service, message)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(
    query,
    [name, email, service, otherService, message],
    (err, result) => {
      if (err) {
        console.error(err);
        return res
          .status(500)
          .json({ success: false, message: "Database error" });
      }

      return res.json({ success: true, message: "Contact request saved" });
    }
  );
});

module.exports = router;
