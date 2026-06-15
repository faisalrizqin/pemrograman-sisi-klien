import axios from "axios";

const baseURL = import.meta.env.PROD 
  ? "/api" 
  : "http://localhost:3001";

const AxiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default AxiosInstance;