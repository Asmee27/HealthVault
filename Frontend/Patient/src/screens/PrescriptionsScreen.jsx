import { useEffect, useState } from "react";
import axios from "axios";
import downloadPrescription from "./downloadPrescription";
import TopAppBar from "../components/TopAppBar";
import BottomNavBar from "../components/BottomNavBar";
import { enablePushNotifications } from "../services/pushNotificationService";

export default function PrescriptionsScreen() {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const enableMedicineNotifications = async () => {
    const success = await enablePushNotifications();
    if (success) {
      alert("Medicine notifications enabled successfully! 🔔");
    } else {
      alert("Could not enable medicine notifications.");
    }
  };

  const deletePrescription = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this prescription?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/prescriptions/${id}`);
      setPrescriptions((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Error deleting prescription:", error);
      alert("Failed to delete prescription.");
    }
  };

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const profile = JSON.parse(localStorage.getItem("profile") || "null");
        const patientId = localStorage.getItem("patientId") || profile?.id;

        if (!patientId) return;

        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/prescriptions/${patientId}`);
        setPrescriptions(response.data);
      } catch (error) {
  console.error("Error fetching prescriptions:", error);
} finally {
  setLoading(false);
}
    };

    fetchPrescriptions();
  }, []);

  const filteredPrescriptions = prescriptions.filter((card) => {
    const search = searchTerm.toLowerCase();
    return (
      card.diagnosis?.toLowerCase().includes(search) ||
      card.medicines?.toLowerCase().includes(search) ||
      card.doctor?.fullName?.toLowerCase().includes(search)
    );
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-teal-50/50 text-teal-800 font-medium">
        Loading prescriptions...
      </div>
    );
  }

  return (
    <div className="pb-32 bg-slate-50 min-h-screen">
      <TopAppBar />

      <main className="pt-24 px-6 max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-3xl font-bold text-teal-950 tracking-tight">
              Medication History 💊
            </h2>
            <p className="text-slate-500 text-sm mt-1">
              Manage and track prescriptions from your care team.
            </p>
          </div>

          <button
            onClick={enableMedicineNotifications}
            className="self-start md:self-auto inline-flex items-center gap-2 px-4 py-2.5 bg-teal-100 hover:bg-teal-200 text-teal-900 text-xs font-bold rounded-2xl transition-all border border-teal-200/60 shadow-sm"
          >
            <span>🔔</span> Enable Reminders
          </button>
        </div>

        {/* Search Input */}
        <div className="mb-8 relative max-w-md">
          <span className="material-symbols-outlined absolute left-3.5 top-3 text-teal-600/50">
            search
          </span>
          <input
            type="text"
            placeholder="Search diagnosis, medicine, or doctor..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-2xl text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 transition-all"
          />
        </div>

        {/* Grid Display */}
        {filteredPrescriptions.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-100 shadow-sm">
            <p className="text-slate-400 text-sm">No prescriptions found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPrescriptions.map((card) => (
              <div
                key={card.id}
                className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Card Header */}
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold">
                        <span className="material-symbols-outlined text-2xl">medical_services</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-800 text-base">
                          {card.doctor?.fullName || "Doctor"}
                        </h3>
                        {card.diagnosis && (
                          <span className="inline-block mt-0.5 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-teal-800 bg-teal-100/70 rounded-md">
                            {card.diagnosis}
                          </span>
                        )}
                      </div>
                    </div>

                    <span className="text-[11px] font-semibold text-teal-800 bg-teal-50 px-2.5 py-1 rounded-full border border-teal-100/50">
                      {card.createdAt
                        ? new Date(card.createdAt).toLocaleDateString()
                        : "Current"}
                    </span>
                  </div>

                  {/* Medicines List Box */}
                  <div className="space-y-1.5 my-4 bg-teal-50/40 p-3.5 rounded-2xl border border-teal-100/30">
                    {card.medicines?.split(",").map((medicine, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-600" />
                        <span className="text-xs font-semibold text-slate-700">
                          {medicine.trim()}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Details */}
                  <div className="text-xs text-slate-500 space-y-1 mb-5 px-1">
                    <p>
                      <span className="font-semibold text-slate-700">Duration:</span> {card.duration}
                    </p>
                    <p>
                      <span className="font-semibold text-slate-700">Frequency:</span> {card.frequency}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 pt-3 border-t border-slate-100">
                  <button
                    onClick={() => setSelectedPrescription(card)}
                    className="flex-1 font-semibold text-xs py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white shadow-sm shadow-teal-200 transition-all"
                  >
                    View Details
                  </button>

                  <button
                    onClick={() => downloadPrescription(card)}
                    className="p-2.5 rounded-xl bg-teal-50 hover:bg-teal-100/80 text-teal-700 transition-colors"
                    title="Download Prescription"
                  >
                    <span className="material-symbols-outlined text-sm block">download</span>
                  </button>

                  <button
                    onClick={() => deletePrescription(card.id)}
                    className="p-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-500 transition-colors"
                    title="Delete Prescription"
                  >
                    <span className="material-symbols-outlined text-sm block">delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Details Modal */}
      {selectedPrescription && (
        <div className="fixed inset-0 bg-slate-900/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-6 w-[450px] max-w-full shadow-2xl border border-slate-100">
            <h3 className="text-lg font-bold text-teal-950 mb-4">Prescription Details</h3>

            <div className="space-y-3 text-sm text-slate-600">
              <p><strong className="text-slate-800">Doctor:</strong> {selectedPrescription.doctor?.fullName}</p>
              <p><strong className="text-slate-800">Diagnosis:</strong> {selectedPrescription.diagnosis}</p>
              <div>
                <strong className="text-slate-800 block mb-1">Medicines:</strong>
                <pre className="bg-teal-50/40 p-3 rounded-2xl border border-teal-100/40 text-xs font-sans text-slate-700 whitespace-pre-wrap">
                  {selectedPrescription.medicines}
                </pre>
              </div>
              <p><strong className="text-slate-800">Duration:</strong> {selectedPrescription.duration}</p>
              <p><strong className="text-slate-800">Frequency:</strong> {selectedPrescription.frequency}</p>
            </div>

            <button
              onClick={() => setSelectedPrescription(null)}
              className="mt-6 w-full py-2.5 bg-teal-900 text-white rounded-2xl text-xs font-bold hover:bg-teal-950 transition-all"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <BottomNavBar activeTab="dashboard" />
    </div>
  );
}