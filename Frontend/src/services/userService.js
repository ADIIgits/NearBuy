import api from "./api";
export const getLoggedInUser = () => api.get("/user/me");
export const updateUsername = (username) =>
  api.post("/settings/user/update/username", { username });

// Update password
export const updatePassword = (password) =>
  api.post("/settings/user/update/password", { password });

// Upload + update userIcon
// Send only image URL to backend
export const updateUserIcon = (iconUrl) =>
  api.post("/settings/user/update/icon", { iconUrl });


// Update location
export const updateUserLocation = (lat, lng) =>
  api.post("/settings/user/update/location", { lat, lng });