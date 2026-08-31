import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Sidebar from "../components/Sidebar";

import HistoryCard from "../components/HistoryCard";

export default function AddPrescription() {
  const navigate = useNavigate();
  const { qrToken } = useParams();
  const [patient, setPatient] = useState(null);
  const [diagnosis, setDiagnosis] = useState("");
  const [medicines, setMedicines] = useState([""]);
  const [duration, setDuration] = useState("7 Days");
  const [frequency, setFrequency] = useState("Three times daily");
  const [dosage, setDosage] = useState("");
  const [reminderSchedule, setReminderSchedule] = useState({
    morning: false,
    afternoon: false,
    night: false,
  });

  const [reminderTimes, setReminderTimes] = useState({
    morning: "08:00",
    afternoon: "13:00",
    night: "20:00",
  });

  const addMedicine = () => {
    setMedicines([...medicines, ""]);
  };

  const updateMedicine = (index, value) => {
    const updated = [...medicines];
    updated[index] = value;
    setMedicines(updated);
  };

  const removeMedicine = (index) => {
    if (medicines.length === 1) return;

    setMedicines(medicines.filter((_, i) => i !== index));
  };

  const toggleReminder = (slot) => {
    setReminderSchedule((prev) => ({
      ...prev,
      [slot]: !prev[slot],
    }));
  };

  const updateReminderTime = (slot, time) => {
    setReminderTimes((prev) => ({
      ...prev,
      [slot]: time,
    }));
  };

  useEffect(() => {
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }
  }, []);

  useEffect(() => {
    axios
  .get(`${import.meta.env.VITE_API_BASE_URL}/api/patient/qr/${qrToken}`)
      .then((res) => setPatient(res.data))
      .catch((err) => console.error(err));
  }, [qrToken]);

  const doctor = JSON.parse(localStorage.getItem("doctor"));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const medicineText = medicines
      .filter((med) => med.trim() !== "")
      .join(", ");
    try {
      const params = new URLSearchParams();

      params.append("patientId", patient.id);
      params.append("doctorId", doctor.id);
      params.append("diagnosis", diagnosis);
      params.append("medicines", medicineText);
      params.append("duration", duration);
      params.append("frequency", frequency);
      params.append(
        "reminderSchedule",
        JSON.stringify({
          morning: reminderSchedule.morning ? reminderTimes.morning : null,
          afternoon: reminderSchedule.afternoon
            ? reminderTimes.afternoon
            : null,
          night: reminderSchedule.night ? reminderTimes.night : null,
        }),
      );

      console.log("Sending prescription:", {
        patientId: patient?.id,
        doctorId: doctor?.id,
        diagnosis,
        medicines: medicineText,
        reminderSchedule,
        duration,
        frequency,
      });

      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/prescriptions`, params);

      alert("Prescription Saved Successfully!");

      navigate(`/patient-overview/${qrToken}`);
    } catch (err) {
      console.error(err);
      alert("Failed to save prescription");
    }
  };

  if (!patient) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  
  return (
    <div className="bg-surface font-body text-on-surface min-h-screen">
      <header className="fixed top-0 w-full z-50 bg-slate-50/80 dark:bg-slate-900/80 backdrop-blur-md shadow-sm shadow-teal-900/5 flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(`/patient-overview/${qrToken}`)}
            className="hover:bg-slate-200/50 dark:hover:bg-slate-800/50 transition-colors p-2 rounded-full"
          >
            <span className="material-symbols-outlined text-teal-700 dark:text-teal-400">
              arrow_back
            </span>
          </button>
          <h1 className="font-headline font-bold text-slate-900 dark:text-slate-100 text-xl">
            Patient Records
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden md:block text-sm font-medium text-slate-600 dark:text-slate-400">
            Dr. {doctor?.fullName}
          </span>
          <img
            alt="Doctor Profile"
            className="w-10 h-10 rounded-full border-2 border-primary-container"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBCZ1FHCXz5RCjDRsmpkCrv7JsxU2saamqGl5C2h6s9f_CcterGeFwq3KsZL716yiP2PNfhGyrPT6hIfQicCUSxjAyt4r8ZKPOhp8fbG_rpI62l2P38KmXeS_UCIeDGM01QrBzh0YezZEMPj2_ZAXkt8rrioKf-VJNs5w8F2XlJmk1-HhvM1kJSg6cEW2GPeg_vvgdYNFpXSByj6fvAFenhkXtLeSORhGIF2-jdhqqdlDui0PAdzIyDN8yZMf2VaD0gZLNlybRuMp4"
          />
        </div>
      </header>

      <Sidebar activePatient={patient} />

      <main className="lg:ml-72 pt-24 px-4 md:px-8 pb-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          {/* Prescription Form Section */}
          <div className="xl:col-span-12 max-w-5xl mx-auto">
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-10 shadow-xl shadow-teal-950/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>

              <header className="relative mb-10">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 bg-primary-container/20 rounded-2xl flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary text-3xl">
                      add_notes
                    </span>
                  </div>
                  <h2 className="font-headline text-3xl font-bold text-on-surface tracking-tight">
                    New Prescription
                  </h2>
                </div>
                <p className="text-on-surface-variant">
                  Fill in the details to record a new clinical entry for{" "}
                  {patient.fullName}.
                </p>
              </header>

              <form className="space-y-8 relative" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-on-surface-variant ml-1">
                      Doctor Name
                    </label>
                    <div className="relative group">
                      <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">
                        person
                      </span>
                      <input
                        className="w-full pl-12 pr-4 py-4 bg-surface-container-low border-transparent rounded-xl font-medium text-on-surface focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all"
                        readOnly
                        type="text"
                        defaultValue={doctor?.fullName}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-on-surface-variant ml-1">
                      Specialization
                    </label>
                    <div className="relative group">
                      <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">
                        medical_services
                      </span>
                      <input
                        className="w-full pl-12 pr-4 py-4 bg-surface-container-low border-transparent rounded-xl font-medium text-on-surface focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all"
                        readOnly
                        type="text"
                        defaultValue="General Practitioner"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-on-surface-variant ml-1">
                    Issue / Diagnosis
                  </label>
                  <textarea
                    className="w-full px-5 py-4 bg-surface-container-lowest border-outline-variant/30 rounded-2xl font-body text-on-surface focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all placeholder:text-slate-400"
                    placeholder="Describe the patient's symptoms and primary diagnosis..."
                    rows="4"
                    value={diagnosis}
                    onChange={(e) => setDiagnosis(e.target.value)}
                  ></textarea>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between px-1">
                    <label className="text-sm font-semibold text-on-surface-variant">
                      Medicines & Dosage
                    </label>

                    <button
                      type="button"
                      onClick={addMedicine}
                      className="text-xs font-bold text-primary flex items-center gap-1 hover:underline"
                    >
                      <span className="material-symbols-outlined text-base">
                        add
                      </span>
                      Add Another
                    </button>
                  </div>

                  <div className="space-y-3">
                    {medicines.map((med, index) => (
                      <div
                        key={index}
                        className="grid grid-cols-12 gap-3 items-center"
                      >
                        <div className="col-span-12 md:col-span-10">
                          <input
                            className="w-full px-5 py-4 bg-surface-container-lowest border-outline-variant/30 rounded-xl text-sm focus:ring-primary/5 focus:border-primary transition-all"
                            placeholder={`Medicine ${index + 1} (e.g. Amoxicillin)`}
                            type="text"
                            value={med}
                            onChange={(e) =>
                              updateMedicine(index, e.target.value)
                            }
                          />
                        </div>

                        {medicines.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeMedicine(index)}
                            className="col-span-12 md:col-span-2 flex items-center justify-center text-red-500 hover:text-red-700"
                            title="Remove medicine"
                          >
                            <span className="material-symbols-outlined">
                              delete
                            </span>
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-on-surface-variant ml-1">
                      Duration
                    </label>
                    <div className="relative group">
                      <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                        calendar_today
                      </span>
                      <select
                        className="w-full pl-12 pr-4 py-4 bg-surface-container-lowest border-outline-variant/30 rounded-xl text-sm appearance-none focus:ring-primary/5 focus:border-primary"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                      >
                        <option>3 Days</option>
                        <option>5 Days</option>
                        <option>7 Days</option>
                        <option>14 Days</option>
                        <option>30 Days</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-on-surface-variant ml-1">
                      Frequency
                    </label>
                    <div className="relative group">
                      <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                        schedule
                      </span>
                      <select
                        className="w-full pl-12 pr-4 py-4 bg-surface-container-lowest border-outline-variant/30 rounded-xl text-sm appearance-none focus:ring-primary/5 focus:border-primary"
                        value={frequency}
                        onChange={(e) => setFrequency(e.target.value)}
                      >
                        <option>Once daily</option>
                        <option>Twice daily</option>
                        <option>Three times daily</option>
                        <option>Every 6 hours</option>
                      </select>
                    </div>

                    <div className="space-y-4">
                      <label className="text-sm font-semibold text-on-surface-variant">
                        Medicine Reminder Schedule
                      </label>

                      <p className="text-xs text-on-surface-variant">
                        Select when the patient should receive medicine
                        reminders.
                      </p>

                      {/* Morning */}
                      <div className="flex items-center gap-4 p-4 bg-surface-container-lowest rounded-xl">
                        <input
                          type="checkbox"
                          checked={reminderSchedule.morning}
                          onChange={() => toggleReminder("morning")}
                          className="w-5 h-5 accent-primary"
                        />

                        <span className="flex-1 font-medium">🌅 Morning</span>

                        <input
                          type="time"
                          value={reminderTimes.morning}
                          onChange={(e) =>
                            updateReminderTime("morning", e.target.value)
                          }
                          disabled={!reminderSchedule.morning}
                          className="px-3 py-2 border rounded-lg disabled:opacity-40"
                        />
                      </div>

                      {/* Afternoon */}
                      <div className="flex items-center gap-4 p-4 bg-surface-container-lowest rounded-xl">
                        <input
                          type="checkbox"
                          checked={reminderSchedule.afternoon}
                          onChange={() => toggleReminder("afternoon")}
                          className="w-5 h-5 accent-primary"
                        />

                        <span className="flex-1 font-medium">☀️ Afternoon</span>

                        <input
                          type="time"
                          value={reminderTimes.afternoon}
                          onChange={(e) =>
                            updateReminderTime("afternoon", e.target.value)
                          }
                          disabled={!reminderSchedule.afternoon}
                          className="px-3 py-2 border rounded-lg disabled:opacity-40"
                        />
                      </div>

                      {/* Night */}
                      <div className="flex items-center gap-4 p-4 bg-surface-container-lowest rounded-xl">
                        <input
                          type="checkbox"
                          checked={reminderSchedule.night}
                          onChange={() => toggleReminder("night")}
                          className="w-5 h-5 accent-primary"
                        />

                        <span className="flex-1 font-medium">🌙 Night</span>

                        <input
                          type="time"
                          value={reminderTimes.night}
                          onChange={(e) =>
                            updateReminderTime("night", e.target.value)
                          }
                          disabled={!reminderSchedule.night}
                          className="px-3 py-2 border rounded-lg disabled:opacity-40"
                        />
                      </div>

                     
                    </div>
                  </div>
                </div>

                <div className="pt-6 flex flex-col md:flex-row gap-4">
                  <button
                    className="flex-1 bg-teal-900 text-on-primary font-headline font-bold py-4 rounded-xl shadow-lg shadow-primary/20 hover:bg-teal-950 transition-all active:scale-[0.98]"
                    type="submit"
                  >
                    Save Prescription
                  </button>
                  <button
                    className="px-8 py-4 bg-surface-container text-on-surface-variant font-headline font-bold rounded-xl hover:bg-surface-container-highest transition-all"
                    type="button"
                    onClick={() => navigate(`/patient-overview/${qrToken}`)}
                  >
                    Save as Draft
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>

      <div className="md:hidden">
        <button
          onClick={() => navigate(`/add-prescription/${qrToken}`)}
          className="fixed bottom-8 right-8 w-16 h-16 bg-primary text-on-primary rounded-2xl shadow-2xl flex items-center justify-center group transition-all hover:w-48 hover:rounded-xl active:scale-95 z-50 overflow-hidden"
        >
          <div className="flex items-center gap-2 px-4 whitespace-nowrap">
            <span className="material-symbols-outlined text-3xl">add</span>
            <span className="font-headline font-bold hidden group-hover:block transition-all opacity-0 group-hover:opacity-100">
              Add Prescription
            </span>
          </div>
        </button>

      </div>
    </div>
  );
}
