// routes/adminRoutes.js
const express = require("express");
const router = express.Router();
// const { protect } = require("../middleware/adminAuth");
const { login, logout } = require("../controllers/adminController");

// Public route
router.post("/login", login);

// Protected route
router.post("/logout", logout);

module.exports = router;
