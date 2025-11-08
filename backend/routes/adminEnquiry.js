const express = require("express");
const router = express.Router();
const {
  getAllEnquiries,
  updateStatus,
} = require("../controllers/adminEnquiry");

// Routes
router.get("/", getAllEnquiries); // GET all enquiries
router.post("/update-status", updateStatus);
module.exports = router;
