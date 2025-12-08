import express from "express";
import {
  getAllShops,
  getShopItems,
  getMyShopItems,
  getMyShopProfile
} from "../controllers/shop.controllers.js";

import {
  requireLogin,
  requireUser,
  requireShop
} from "../middlewares/authsession.middleware.js";

const router = express.Router();

// 1. Logged-in USER → see all shops
router.get("/all", requireUser, getAllShops);

// 3. Logged-in SHOP → view their own items
router.get("/me/items", requireShop, getMyShopItems);

// 4. Logged-in SHOP → profile
router.get("/me", requireShop, getMyShopProfile);

// 2. PUBLIC → view items of ANY shop
router.get("/:shopUsername/items", getShopItems);


export default router;
