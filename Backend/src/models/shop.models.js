// src/models/shop.models.js
import mongoose from "mongoose";

const shopSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    shopName: { type: String, required: true },
    shopIcon: { type: String, default: "" },

    location: {
      type: { type: String, enum: ["Point"], default: "Point" },
      coordinates: { type: [Number], default: [0, 0] }
    },

    description: { type: String, default: "" },

    totalOrders: { type: Number, default: 0 },
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],

    // IMPORTANT for items
    listedItems: [{ type: mongoose.Schema.Types.ObjectId, ref: "Item" }],
    totalListedItems: { type: Number, default: 0 }
  },
  { timestamps: true }
);

shopSchema.index({ location: "2dsphere" });

const Shop = mongoose.model("Shop", shopSchema);
export default Shop;
