// src/routes/auth.routes.js
import express from "express";
import { registerUser, loginUser, checkUsername } from "../controllers/auth.controllers.js";
import { sessionStatus } from "../controllers/status.controllers.js";
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/status", sessionStatus);
router.get("/checkuserexist", checkUsername);
router.get("/session", (req, res) => {
  res.json({
    user: req.session.user || null
  });
});
router.post("/logout", (req, res) => {
  req.session.destroy(() => {
    res.json({ message: "Logged out successfully" });
  });
});


export default router;
