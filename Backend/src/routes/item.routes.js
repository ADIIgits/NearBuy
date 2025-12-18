import express from "express";
import { createItem , updateItem, deleteItem} from "../controllers/item.controllers.js";
import { requireLogin } from "../middlewares/authsession.middleware.js";
import { get } from "mongoose";
import { getItemById } from "../controllers/item.controllers.js";

const router = express.Router();

router.post("/add", requireLogin, createItem);
router.get("/:itemId", requireLogin, getItemById);
router.post("/update/:itemId", requireLogin, updateItem);
router.post("/delete/:itemId", requireLogin, deleteItem);

export default router;
