import axios from "axios";
const API_URL = "https://chat-go-n43g.onrender.com/api";

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});
