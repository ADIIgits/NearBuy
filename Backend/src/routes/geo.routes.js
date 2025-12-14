import express from "express";
import { reverseGeocode } from "../controllers/reverseGeocode.controllers.js";

const router = express.Router();

router.get("/reverse", reverseGeocode);

export default router;
