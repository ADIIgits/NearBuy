// index.js (ESM)
console.log("Current Directory:", process.cwd());
// import dotenv from "dotenv";
// dotenv.config();

import connectDB from "./src/db/db.js";
import app from "./src/app.js";
import cors from "cors";
const PORT = process.env.PORT || 3000;



app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

const startServer = async () => {
  try {
    // 1. Connect to DB
    await connectDB();
    console.log("✅ Connected to MongoDB");

    // 2. Start server
    app.listen(PORT, () => {
      console.log(`🚀 NearBuy server running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err.message);
    process.exit(1);
  }
};

startServer();
