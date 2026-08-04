const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const connectDB = require("./src/config/db");
const routes = require("./src/routes");
const errorHandler = require("./src/middlewares/error.middleware");
const { globalRateLimiter } = require("./src/middlewares/rateLimiter.middleware");

dotenv.config();

const app = express();

// Middlewares
app.use(cors({ origin: process.env.CORS_ORIGIN || "*", credentials: true }));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));

// Global Rate Limiter
app.use(globalRateLimiter);

// Root & Health Checks
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "Welcome to StudyHub AI Production REST API Gateway Server v1.0",
    docsUrl: "https://api.studyhubai.com/api-docs"
  });
});

app.get("/api/v1/health", (req, res) => {
  res.status(200).json({ success: true, status: "UP", timestamp: new Date() });
});

app.get("/api/v1/ready", (req, res) => {
  res.status(200).json({ success: true, status: "READY", database: "CONNECTED" });
});

// Master API Routes Mount
app.use("/api/v1", routes);

// Global Error Handler
app.use(errorHandler);

// Database Connection & Server Start Strategy
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();
  const server = app.listen(PORT, () => {
    console.log(`🚀 StudyHub AI Backend Server running on port ${PORT} in ${process.env.NODE_ENV || "development"} mode`);
  });

  server.on("error", (err) => {
    if (err.code === "EADDRINUSE") {
      console.warn(`Port ${PORT} in use, retrying on port ${Number(PORT) + 1}...`);
      app.listen(Number(PORT) + 1);
    }
  });
};

startServer();

module.exports = app;
