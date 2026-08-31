import axios from "axios";
const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/ai`;

export const askHealthAssistant = (question) => {
  return axios.post(`${API_URL}/ask`, {
    question,
  });
};