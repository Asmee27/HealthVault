import axios from "axios";

const API_URL = "http://localhost:8081/api/auth";

export const getProfile = async (email) => {
  return axios.get(`${API_URL}/profile`, {
    params: { email },
  });
};