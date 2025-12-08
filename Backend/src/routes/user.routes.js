import express from "express";
import { requireUser } from "../middlewares/authsession.middleware.js";
import { getMyUserProfile } from "../controllers/user.controllers.js";

const router = express.Router();

router.get("/me", requireUser, getMyUserProfile);

export default router;
