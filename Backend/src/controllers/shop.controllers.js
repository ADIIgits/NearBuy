import Shop from "../models/shop.models.js";
import Item from "../models/item.models.js";


// 1️⃣ Get all shops (USER only)
export const getAllShops = async (req, res) => {
  try {
    const shops = await Shop.find({}, "-password -orders")
      .lean();

    res.json({
      message: "All shops fetched",
      shops
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// 2️⃣ Public: get items of a shop
export const getShopItems = async (req, res) => {
  try {
    const { shopUsername , shopId} = req.params;

    // const shop = await Shop.findOne({ username: shopUsername }).lean();
    const shop = await Shop.findById(shopId).lean();
    if (!shop) return res.status(404).json({ message: "Shop not found" });

    const items = await Item.find({ shop: shop._id }).lean();

    res.json({
      message: "Items fetched",
      shop: {
        username: shop.username,
        shopName: shop.shopName,
        shopIcon: shop.shopIcon,
        description: shop.description,
        location: shop.location
      },
      items
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// 3️⃣ Shop Dashboard: Get MY items
export const getMyShopItems = async (req, res) => {
  try {
    const shopId = req.session.user.id;

    const items = await Item.find({ shop: shopId }).lean();

    res.json({
      message: "Your items fetched",
      items
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// 4️⃣ Shop Dashboard: Get MY shop profile
export const getMyShopProfile = async (req, res) => {
  try {
    const shopId = req.session.user.id;

    const shop = await Shop.findById(shopId, "-password").lean();

    res.json({
      message: "Your profile",
      shop
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// 5️⃣ Get shop details by ID (USER only)
export const getShopDetails = async (req, res) => {
  try {
    const { shopId } = req.params;

    const shop = await Shop.findById(shopId, "-password").lean();
    if (!shop) return res.status(404).json({ message: "Shop not found" });

    res.json({
      message: "Shop details fetched",
      shop
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
