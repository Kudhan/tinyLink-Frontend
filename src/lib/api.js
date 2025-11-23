import axios from "axios";
import { getToken } from "./auth";

const API = axios.create({
  baseURL: "https://tinylink-mgsu.onrender.com",

  headers: { "Content-Type": "application/json" }
});

// attach token
API.interceptors.request.use(cfg => {
  const token = getToken();
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

export default API;
