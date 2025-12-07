import express from "express";
import { createItem } from "../controllers/item.controllers.js";
import { requireLogin } from "../middlewares/authsession.middleware.js";
const router = express.Router();

router.post("/register", requireLogin, createItem);

export default router;
