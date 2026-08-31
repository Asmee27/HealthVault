import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/reports`;
export const uploadReport = (formData) => {
  return axios.post(`${API_URL}/upload`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};