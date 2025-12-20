import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://nearbuy-backend-csue.onrender.com',
  headers: {
        'Content-Type': 'application/json',
    },
  withCredentials: true,
});

export default api;
