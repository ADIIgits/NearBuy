// src/controllers/auth.controllers.js
import User from "../models/user.models.js";
import Shop from "../models/shop.models.js";
import bcrypt from "bcryptjs";

// REGISTER
export const registerUser = async (req, res) => {
  try {
    const { type, username, password, userIcon, shopName, shopIcon, location } = req.body;

    if (!type || !username || !password) {
      return res.status(400).json({ message: "type, username, password required" });
    }

    let Model = type === "user" ? User : type === "shop" ? Shop : null;
    if (!Model) return res.status(400).json({ message: "invalid type" });

    const existing = await Model.findOne({ username });
    if (existing) return res.status(400).json({ message: "username already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    let data = {
      username,
      password: hashedPassword,
      location
    };

    if (type === "user") {
      data.userIcon = userIcon || "";
    }

    if (type === "shop") {
      data.shopName = shopName;
      data.shopIcon = shopIcon || "";
    }

    const newUser = await Model.create(data);

    res.status(201).json({
      message: `${type} registered successfully`,
      data: newUser
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// LOGIN
// LOGIN
export const loginUser = async (req, res) => {
  try {
    const { type, username, password } = req.body;

    if (!type || !username || !password) {
      return res.status(400).json({ message: "type, username, password required" });
    }

    let Model = type === "user" ? User : type === "shop" ? Shop : null;
    if (!Model) return res.status(400).json({ message: "invalid type" });

    const user = await Model.findOne({ username });
    if (!user) return res.status(404).json({ message: `${type} not found` });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "incorrect password" });

    // ⭐ Store login session
    req.session.user = {
      id: user._id,
      type,
      username: user.username
    };

    res.json({
      message: `${type} login successful`,
      user: req.session.user
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

