// src/api/axiosInstance.js

import axios from "axios";
import Cookies from "js-cookie";
import { useAuth } from "../src/context/AuthContext";

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use((config) => {
  const jwtToken = Cookies.get("token");
  if (jwtToken) {
    config.headers.Authorization = `Bearer ${jwtToken}`;
  }
  return config;
});

export default axiosInstance;
