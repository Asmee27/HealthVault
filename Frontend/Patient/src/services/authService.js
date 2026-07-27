import axios from "axios";

const API_URL = "http://localhost:8081/api/auth";

export const login = async (email, password) => {
  return axios.post(`${API_URL}/login`, {
    email,
    password,
  });
};

export const register = async (payload) => {
  return axios.post(`${API_URL}/register`, payload);
};