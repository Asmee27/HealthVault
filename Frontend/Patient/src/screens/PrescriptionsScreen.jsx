import { useEffect, useState } from "react";
import axios from "axios";

import TopAppBar from "../components/TopAppBar";
import BottomNavBar from "../components/BottomNavBar";

export default function PrescriptionsScreen() {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);

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

        {prescriptions.length === 0 ? (
          <div className="bg-surface-container-lowest rounded-xl p-6 text-center">
            <p className="text-on-surface-variant">No prescriptions found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {prescriptions.map((card) => (
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
                  <button className="flex-1 font-bold text-sm py-3 rounded-xl bg-primary text-on-primary">
                    View Details
                  </button>

                  <button className="p-3 rounded-xl bg-secondary-container/30 text-on-secondary-container">
                    <span className="material-symbols-outlined">download</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <BottomNavBar activeTab="dashboard" />
    </div>
  );
}
