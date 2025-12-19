
import api from "./api";

export const createOrder = (data) => {
  return api.post("api/order/create", data);
};
export const updateOrderStatus = (orderId, newStatus) => {
  return api.post("api/order/updatestatus", {
    orderId,
    newStatus
  });
};
//get shop orders
export const getAllShopOrders = () => {
  return api.get("api/order/shop/me");
};
export const getAllUserOrders = () => {
  return api.get("api/order/user/me");
};
// Get logged-in shop data
export const getLoggedInShop = () => {
  return api.get("api/shop/me");
};

export const cancelOrder = (orderId) => {
  return api.post("api/order/cancel", { orderId });
}
