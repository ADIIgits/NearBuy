// src/app.js (ESM)
import express from "express";
import { MONGO_URI, SESSION_SECRET } from "./config/config.js";
import authRoutes from "./routes/auth.routes.js";
import itemRoutes from "./routes/item.routes.js";
import userRoutes from "./routes/user.routes.js";
import shopRoutes from "./routes/shop.routes.js";
const app = express();

// Middlewares
app.use(express.json());

import session from "express-session";
import MongoStore from "connect-mongo";

console.log("MONGO_URI:", process.env.MONGO_URI);
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: false,
    },
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      dbName: "nearbuy",
      collectionName: "sessions"
    })
  })
);





// Home route
app.get("/", (req, res) => {
  res.send("NearBuy API — Backend is live");
});

// Example auth routes
app.use("/api/auth", authRoutes);
app.use("/api/item", itemRoutes);
app.use("/api/user",userRoutes);
app.use("/api/shop",shopRoutes);

export default app;
