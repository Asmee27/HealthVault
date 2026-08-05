import axios from "axios";

const API_URL = "http://localhost:8081/api/ai";

export const askHealthAssistant = (question) => {
  return axios.post(`${API_URL}/ask`, {
    question,
  });
};