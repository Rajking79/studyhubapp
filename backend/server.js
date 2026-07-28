const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const path = require("path");
const morgan = require("morgan");
const compression = require("compression");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const mongoose = require("mongoose");

dotenv.config();

const connectDB = require("./src/config/db.js");
const apiRoutes = require("./src/routes/index.js");
const errorMiddleware = require("./src/middlewares/error.middleware.js");

const app = express();

// Security & Optimization Middlewares
app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors({ origin: process.env.CORS_ORIGIN || "*", credentials: true }));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(mongoSanitize());
app.use(xss());
app.use(compression());

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

// Root Welcome Route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "🚀 StudyHub AI & Admin Panel Backend Server is Running Live!",
    adminWebPanel: `${req.protocol}://${req.get("host")}/admin/`,
    healthCheck: `${req.protocol}://${req.get("host")}/api/v1/health`,
    apiBaseUrl: `${req.protocol}://${req.get("host")}/api/v1`,
    mongoStatus: mongoose.connection.readyState === 1 ? "Online" : "Offline"
  });
});

// Static uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Host Admin Web Panel UI Statically at /admin and /assets
app.use("/admin", express.static(path.join(__dirname, "public", "admin")));
app.use("/assets", express.static(path.join(__dirname, "public", "admin", "assets")));

// SPA Catch-all for /admin client side routing
app.get("/admin/*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "admin", "index.html"));
});

// API Health Check
app.get("/api/v1/health", (req, res) => {
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "🚀 StudyHub AI Backend API is running smoothly!",
    mongoStatus: mongoose.connection.readyState === 1 ? "Connected" : "Disconnected",
    timestamp: new Date().toISOString()
  });
});

// Database Health Check Guard Middleware
const checkDbHealth = (req, res, next) => {
  if (req.path === "/health") return next();
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({
      success: false,
      statusCode: 503,
      message: "MongoDB Database Connection Offline. Please ensure MongoDB service ('mongod') is running or check MONGO_URI in .env.",
      data: {},
      meta: {},
      errors: [
        "Database is currently disconnected (Mongoose Connection State: " + mongoose.connection.readyState + ")"
      ]
    });
  }
  next();
};

// API Routes Mapping
app.use("/api/v1", checkDbHealth, apiRoutes);

// Fallback 404 Route Handler
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    statusCode: 404,
    message: `Cannot ${req.method} ${req.originalUrl}. Please check your API URL path.`
  });
});

// Global Error Handler Middleware
app.use(errorMiddleware);

// Start Server & Connect DB
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🌐 StudyHub Server listening on http://localhost:${PORT}`);
  console.log(`💻 Admin Web Panel available at http://localhost:${PORT}/admin`);
  console.log(`📡 Health Check: http://localhost:${PORT}/api/v1/health`);
  connectDB();
});
