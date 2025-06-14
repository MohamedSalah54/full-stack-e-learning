import axios from "axios";

const API = axios.create({
  baseURL:process.env , 
  withCredentials: true, 
});

export default API;