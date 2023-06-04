import axios from "axios";

const BASE_URL = "https://backend-service-desk.onrender.com/api";
// const BASE_URL = 'http://localhost:8081/api';
export default axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  Authorization: true,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  Authorization: true,
  headers: { "Content-Type": "application/json", Authorization: true },
  withCredentials: true,
});
