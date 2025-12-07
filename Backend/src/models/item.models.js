// src/models/item.models.js
import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    itemName: { type: String, required: true },
    itemIcon: { type: String, default: "" },

    // NEW — array of image URLs
    images: {
      type: [String],
      default: []
    },

    price: { type: Number, required: true },

    shop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shop",
      required: true,
    }
  },
  { timestamps: true }
);

const Item = mongoose.model("Item", itemSchema);
export default Item;
