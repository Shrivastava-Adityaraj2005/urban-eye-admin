import axios from "axios";
//https://urban-eye-backend.onrender.com
const api = axios.create({
  baseURL: "http://localhost:8080",
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