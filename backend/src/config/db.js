const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      process.env.MONGODB_URI || "mongodb://localhost:27017/studyhubai",
      {
        serverSelectionTimeoutMS: 5000
      }
    );
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.warn(`MongoDB Connection Warning: ${error.message}. Running with offline mock fallback.`);
    return null;
  }
};

module.exports = connectDB;
