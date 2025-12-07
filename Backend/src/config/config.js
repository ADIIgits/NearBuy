// src/config/config.js
import dotenv from "dotenv";
dotenv.config();

// Export the necessary variables
export const MONGO_URI = process.env.MONGO_URI;
export const SESSION_SECRET = process.env.SESSION_SECRET;

// You can also just export all of process.env if needed
// export default process.env;