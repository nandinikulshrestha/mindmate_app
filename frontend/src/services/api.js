import axios from "axios";

const API = axios.create({
  baseURL: "https://mindmate-app-4.onrender.com/api",
});

export default API;