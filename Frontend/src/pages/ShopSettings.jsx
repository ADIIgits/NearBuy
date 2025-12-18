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

  /* ---------------- FETCH SHOP ---------------- */
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
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <p className="p-6">Loading...</p>;

  /* ---------------- SHOP NAME ---------------- */
  const handleShopNameSave = async () => {
    try {
      await updateShopName(shopName);
      setMessage("Shop name updated!");
    } catch {
      setMessage("Error updating shop name");
    }
  };

  /* ---------------- PASSWORD ---------------- */
  const handlePasswordSave = async () => {
    if (!newPassword.trim()) return;
    try {
      await updateShopPassword(newPassword);
      setNewPassword("");
      setMessage("Password updated!");
    } catch {
      setMessage("Error updating password");
    }
  };

  /* ---------------- ICON ---------------- */
  const handleIconUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPreviewIcon(URL.createObjectURL(file));

    try {
      const cloudRes = await uploadImageToCloudinary(file);
      await updateShopIcon(cloudRes.secure_url);
      setMessage("Shop icon updated!");
    } catch {
      setMessage("Error updating shop icon");
    }
  };

  /* ---------------- LOCATION ---------------- */
  const updateLocationGPS = async () => {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;
      setLocation({ lat, lng });
      await updateShopLocation(lat, lng);
      setMessage("Location updated!");
    });
  };

  return (
    <div className="p-10 max-w-3xl">
      {/* TITLE */}
      <p className="text-sm text-gray-500">Settings</p>
      <h1 className="text-4xl font-light mb-10">Profile</h1>

      {/* PROFILE HEADER */}
      <div className="flex gap-10 items-center mb-10">
        <div className="flex flex-col items-center gap-3">
          <img
            src={previewIcon || "https://via.placeholder.com/150"}
            className="w-32 h-32 rounded-full object-cover bg-gray-200"
          />

          <label className="px-5 py-2 rounded-full bg-gray-200 cursor-pointer text-sm">
            choose file
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleIconUpload}
            />
          </label>
        </div>

        <p className="text-xl text-gray-600">{shopName}</p>
      </div>

      {/* SHOP NAME */}
      <div className="mb-8">
        <label className="block text-gray-600 mb-2">Shop Name</label>

        <div className="flex gap-4 items-center">
          <input
            value={shopName}
            onChange={(e) => setShopName(e.target.value)}
            className="px-4 py-3 rounded-xl bg-gray-200 w-72 outline-none"
          />

          <button
            onClick={handleShopNameSave}
            className="px-6 py-2 rounded-full bg-gray-200 hover:bg-gray-300"
          >
            Save Shop Name
          </button>
        </div>
      </div>

      {/* PASSWORD */}
      <div className="mb-8">
        <label className="block text-gray-600 mb-2">Change Password</label>

        <div className="flex gap-4 items-center">
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="px-4 py-3 rounded-xl bg-gray-200 w-72 outline-none"
          />

          <button
            onClick={handlePasswordSave}
            className="px-6 py-2 rounded-full bg-gray-200 hover:bg-gray-300"
          >
            Save Password
          </button>
        </div>
      </div>

      {/* LOCATION */}
      <div>
        <label className="block text-gray-600 mb-2">
          Save current Location
        </label>

        <button
          onClick={updateLocationGPS}
          className="px-5 py-2 rounded-full bg-gray-200 hover:bg-gray-300"
        >
          get location
        </button>
      </div>

      {message && (
        <p className="mt-6 text-green-600 font-medium">{message}</p>
      )}
    </div>
  );
}
