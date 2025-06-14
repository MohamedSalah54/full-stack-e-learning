import axios from "axios";

const API = axios.create({
  baseURL:process.env.NEXT_APP_API_URL , 
  withCredentials: true, 
});

export default API;