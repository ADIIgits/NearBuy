import User from "../models/user.models.js";
import Shop from "../models/shop.models.js";
import bcrypt from "bcryptjs";

const getModel = (type) => (type === "shop" ? Shop : User);

/* =========================
   UPDATE USERNAME (USER/SHOP)
========================= */
export const updateUsername = async (req, res) => {
  try {
    const { username } = req.body;
    const sessionUser = req.session?.user;

    if (!sessionUser) {
      return res.status(401).json({ message: "Not logged in" });
    }

    if (!username) {
      return res.status(400).json({ message: "Username is required" });
    }

    const Model = getModel(sessionUser.type);

    const exists = await Model.findOne({ username });
    if (exists) {
      return res.status(400).json({ message: "Username already taken" });
    }

    await Model.findByIdAndUpdate(sessionUser.id, { username });

    // update session
    req.session.user.username = username;

    res.json({
      message: "Username updated successfully",
      username
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* =========================
   UPDATE PASSWORD (USER/SHOP)
========================= */
export const updatePassword = async (req, res) => {
  try {
    const { password } = req.body;
    const sessionUser = req.session?.user;

    if (!sessionUser) {
      return res.status(401).json({ message: "Not logged in" });
    }

    if (!password || password.length < 6) {
      return res.status(400).json({ message: "Password too short" });
    }

    const Model = getModel(sessionUser.type);
    const hashed = await bcrypt.hash(password, 10);

    await Model.findByIdAndUpdate(sessionUser.id, { password: hashed });

    res.json({ message: "Password updated successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* =========================
   UPDATE ICON (USER/SHOP)
========================= */
export const updateUserIcon = async (req, res) => {
  try {
    const { iconUrl } = req.body;
    const sessionUser = req.session?.user;

    if (!sessionUser) {
      return res.status(401).json({ message: "Not logged in" });
    }

    if (!iconUrl) {
      return res.status(400).json({ message: "iconUrl is required" });
    }

    const Model = getModel(sessionUser.type);

    const updateField =
      sessionUser.type === "user"
        ? { userIcon: iconUrl }
        : { shopIcon: iconUrl };

    await Model.findByIdAndUpdate(sessionUser.id, updateField);

    // update session correctly
    if (sessionUser.type === "user") {
      req.session.user.userIcon = iconUrl;
    } else {
      req.session.user.shopIcon = iconUrl;
    }

    res.json({
      message: "Icon updated successfully",
      icon: iconUrl
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* =========================
   UPDATE LOCATION (USER/SHOP)
========================= */
export const updateUserLocation = async (req, res) => {
  try {
    const { lat, lng } = req.body;
    const sessionUser = req.session?.user;

    if (!sessionUser) {
      return res.status(401).json({ message: "Not logged in" });
    }

    if (lat == null || lng == null) {
      return res.status(400).json({ message: "Latitude & Longitude required" });
    }

    const Model = getModel(sessionUser.type);

    await Model.findByIdAndUpdate(sessionUser.id, {
      location: {
        type: "Point",
        coordinates: [lng, lat]
      }
    });

    res.json({ message: "Location updated successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateShopname = async (req, res) => {
  try {
    const { shopName } = req.body;
    const sessionUser = req.session?.user;

    if (!sessionUser) {
      return res.status(401).json({ message: "Not logged in" });
    }

    if (sessionUser.type !== "shop") {
      return res.status(403).json({ message: "Only shops can update shop name" });
    }

    if (!shopName || !shopName.trim()) {
      return res.status(400).json({ message: "Shop name is required" });
    }

    const updatedShop = await Shop.findByIdAndUpdate(
      sessionUser.id,
      { shopName: shopName.trim() },
      { new: true }
    );

    res.json({
      message: "Shop name updated successfully",
      shopName: updatedShop.shopName
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

