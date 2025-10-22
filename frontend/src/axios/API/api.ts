import axios from "axios";
import Cookies from "js-cookie";

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true
});

API.interceptors.request.use((config) => {
    const token = Cookies.get("token")
    if (token) {
      config.headers.Authorization = token; 
    }
  

  return config;
});

export default API;
