const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorHandler");

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

// Initialize app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);

// Routes
app.use("/api/auth", require("./routes/authRoutes"));

const assessmentRouter = require("./routes/assessmentRoutes");
app.use("/api/assessment", assessmentRouter);

const medbotRouter = require("./routes/medbot");
app.use("/api/medbot", medbotRouter);

// Basic route
app.get("/", (req, res) => {
  res.send("MindBridge API is running");
});

// Error handler middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
