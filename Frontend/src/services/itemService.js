import api from "./api";

export const getAllItems = () => api.get("/items");
export const getItemsByShop = (shopId) =>
  api.get(`/shop/${shopId}/items`);
export const createNewItem = (data) => api.post("/item/add", data);
