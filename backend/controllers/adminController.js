// controllers/adminAuthController.js
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { queryOne } = require("../db.js");

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

// @desc    Login admin
// @route   POST /api/admin/login
// @access  Public
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(req.body);

    // Validate input
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide username and password",
      });
    }

    // Find admin by username using direct SQL query
    const sql = "SELECT * FROM admins WHERE username = ?";
    const admin = await queryOne(sql, [username]);

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Generate token
    const token = generateToken(admin.id);
    console.log("✅ Login successful:", username);

    // Send response
    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: admin.id,
        username: admin.username,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during login",
    });
  }
};

// @desc    Logout admin
// @route   POST /api/admin/logout
// @access  Private
exports.logout = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during logout",
    });
  }
};
