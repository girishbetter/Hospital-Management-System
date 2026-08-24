require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const patientsRouter = require("./routes/Patient");
const doctorsRouter = require("./routes/Doctor");
const appointmentsRouter = require("./routes/Appointment");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB database connection established successfully");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// Root route for health checks / Render
app.get("/", (req, res) => {
  res.json({
    message: "Hospital Management API is running",
    endpoints: ["/patients", "/doctors", "/appointments"]
  });
});

// Routes
app.use("/patients", patientsRouter);
app.use("/doctors", doctorsRouter);
app.use("/appointments", appointmentsRouter);

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});