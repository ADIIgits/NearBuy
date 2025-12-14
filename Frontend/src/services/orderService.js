
import api from "./api";

export const createOrder = (data) => {
  return api.post("/order/create", data);
};
export const updateOrderStatus = (orderId, newStatus) => {
  return api.post("/order/updatestatus", {
    orderId,
    newStatus
  });
};
//get shop orders
export const getAllShopOrders = () => {
  return api.get("/order/shop/me");
};
export const getAllUserOrders = () => {
  return api.get("/order/user/me");
};
// Get logged-in shop data
export const getLoggedInShop = () => {
  return api.get("/shop/me");
};

export const cancelOrder = (orderId) => {
  return api.post("/order/cancel", { orderId });
}
