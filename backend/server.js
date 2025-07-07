const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./db");
const reviewRoutes = require("./routes/reviews");
const contactRoutes = require("./routes/contact");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// routes
app.use("/api/reviews", reviewRoutes);
app.use("/api", contactRoutes);

// API to receive appointment data
app.post("/api/appointments", (req, res) => {
  const { name, phone, message } = req.body;
  const sql =
    "INSERT INTO appointments (name, phone, message) VALUES (?, ?, ?)";
  db.query(sql, [name, phone, message], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send({ success: true, message: "Appointment booked" });
  });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
