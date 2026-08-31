import axios from "axios";

const API = `${import.meta.env.VITE_API_BASE_URL}/api/auth`;

export const getPatientByQrToken = (qrToken) => {
  return axios.get(`${API}/doctor/patient/${qrToken}`);
};