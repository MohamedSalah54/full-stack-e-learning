import axios from "axios";

const API = axios.create({
  baseURL:process.e , 
  withCredentials: true, 
});

export default API;