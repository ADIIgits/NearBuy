import express from "express";
import { createOrder , showOrders , updateOrderStatus
, getShopOrders , getUserOrders , cancelOrder
} from "../controllers/order.controllers.js";

const router = express.Router();

// POST: create order
//api/order/
router.post("/create", createOrder);
router.get("/all", showOrders);
router.post("/updatestatus", updateOrderStatus);

router.get("/shop/me", getShopOrders);
router.get("/user/me", getUserOrders);
router.post("/cancel", cancelOrder);

export default router;
