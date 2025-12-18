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
export const getItemById = async (req, res) => {
  try {
    const { itemId } = req.params;

    const item = await Item.findById(itemId).lean();
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.json({
      message: "Item fetched successfully",
      item
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateItem = async (req, res) => {
  try {
    const sessionUser = req.session?.user;

    if (!sessionUser) {
      return res.status(401).json({ message: "Not logged in" });
    }

    if (sessionUser.type !== "shop") {
      return res.status(403).json({ message: "Only shops can update items" });
    }

    const { itemId } = req.params;
    const { itemName, itemIcon, images, price } = req.body;

    const item = await Item.findById(itemId);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    if (item.shop.toString() !== sessionUser.id) {
      return res.status(403).json({ message: "You can only update your own items" });
    }
    if (itemIcon) item.itemIcon = itemIcon;

    if (itemName) item.itemName = itemName;

    if (Array.isArray(images)) {
      item.images = images;
    }

    if (price !== undefined) {
      if (price < 0) {
        return res.status(400).json({ message: "Price must be non-negative" });
      }
      item.price = price;
    }

    await item.save();

    res.json({
      message: "Item updated successfully",
      item
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteItem = async (req, res) => {
  try {
    const sessionUser = req.session?.user;

    if (!sessionUser) {
      return res.status(401).json({ message: "Not logged in" });
    }

    if (sessionUser.type !== "shop") {
      return res.status(403).json({ message: "Only shops can delete items" });
    }

    const { itemId } = req.params;

    const item = await Item.findById(itemId);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    if (item.shop.toString() !== sessionUser.id) {
      return res.status(403).json({ message: "You can only delete your own items" });
    }

    await item.deleteOne();

    await Shop.findByIdAndUpdate(sessionUser.id, {
      $pull: { listedItems: itemId },
      $inc: { totalListedItems: -1 }
    });

    res.json({ message: "Item deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
