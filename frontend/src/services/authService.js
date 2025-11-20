import axios from "axios";

// API base URL from env
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Get token from storage
const getToken = () => {
  try {
    const userStr = localStorage.getItem("user");
    if (!userStr) return null;
    const user = JSON.parse(userStr);
    return user?.token;
  } catch (error) {
    return null;
  }
};

// User login service
const login = async (data) => {
  try {
    const response = await api.post("/user/login", data);
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Login failed";
    throw new Error(errorMessage);
  }
};

// User registration service
const register = async (data) => {
  try {
    const response = await api.post("/user/register", data);
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Registration failed";
    throw new Error(errorMessage);
  }
};

const authService = { login, register };
export default authService;