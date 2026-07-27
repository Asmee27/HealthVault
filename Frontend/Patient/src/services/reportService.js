import axios from "axios";

const API_URL = "http://localhost:8081/api/reports";

export const uploadReport = (formData) => {
  return axios.post(`${API_URL}/upload`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};