// src/models/user.models.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true }, // added clearly
    password: { type: String, required: true },

    userIcon: { type: String, default: "" },

    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: { type: [Number], default: [0, 0] },
    },

    totalOrders: { type: Number, default: 0 },

    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
      },
    ],

    cart: [
      {
        item: { type: mongoose.Schema.Types.ObjectId, ref: "Item" },
        quantity: { type: Number, default: 1 },
      },
    ],
  },
  { timestamps: true }
);

userSchema.index({ location: "2dsphere" });

const User = mongoose.model("User", userSchema);
export default User;
