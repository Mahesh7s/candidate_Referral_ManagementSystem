import axios from "axios";

// API base URL from env
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
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

// Get referrals based on role
const getReferrals = (role) => {
  if (role === "Admin") {
    return api.get("/referral/");
  }
  return api.get("/referral/my");
};

// Create new referral
const createReferral = (data) => {
  const formData = new FormData();
  formData.append("candidateName", data.candidateName);
  formData.append("email", data.email);
  formData.append("phone", data.phone);
  formData.append("jobTitle", data.jobTitle);
  
  if (data.resume) {
    formData.append("resume", data.resume);
  }

  return api.post("/referral/", formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    timeout: 30000
  });
};

// Update referral details
const updateReferral = (id, data) => {
  return api.put(`/referral/${id}`, data);
};

// Update referral with resume
const updateReferralWithResume = (id, data) => {
  const formData = new FormData();
  formData.append("candidateName", data.candidateName);
  formData.append("email", data.email);
  formData.append("phone", data.phone);
  formData.append("jobTitle", data.jobTitle);
  
  if (data.resume) {
    formData.append("resume", data.resume);
  }

  return api.put(`/referral/${id}/with-resume`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

// Delete referral
const deleteReferral = (id) => {
  return api.delete(`/referral/${id}`);
};

const referralService = { 
  getReferrals, 
  createReferral, 
  updateReferral, 
  updateReferralWithResume,
  deleteReferral 
};

export default referralService;