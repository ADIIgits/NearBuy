import api from "./api";

export const getAllItems = () => api.get("/items");
export const getItemsByShop = (shopId) =>
  api.get(`/shop/${shopId}/items`);
export const createNewItem = (data) => api.post("/item/add", data);
export const getItemById = (itemId) => api.get(`/item/${itemId}`);
export const updateItemById = (itemId, data) => api.post(`/item/update/${itemId}`, data);
export const deleteItemById = (itemId) => api.post(`/item/delete/${itemId}`);
