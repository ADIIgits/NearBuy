import api from "./api";

export const getAllShops = () => api.get("/shop/all");
export const getShopById = (id) => api.get(`/shop/${id}`);
export const registerShop = (data) => api.post("/shop/register", data);