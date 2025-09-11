const mysql = require("mysql2");

// Railway MySQL configuration
const db = mysql.createConnection({
  host: process.env.MYSQL_HOST || "localhost",
  user: process.env.MYSQL_USER || "root",
  password: process.env.MYSQL_PASSWORD || "",
  database: process.env.MYSQL_DATABASE || "apexion",
  port: process.env.MYSQL_PORT || 3306,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : false,
  connectTimeout: 60000,
  acquireTimeout: 60000,
});

// Connect once
db.connect((err) => {
  if (err) {
    console.error("❌ Database connection failed:", err.message);
    process.exit(1);
  }
  console.log("✅ MySQL2 Connected to:", process.env.MYSQL_HOST || "localhost");
});

// Handle connection errors
db.on("error", (err) => {
  console.error("⚠️ Database error:", err);
  if (err.code === "PROTOCOL_CONNECTION_LOST") {
    console.log("🔄 Attempting to reconnect...");
    // Optionally recreate connection
  } else {
    throw err;
  }
});

module.exports = db;
