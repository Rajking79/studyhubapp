const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/studyhub_db";
    mongoose.set("strictQuery", false);
    mongoose.set("bufferCommands", false);

    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 2000,
      connectTimeoutMS: 2000
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    console.log("⚠️ MongoDB server is offline. Instant dataStore fallbacks enabled.");
  }
};

module.exports = connectDB;
