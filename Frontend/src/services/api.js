import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // your backend base URL
  headers: {
        'Content-Type': 'application/json',
    },
  withCredentials: true,
});

export default api;
