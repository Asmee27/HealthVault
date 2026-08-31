import axios from "axios";
const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/reports`;

export const getUserReports = (userId) => {
  return axios.get(`${API_URL}/${userId}`);
};

export const deleteReport = async (id) => {
  return axios.delete(`${API_URL}/${id}`);
};