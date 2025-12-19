import api from "./api";

export const getAllItems = () => api.get("api/items");
export const getItemsByShop = (shopId) =>
  api.get(`api/shop/${shopId}/items`);
export const createNewItem = (data) => api.post("api/item/add", data);
export const getItemById = (itemId) => api.get(`api/item/${itemId}`);
export const updateItemById = (itemId, data) => api.post(`api/item/update/${itemId}`, data);
export const deleteItemById = (itemId) => api.post(`api/item/delete/${itemId}`);