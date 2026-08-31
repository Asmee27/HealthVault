import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function ScheduleAppointment() {
  const navigate = useNavigate();
  const { qrToken } = useParams();

  const [patient, setPatient] = useState(null);

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [purpose, setPurpose] = useState("");

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/api/patient/qr/${qrToken}`)
      .then((res) => setPatient(res.data));
  }, [qrToken]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const params = new URLSearchParams();

      params.append("patientId", patient.id);
      params.append("doctorId", 2); // Replace later with logged-in doctor id
      params.append("appointmentDate", date);
      params.append("appointmentTime", time);
      params.append("purpose", purpose);

      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/appointments`,
        params
      );

      alert("Appointment Scheduled!");

      navigate(`/patient-overview/${qrToken}`);
    } catch (err) {
      console.error(err);
      alert("Failed to schedule appointment");
    }
  };

  if (!patient) return <div>Loading...</div>;

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-[500px] space-y-5"
      >

        <h2 className="text-2xl font-bold">
          Schedule Appointment
        </h2>

        <p>
          Patient:
          <b> {patient.fullName}</b>
        </p>

        <div>
          <label>Date</label>

          <input
            type="date"
            className="w-full border rounded p-3 mt-1"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Time</label>

          <input
            type="time"
            className="w-full border rounded p-3 mt-1"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Purpose</label>

          <textarea
            className="w-full border rounded p-3 mt-1"
            rows="4"
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            placeholder="Reason for appointment..."
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg"
        >
          Schedule Appointment
        </button>

      </form>

    </div>
  );
}