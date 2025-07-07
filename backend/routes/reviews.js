const express = require("express");
const router = express.Router();
const db = require("../db"); // adjust the path if your db.js is in a different folder

// POST /api/reviews/user
router.post("/user", async (req, res) => {
  const { name, text, rating } = req.body;

  if (!name || !text || !rating) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    await db.query(
      "INSERT INTO user_reviews (name, text, rating) VALUES (?, ?, ?)",
      [name, text, rating]
    );

    res.status(201).json({ message: "Review saved successfully" });
  } catch (error) {
    console.error("Error inserting review:", error);
    res.status(500).json({ error: "Database error" });
  }
});

module.exports = router;
