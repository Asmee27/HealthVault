import { useEffect, useState } from "react";
import TopAppBar from "../components/TopAppBar";
import BottomNavBar from "../components/BottomNavBar";
import { getUserReports } from "../services/recordService";

export default function RecordsScreen() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const profile = JSON.parse(localStorage.getItem("profile"));

        if (!profile) {
          setLoading(false);
          return;
        }

        const response = await getUserReports(profile.id);
        setRecords(response.data);
      } catch (error) {
        console.error("Error fetching reports:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  return (
    <div className="pb-32 bg-surface min-h-screen">
      <TopAppBar />

      <main className="pt-20 px-6 max-w-2xl mx-auto">
        {/* Header */}
        <section className="mb-8">
          <h1 className="text-3xl font-black text-on-surface mb-6 tracking-tight">
            My Records
          </h1>

          <div className="space-y-4">
            <div className="relative group">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">
                search
              </span>

              <input
                className="w-full pl-12 pr-4 py-4 bg-surface-container-highest border-none rounded-xl focus:ring-2 focus:ring-primary/20 transition-all"
                placeholder="Search medical records..."
                type="text"
              />
            </div>

            <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
              <button className="px-5 py-2 rounded-full bg-primary text-on-primary font-medium text-sm">
                All
              </button>

              <button className="px-5 py-2 rounded-full bg-tertiary-container/20 text-on-tertiary-container font-medium text-sm">
                Reports
              </button>

              <button className="px-5 py-2 rounded-full bg-tertiary-container/20 text-on-tertiary-container font-medium text-sm">
                Prescriptions
              </button>
            </div>
          </div>
        </section>

        <div className="space-y-10 relative">
          <div className="absolute left-4 top-4 bottom-4 w-px bg-outline-variant/30 hidden md:block"></div>

          <section className="relative">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-8 h-8 rounded-lg bg-primary-container flex items-center justify-center text-on-primary-container font-bold text-xs">
                {new Date().getFullYear()}
              </div>

              <div className="h-px flex-1 bg-surface-container-high"></div>
            </div>

            <div className="space-y-4">
              {loading ? (
                <p className="text-center text-on-surface-variant">
                  Loading records...
                </p>
              ) : records.length === 0 ? (
                <p className="text-center text-on-surface-variant">
                  No medical records found.
                </p>
              ) : (
                records.map((rec) => (
                  <div
                    key={rec.id}
                    className="group relative bg-surface-container-lowest p-5 rounded-xl shadow-sm border border-outline-variant/10 hover:shadow-md transition-all"
                  >
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex gap-4">
                        <div className="w-12 h-12 rounded-xl bg-secondary-container/20 flex items-center justify-center text-secondary">
                          <span className="material-symbols-outlined">
                            description
                          </span>
                        </div>

                        <div>
                          <h3 className="font-bold text-on-surface group-hover:text-primary transition-colors">
                            {rec.fileName}
                          </h3>

                          <p className="text-sm text-on-surface-variant">
                            {rec.reportType}
                          </p>

                          <p className="text-xs text-on-surface-variant mt-1">
                            {rec.notes}
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          const fileName = rec.filePath.split("\\").pop();

                          window.open(
                            `http://localhost:8081/uploads/${fileName}`,
                            "_blank",
                          );
                        }}
                        className="px-4 py-2 bg-surface-container text-on-surface font-semibold text-sm rounded-lg active:scale-95 transition-transform"
                      >
                        View
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>
      </main>

      <BottomNavBar activeTab="records" />
    </div>
  );
}
