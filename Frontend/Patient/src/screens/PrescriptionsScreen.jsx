import { useEffect, useState } from "react";
import axios from "axios";
import downloadPrescription from "./downloadPrescription";
import TopAppBar from "../components/TopAppBar";
import BottomNavBar from "../components/BottomNavBar";

export default function PrescriptionsScreen() {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const [search, setSearch] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const deletePrescription = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this prescription?"
  );

  if (!confirmDelete) return;

  try {
    await axios.delete(
      `http://localhost:8081/api/prescriptions/${id}`
    );

    setPrescriptions((prev) =>
      prev.filter((prescription) => prescription.id !== id)
    );

    alert("Prescription deleted successfully.");
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

        if (!patientId) {
          console.error("Patient ID not found");
          return;
        }

        const response = await axios.get(
          `http://localhost:8081/api/prescriptions/${patientId}`,
        );

        console.log("PRESCRIPTIONS:", response.data);

        setPrescriptions(response.data);
      } catch (error) {
        console.error("Error fetching prescriptions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPrescriptions();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        Loading prescriptions...
      </div>
    );
  }

  const filteredPrescriptions = prescriptions.filter((card) => {
    const search = searchTerm.toLowerCase();

    const deletePrescription = async (id) => {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this prescription?",
      );

      if (!confirmDelete) return;

      try {
        await axios.delete(`http://localhost:8081/api/prescriptions/${id}`);

        // Remove it from the screen immediately
        setPrescriptions((prev) =>
          prev.filter((prescription) => prescription.id !== id),
        );

        alert("Prescription deleted successfully.");
      } catch (error) {
        console.error("Error deleting prescription:", error);
        alert("Failed to delete prescription.");
      }
    };

    return (
      card.diagnosis?.toLowerCase().includes(search) ||
      card.medicines?.toLowerCase().includes(search) ||
      card.doctor?.fullName?.toLowerCase().includes(search)
    );
  });

  return (
    <div className="pb-32 bg-surface min-h-screen">
      <TopAppBar />

      <main className="pt-24 px-6 max-w-screen-xl mx-auto">
        <div className="mb-10 max-w-xl">
          <h2 className="font-headline text-4xl font-extrabold tracking-tight text-on-surface mb-2">
            Medication History
          </h2>

          <p className="text-on-surface-variant">
            Manage and track prescriptions from your care team.
          </p>
        </div>

        <input
          type="text"
          placeholder="Search diagnosis, medicine or doctor..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-96 px-4 py-3 border rounded-xl"
        />

        {prescriptions.length === 0 ? (
          <div className="bg-surface-container-lowest rounded-xl p-6 text-center">
            <p className="text-on-surface-variant">No prescriptions found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPrescriptions.map((card) => (
              <div
                key={card.id}
                className="bg-surface-container-lowest text-on-surface clinical-shadow rounded-xl p-6 border border-white/40 flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-primary-container/10 flex items-center justify-center">
                        <span className="material-symbols-outlined text-3xl text-primary">
                          medical_services
                        </span>
                      </div>

                      <div>
                        <h3 className="font-headline text-lg font-bold">
                          {card.doctor?.fullName || "Doctor"}
                        </h3>

                        <p className="text-xs font-medium uppercase tracking-wider text-primary">
                          {card.diagnosis}
                        </p>
                      </div>
                    </div>

                    <span className="bg-tertiary-container/10 text-[11px] font-bold px-2 py-1 rounded-full uppercase">
                      {card.createdAt
                        ? new Date(card.createdAt).toLocaleDateString()
                        : "Current"}
                    </span>
                  </div>

                  <div className="space-y-4 mb-8">
                    {card.medicines?.split(",").map((medicine, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>

                        <span className="font-semibold text-sm">
                          {medicine.trim()}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2 text-sm mb-6">
                    <p>
                      <b>Duration:</b> {card.duration}
                    </p>

                    <p>
                      <b>Frequency:</b> {card.frequency}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setSelectedPrescription(card)}
                    className="flex-1 font-bold text-sm py-3 rounded-xl bg-primary text-on-primary"
                  >
                    View Details
                  </button>

                  <button
                    onClick={() => downloadPrescription(card)}
                    className="p-3 rounded-xl bg-secondary-container/30 text-on-secondary-container"
                    title="Download Prescription"
                  >
                    <span className="material-symbols-outlined">download</span>
                  </button>

                  <button
                    onClick={() => deletePrescription(card.id)}
                    className="p-3 rounded-xl bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
                    title="Delete Prescription"
                  >
                    <span className="material-symbols-outlined">delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {selectedPrescription && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-[500px] max-w-[90%]">
            <h2 className="text-xl font-bold mb-4">Prescription Details</h2>

            <p>
              <b>Doctor:</b> {selectedPrescription.doctor?.fullName}
            </p>

            <p>
              <b>Diagnosis:</b> {selectedPrescription.diagnosis}
            </p>

            <p>
              <b>Medicines:</b>
            </p>

            <pre className="bg-gray-100 p-3 rounded mt-2 whitespace-pre-wrap">
              {selectedPrescription.medicines}
            </pre>

            <p className="mt-3">
              <b>Duration:</b> {selectedPrescription.duration}
            </p>

            <p>
              <b>Frequency:</b> {selectedPrescription.frequency}
            </p>

            <button
              onClick={() => setSelectedPrescription(null)}
              className="mt-5 px-5 py-2 bg-blue-600 text-white rounded"
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
