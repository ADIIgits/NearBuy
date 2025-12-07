// src/controllers/item.controllers.js
import Shop from "../models/shop.models.js";
import Item from "../models/item.models.js";

export const createItem = async (req, res) => {
  try {
    // Get logged-in user from session
    const sessionUser = req.session.user;

    if (!sessionUser) {
      return res.status(401).json({ message: "Not logged in" });
    }

    // Only shops can register items
    if (sessionUser.type !== "shop") {
      return res.status(403).json({ message: "Only shops can add items" });
    }

    const { itemName, itemIcon, images, price } = req.body;

    if (!itemName || !price) {
      return res.status(400).json({ message: "itemName and price are required" });
    }

    // Find the shop using the ID from session
    const shop = await Shop.findById(sessionUser.id);
    if (!shop) {
      return res.status(404).json({ message: "Shop not found" });
    }

    // Create new item
    const newItem = await Item.create({
      itemName,
      itemIcon: itemIcon || "",
      images: images || [],
      price,
      shop: shop._id,
    });

    // Update shop's listed items
    shop.listedItems.push(newItem._id);
    shop.totalListedItems = shop.listedItems.length;
    await shop.save();

    res.status(201).json({
      message: "Item registered successfully",
      item: newItem,
    });
  } catch (err) {
    console.error("Error creating item:", err);
    res.status(500).json({ message: err.message });
  }
};
