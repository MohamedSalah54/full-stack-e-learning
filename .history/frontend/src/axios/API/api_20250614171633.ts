import axios from "axios";

const API = axios.create({
  baseURL:pro , 
  withCredentials: true, 
});

export default API;