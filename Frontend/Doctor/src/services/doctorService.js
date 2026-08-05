import axios from "axios";

const API = "http://localhost:8081/api/auth";

export const getPatientByQrToken = (qrToken) => {
  return axios.get(`${API}/doctor/patient/${qrToken}`);
};