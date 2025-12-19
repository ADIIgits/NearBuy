import axios from "axios";

const api = axios.create({
  baseURL: "https://nearbuy-backend-csue.onrender.com", // your backend base URL
  headers: {
        'Content-Type': 'application/json',
    },
  withCredentials: true,
});

export default api;
