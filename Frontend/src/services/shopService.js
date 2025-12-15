import api from "./api";

export const getAllShops = () => api.get("/shop/all");
export const getShopById = (id) => api.get(`/shop/${id}`);
export const registerShop = (data) => api.post("/shop/register", data);
export const findNearestShops = (lat, lng) => {
  return api.get(`/shop/nearest?lat=${lat}&lng=${lng}`);
};

export const getLoggedInShop = () => api.get("/shop/me");

// UPDATE SHOP NAME
// ==========================
export const updateShopName = (shopName) =>
  api.post("/settings/shop/update/name", { shopName });

//update username
export const updateShopUsername = (username) =>
  api.post("/settings/shop/update/username", { username });

// ==========================
// UPDATE SHOP PASSWORD
// ==========================
export const updateShopPassword = (password) =>
  api.post("/settings/shop/update/password", { password });

// ==========================
// UPDATE SHOP ICON (Cloudinary URL)
// ==========================
export const updateShopIcon = (iconUrl) =>
  api.post("/settings/shop/update/icon", { iconUrl });

// ==========================
// UPDATE SHOP LOCATION
// ==========================
export const updateShopLocation = (lat, lng) =>
  api.post("/settings/shop/update/location", { lat, lng });
