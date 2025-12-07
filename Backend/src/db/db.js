// src/db/db.js
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      dbName: "nearbuy", // ensures DB name is set
    });

    console.log(`📦 MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err.message);
    process.exit(1); // stop server on DB failure
  }
};

export default connectDB;
