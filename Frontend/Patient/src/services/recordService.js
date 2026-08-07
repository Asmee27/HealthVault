import axios from "axios";

const API_URL = "http://localhost:8081/api/reports";

export const getUserReports = (userId) => {
  return axios.get(`${API_URL}/${userId}`);
};

export const deleteReport = async (id) => {
  return axios.delete(`${API_URL}/${id}`);
};