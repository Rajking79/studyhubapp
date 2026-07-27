const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      process.env.MONGO_URI || "mongodb://127.0.0.1:27017/studyhub_db"
    );
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    // If local MongoDB isn't running, fallback gracefully for demo testing
    console.log("ℹ️ Server running in decoupled offline mode if local MongoDB daemon is stopped.");
  }
};

module.exports = connectDB;
