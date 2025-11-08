require("dotenv").config();
const bcrypt = require("bcryptjs");
const { db, query, queryOne } = require("../db.js");

const seedAdmin = async () => {
  try {
    console.log("🔍 Testing database connection...");

    // Check database connection
    await new Promise((resolve, reject) => {
      db.ping((err) => {
        if (err) {
          console.error("❌ Database connection failed:", err.message);
          reject(err);
        } else {
          console.log("✅ Database connection successful!");
          resolve();
        }
      });
    });

    console.log("🧑‍💼 Checking for existing admin user...");

    // Check if admin already exists
    const checkSql = "SELECT * FROM admins WHERE username = ?";
    const existingAdmin = await queryOne(checkSql, ["admin"]);

    if (existingAdmin) {
      console.log("⚠️  Admin user already exists!");
      console.log("Username:", existingAdmin.username);
      console.log("ID:", existingAdmin.id);
      process.exit(0);
    }

    console.log("🛠️  Creating new admin user...");

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("apexion@2025", salt);

    // Insert new admin
    const insertSql = "INSERT INTO admins (username, password) VALUES (?, ?)";
    const result = await query(insertSql, ["admin", hashedPassword]);

    console.log("✅ Admin created successfully!");
    console.log("─────────────────────────────");
    console.log("Username: admin");
    console.log("Password: apexion@2025");
    console.log("ID:", result.insertId);
    console.log("─────────────────────────────");
    console.log("\n⚠️  Please change the password after first login!");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding admin:", error.message);
    process.exit(1);
  }
};

// Run the seed function
seedAdmin();
