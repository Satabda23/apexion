const mysql = require("mysql");

// Railway MySQL configuration
const db = mysql.createConnection({
  host: process.env.MYSQL_HOST || "localhost",
  user: process.env.MYSQL_USER || "root",
  password: process.env.MYSQL_PASSWORD || "",
  database: process.env.MYSQL_DATABASE || "apexion",
  port: process.env.MYSQL_PORT || 3306,
  // Additional Railway-specific options
  ssl:
    process.env.NODE_ENV === "production"
      ? {
          rejectUnauthorized: false,
        }
      : false,
  connectTimeout: 60000,
  acquireTimeout: 60000,
  timeout: 60000,
  reconnect: true,
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
    throw err;
  }
  console.log("MySQL Connected to:", process.env.MYSQL_HOST || "localhost");
});

// Handle connection errors
db.on("error", function (err) {
  console.error("Database error:", err);
  if (err.code === "PROTOCOL_CONNECTION_LOST") {
    console.log("Attempting to reconnect...");
    // Handle reconnection if needed
  } else {
    throw err;
  }
});

module.exports = db;
