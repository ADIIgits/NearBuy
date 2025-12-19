import express from "express";
import {
  updateUsername,
  updatePassword,
  updateUserIcon,
  updateUserLocation,
  updateShopname
} from "../controllers/settings.controllers.js";

const router = express.Router();



// Update username
router.post("/user/update/username", updateUsername);

// Update password
router.post("/user/update/password", updatePassword);

// Update profile icon
router.post("/user/update/icon", upload.single("image"), updateUserIcon);

// Update location
router.post("/user/update/location", updateUserLocation);

// router.post("/shop/update/username", updateUsername);
router.post("/shop/update/shopname", updateShopname);
router.post("/shop/update/password", updatePassword);
router.post("/shop/update/icon", updateUserIcon);
router.post("/shop/update/location", updateUserLocation);

export default router;
