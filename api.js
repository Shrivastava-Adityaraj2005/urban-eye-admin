import axios from "axios";

const api = axios.create({
  baseURL: "https://urban-eye-backend.onrender.com",
});

api.interceptors.request.use(
  (config) => {
    // Required for ngrok free-tier API calls
    config.headers["ngrok-skip-browser-warning"] = "true";
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;