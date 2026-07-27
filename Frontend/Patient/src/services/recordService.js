import axios from "axios";

const API_URL = "http://localhost:8081/api/reports";

export const getUserReports = (userId) => {
  return axios.get(`${API_URL}/${userId}`);
};