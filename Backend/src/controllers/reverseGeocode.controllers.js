// src/controllers/reverseGeocode.controllers.js
import fetch from "node-fetch";

export const reverseGeocode = async (req, res) => {
  try {
    const { lat, lng } = req.query;

    if (!lat || !lng) {
      return res.status(400).json({
        message: "lat and lng are required",
      });
    }

    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`;

    const response = await fetch(url, {
      headers: {
        // ⚠️ Required by Nominatim usage policy
        "User-Agent": "NearBuy-App/1.0 (contact@nearbuy.app)",
      },
    });

    if (!response.ok) {
      return res.status(500).json({
        message: "Failed to fetch address",
      });
    }

    const data = await response.json();

    res.json({
      address: data.display_name || "Unknown location",
      raw: data, // optional, helpful for debugging
    });
  } catch (err) {
    console.error("Reverse geocode error:", err);
    res.status(500).json({ message: err.message });
  }
};
