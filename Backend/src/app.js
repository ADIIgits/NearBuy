// src/app.js (ESM)
import express from "express";
import { MONGO_URI, SESSION_SECRET } from "./config/config.js";
import authRoutes from "./routes/auth.routes.js";
import itemRoutes from "./routes/item.routes.js";
import userRoutes from "./routes/user.routes.js";
import shopRoutes from "./routes/shop.routes.js";
import orderRoutes from "./routes/order.routes.js";
import settingsRoutes from "./routes/settings.routes.js";
import geoRoutes from "./routes/geo.routes.js";
import cors from "cors";
const app = express();

// Middlewares
app.use(express.json());
const CLIENT_URL = true;

app.use(
  cors({
    origin: CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

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
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
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
app.use("/api/order", orderRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/geo", geoRoutes);



export default app;
