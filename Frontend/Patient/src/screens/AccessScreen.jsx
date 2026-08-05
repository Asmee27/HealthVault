import { useEffect, useState } from "react";
import TopAppBar from "../components/TopAppBar";
import BottomNavBar from "../components/BottomNavBar";
import { getProfile } from "../services/profileService";

export default function AccessScreen() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const identifier =
          localStorage.getItem("authIdentifier") ||
          localStorage.getItem("email");

        if (!identifier) return;

        const response = await getProfile(identifier);
        setUser(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="pb-32 bg-surface min-h-screen">
      <TopAppBar />

      <main className="pt-24 px-6 max-w-2xl mx-auto">
        {/* QR Code Section */}

        <section className="flex flex-col items-center justify-center text-center py-8">
          <div className="relative p-8 bg-surface-container-lowest rounded-3xl shadow-[0_32px_48px_rgba(0,106,100,0.06)] border border-outline-variant/15">
            <div className="bg-gradient-to-br from-primary to-primary-container p-1 rounded-2xl">
              <div className="bg-white p-5 rounded-[calc(1rem-4px)]">
                {user ? (
                  <img
                    src={`http://localhost:8081/api/qr/${user.id}`}
                    alt="Health QR Code"
                    className="w-[220px] h-[220px]"
                  />
                ) : (
                  <p>Loading QR...</p>
                )}
              </div>
            </div>

            <div className="mt-8 space-y-2">
              <p className="text-xs font-bold tracking-widest text-on-surface-variant uppercase">
                Health ID
              </p>

              <h2 className="text-2xl font-extrabold tracking-tight text-teal-800 font-headline">
                {user ? `HV-${user.id}` : ""}
              </h2>
            </div>
          </div>

          <p className="mt-6 text-on-surface-variant text-sm max-w-xs leading-relaxed">
            Ask your doctor to scan this QR code to securely access your medical
            records.
          </p>
        </section>

        {/* Future Feature */}

        <section className="mt-12">
          <h3 className="text-xl font-bold text-on-surface font-headline mb-6">
            Recent Access
          </h3>

          <div className="bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant/15 text-center">
            <span className="material-symbols-outlined text-5xl text-primary mb-4">
              history
            </span>

            <h4 className="font-bold text-lg mb-2">
              No Access History
            </h4>

            <p className="text-sm text-on-surface-variant">
              Doctors who scan your QR code will appear here in a future update.
            </p>
          </div>
        </section>
      </main>

      <BottomNavBar activeTab="access" />
    </div>
  );
}