import axios from "axios";

const API_URL = "http://localhost:8081/api/auth";

export const getProfile = async (identifier) => {
  return axios.get(`${API_URL}/profile`, {
    params: { email: identifier },
  });
};

export const updateProfile = async (identifier, payload) => {
  return axios.put(`${API_URL}/profile`, payload, {
    params: { email: identifier },
  });
};