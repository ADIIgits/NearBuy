import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    shop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shop",
      required: true
    },

    items: [
      {
        item: { 
          type: mongoose.Schema.Types.ObjectId, 
          ref: "Item", 
          required: true 
        },
        quantity: { 
          type: Number, 
          required: true 
        }
      }
    ],

    totalAmount: { 
      type: Number, 
      required: true 
    },

    status: {
      type: String,
      enum: [
        "pending", 
        "preparing",
        "delivering",
        "completed",
        "canceled"
      ],
      default: "pending"
    },

    note: { type: String, default: "" }
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
