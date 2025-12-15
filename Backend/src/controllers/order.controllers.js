import Order from "../models/order.models.js";
import Shop from "../models/shop.models.js";
import Item from "../models/item.models.js";

export const createOrder = async (req, res) => {
  try {
    const userId = req.session?.user?.id;
    const userType = req.session?.user?.type;

    if (!userId || userType !== "user") {
      return res.status(401).json({ message: "Only logged-in users can place orders" });
    }

    const { shopId, items, note } = req.body;

    if (!shopId || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "shopId and items[] are required" });
    }

    // 1. Validate shop
    const shop = await Shop.findById(shopId);
    if (!shop) {
      return res.status(404).json({ message: "Shop not found" });
    }

    // 2. Validate items & calculate totalAmount
    let totalAmount = 0;
    const processedItems = [];

    for (const entry of items) {
      const { itemId, quantity } = entry;

      if (!itemId || !quantity || quantity < 1) {
        return res.status(400).json({ message: "Invalid item or quantity" });
      }

      const item = await Item.findById(itemId);
      if (!item) {
        return res.status(404).json({ message: `Item not found: ${itemId}` });
      }

      // Calculate price based on existing item price
      totalAmount += item.price * quantity;

      processedItems.push({
        item: item._id,
        quantity
      });
    }

    // 3. Create order
    const newOrder = await Order.create({
      user: userId,
      shop: shopId,
      items: processedItems,
      totalAmount,
      note: note || "",
      status: "pending"
    });

    // 4. Update shop stats
    shop.orders.push(newOrder._id);
    shop.totalOrders += 1;
    await shop.save();

    res.status(201).json({
      message: "Order created successfully",
      order: newOrder
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

export const showOrders = async (req, res) => {
  try {
    const shopId = req.session?.user?.id;
    const userType = req.session?.user?.type;

    // Only shops can view their orders
    if (!shopId || userType !== "shop") {
      return res.status(401).json({ message: "Only shop owners can view orders" });
    }

    // Fetch all orders for this shop
    const orders = await Order.find({ shop: shopId })
      .populate("user", "username userIcon location")
      .populate("items.item", "itemName price images")
      .sort({ createdAt: -1 });

    res.json({
      message: "Orders fetched successfully",
      totalOrders: orders.length,
      orders
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const shopId = req.session?.user?.id;
    const userType = req.session?.user?.type;

    // Only shop owners can update status
    if (!shopId || userType !== "shop") {
      return res.status(401).json({ message: "Only shop owners can update order status" });
    }

    const { orderId, newStatus } = req.body;

    if (!orderId || !newStatus) {
      return res.status(400).json({ message: "orderId and newStatus are required" });
    }

    // Allowed statuses
    const allowedStatuses = ["pending", "preparing", "delivering", "completed", "canceled"];
    if (!allowedStatuses.includes(newStatus)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    // Check if order exists AND belongs to this shop
    const order = await Order.findOne({ _id: orderId, shop: shopId });

    if (!order) {
      return res.status(404).json({ message: "Order not found or unauthorized" });
    }

    // Update status
    order.status = newStatus;
    await order.save();

    res.json({
      message: "Order status updated successfully",
      order
    });

  } catch (err) {
    console.error("Order status update error:", err);
    res.status(500).json({ message: err.message });
  }
};

export const getShopOrders = async (req, res) => {
  try {
    const shopId = req.session?.user?.id;
    const userType = req.session?.user?.type;

    if (!shopId || userType !== "shop") {
      return res.status(401).json({ message: "Only shop owners can view their orders" });
    }

    const orders = await Order.find({ shop: shopId })
    .populate({
      path: "user",
      select: "username userIcon location" 
    })
    .populate({
      path: "items.item",
      select: "itemName price"
    })
    .sort({ createdAt: -1 });

    res.json({
      message: "Shop orders fetched successfully",
      total: orders.length,
      orders
    });
  } catch (err) {
    console.error("Shop order fetch error:", err);
    res.status(500).json({ message: err.message });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const userId = req.session?.user?.id;
    const userType = req.session?.user?.type;

    if (!userId || userType !== "user") {
      return res.status(401).json({ message: "Only users can view their order history" });
    }

    const orders = await Order.find({ user: userId })
      .populate("shop", "shopName username shopIcon")
      .populate("items.item", "itemIcon itemName price images")
      .sort({ createdAt: -1 });

    res.json({
      message: "User orders fetched successfully",
      total: orders.length,
      orders
    });
  } catch (err) {
    console.error("User order fetch error:", err);
    res.status(500).json({ message: err.message });
  }
};

export const cancelOrder = async (req, res) => {
  try {
    const userId = req.session?.user?.id;
    const userType = req.session?.user?.type;

    if (!userId || userType !== "user") {
      return res.status(401).json({ message: "Only users can cancel their orders" });
    }

    const { orderId } = req.body;

    if (!orderId) {
      return res.status(400).json({ message: "orderId is required" });
    }

    // Find the order and ensure it belongs to the user
    const order = await Order.findOne({ _id: orderId, user: userId });

    if (!order) {
      return res.status(404).json({ message: "Order not found or unauthorized" });
    }

    // Only allow cancellation if order is not completed or already canceled
    if (["completed", "canceled"].includes(order.status)) {
      return res.status(400).json({ message:  "Cannot cancel a completed or already canceled order" });
    }

    // Update status to canceled
    order.status = "canceled";
    await order.save();

    res.json({
      message: "Order canceled successfully",
      order
    });

  } catch (err) {
    console.error("Order cancellation error:", err);
    res.status(500).json({ message: err.message });
  }
};
