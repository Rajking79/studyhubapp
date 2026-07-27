const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const path = require("path");

dotenv.config();

const connectDB = require("./src/config/db.js");
const apiRoutes = require("./src/routes/index.js");
const errorMiddleware = require("./src/middlewares/error.middleware.js");

const app = express();

// Middlewares
app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors({ origin: process.env.CORS_ORIGIN || "*", credentials: true }));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

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
    timestamp: new Date().toISOString()
  });
});

// API Routes Mapping
app.use("/api/v1", apiRoutes);

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

// Start Server Immediately & Connect DB in Background
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🌐 StudyHub Server listening on http://localhost:${PORT}`);
  console.log(`💻 Admin Web Panel available at http://localhost:${PORT}/admin`);
  console.log(`📡 Health Check: http://localhost:${PORT}/api/v1/health`);
  connectDB();
});
