import api from "./api";

export const getAllItems = () => api.get("/items");
export const getItemsByShop = (shopId) =>
  api.get(`/shop/${shopId}/items`);
