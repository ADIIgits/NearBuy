import { useEffect, useState } from "react";
import {
  getLoggedInShop,
  updateShopName,
  updateShopPassword,
  updateShopIcon,
  updateShopLocation,
} from "../services/shopService";
import { uploadImageToCloudinary } from "../services/uploadService";

export default function ShopSettings() {
  const [loading, setLoading] = useState(true);

  const [shopName, setShopName] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [shopIcon, setShopIcon] = useState("");
  const [previewIcon, setPreviewIcon] = useState("");

  const [location, setLocation] = useState({ lat: 0, lng: 0 });

  const [message, setMessage] = useState("");

  // Fetch logged-in shop on load
  useEffect(() => {
    getLoggedInShop()
      .then((res) => {
        const shop = res.data.shop;

        setShopName(shop.shopName);
        setShopIcon(shop.shopIcon);
        setPreviewIcon(shop.shopIcon);

        if (shop.location?.coordinates) {
          setLocation({
            lng: shop.location.coordinates[0],
            lat: shop.location.coordinates[1],
          });
        }

        setLoading(false);
      })
      .catch((err) => {
        console.log("Error fetching shop:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p style={{ padding: 20 }}>Loading...</p>;

  /* =========================
     UPDATE SHOP NAME
  ========================= */
  const handleShopNameSave = async () => {
    try {
      await updateShopName(shopName);
      setMessage("Shop name updated!");
    } catch (err) {
      setMessage("Error updating shop name");
    }
  };

  /* =========================
     UPDATE PASSWORD
  ========================= */
  const handlePasswordSave = async () => {
    if (!newPassword.trim()) {
      setMessage("Password cannot be empty!");
      return;
    }
    try {
      await updateShopPassword(newPassword);
      setNewPassword("");
      setMessage("Password updated!");
    } catch (err) {
      setMessage("Error updating password");
    }
  };

  /* =========================
     UPLOAD + UPDATE SHOP ICON
  ========================= */
  const handleIconUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Local preview
    const preview = URL.createObjectURL(file);
    setPreviewIcon(preview);

    try {
      // 1️⃣ Upload to Cloudinary
      const cloudRes = await uploadImageToCloudinary(file);
      const imageUrl = cloudRes.secure_url;

      if (!imageUrl) {
        setMessage("Cloudinary upload failed.");
        return;
      }

      // 2️⃣ Send URL to backend
      await updateShopIcon(imageUrl);

      setMessage("Shop icon updated!");
    } catch (err) {
      console.log(err);
      setMessage("Error updating shop icon");
    }
  };

  /* =========================
     UPDATE LOCATION USING GPS
  ========================= */
  const updateLocationGPS = async () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(async (pos) => {
      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;

      setLocation({ lat, lng });

      try {
        await updateShopLocation(lat, lng);
        setMessage("Location updated!");
      } catch (err) {
        setMessage("Error updating location");
      }
    });
  };

  return (
    <div style={{ padding: 20, maxWidth: 600 }}>
      <h2>Shop Settings</h2>

      {message && (
        <p style={{ color: "green", fontWeight: "bold" }}>{message}</p>
      )}

      {/* ================= SHOP ICON ================= */}
      <section style={{ marginTop: 20 }}>
        <h3>Shop Icon</h3>

        <img
          src={previewIcon || "https://via.placeholder.com/120"}
          alt="shop"
          style={{
            width: 120,
            height: 120,
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />

        <br />

        <input type="file" accept="image/*" onChange={handleIconUpload} />
      </section>

      {/* ================= SHOP NAME ================= */}
      <section style={{ marginTop: 20 }}>
        <h3>Shop Name</h3>
        <input
          style={{ padding: 8, width: "100%", marginBottom: 8 }}
          value={shopName}
          onChange={(e) => setShopName(e.target.value)}
        />
        <button onClick={handleShopNameSave}>Save Shop Name</button>
      </section>

      {/* ================= PASSWORD ================= */}
      <section style={{ marginTop: 20 }}>
        <h3>Change Password</h3>
        <input
          type="password"
          placeholder="New password"
          style={{ padding: 8, width: "100%", marginBottom: 8 }}
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <button onClick={handlePasswordSave}>Save Password</button>
      </section>

      {/* ================= LOCATION ================= */}
      <section style={{ marginTop: 20 }}>
        <h3>Location</h3>
        <p>
          Lat: {location.lat} <br />
          Lng: {location.lng}
        </p>

        <button onClick={updateLocationGPS}>Update Using GPS</button>
      </section>
    </div>
  );
}
