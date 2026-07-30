import axios from "axios";

const API = axios.create({
  baseURL:"https://student-career-management-system.onrender.com/api"
});

export default API;