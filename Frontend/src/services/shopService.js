import api from "./api";

export const getAllShops = () => api.get("api/shop/all");
export const getShopById = (id) => api.get(`api/shop/${id}`);
export const registerShop = (data) => api.post("api/shop/register", data);
export const findNearestShops = (lat, lng) => {
  return api.get(`api/shop/nearest?lat=${lat}&lng=${lng}`);
};

export const getLoggedInShop = () => api.get("api/shop/me");

export const getLoggedInShopItems = () => api.get("api/shop/me/items");
// UPDATE SHOP NAME
// ==========================
export const updateShopName = (shopName) =>
  api.post("api/settings/shop/update/shopname", { shopName });
//update username
export const updateShopUsername = (username) =>
  api.post("api/settings/shop/update/username", { username });

// ==========================
// UPDATE SHOP PASSWORD
// ==========================
export const updateShopPassword = (password) =>
  api.post("api/settings/shop/update/password", { password });

// ==========================
// UPDATE SHOP ICON (Cloudinary URL)
// ==========================
export const updateShopIcon = (iconUrl) =>
  api.post("api/settings/shop/update/icon", { iconUrl });

// ==========================
// UPDATE SHOP LOCATION
// ==========================
export const updateShopLocation = (lat, lng) =>
  api.post("api/settings/shop/update/location", { lat, lng });
