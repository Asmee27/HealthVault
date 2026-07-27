import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TopAppBar from '../components/TopAppBar';
import BottomNavBar from '../components/BottomNavBar';
import { getProfile } from "../services/profileService";

export default function ProfileScreen() {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => {
    const cachedProfile = localStorage.getItem("profile");

    if (!cachedProfile) {
      return null;
    }

    try {
      return JSON.parse(cachedProfile);
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(!user);

useEffect(() => {
  const fetchProfile = async () => {
    try {
      const email = localStorage.getItem("email");

      if (!email) {
        setLoading(false);
        return;
      }

      const response = await getProfile(email);
      setUser(response.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  fetchProfile();
}, []);

  return (
    <div className="pb-32 bg-surface min-h-screen">
      <TopAppBar />
      <main className="max-w-2xl mx-auto px-6 pt-24 space-y-12">
        {/* Profile Header */}
        <section className="flex flex-col items-center text-center space-y-4">
          <div className="relative group">
            <div className="w-32 h-32 rounded-xl overflow-hidden shadow-lg border-4 border-surface-container-lowest">
              <img 
                alt="User" 
                className="w-full h-full object-cover" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBvo7WI5uebJwo82aSvW8Ax4FRtCdXY_Eezp0LVhDniaPaVmRGroQDmJMAvr2AA8ZJudOAsf141fcxjQXHdPZH4X9P5csgD93ZDbFNfRuppS_-Kfr0_hRs5lksQ5n4d8EFrHKezppiagfN26hzjCRkfYU_inyz7Pq1Wjc--mFCVT9HMx9qOcNf3JkqlL9w9UtqzSPx3_iKiOOxgFa0E2H0EuWkij-xAIVcKVfhW4hxsKdfXE7h0SuM1HbUizcJwIsPo-oIyrD-eKFc"
              />
            </div>
            <button className="absolute bottom-[-10px] right-[-10px] bg-primary text-on-primary p-2 rounded-lg shadow-md hover:scale-105 active:scale-95 transition-all">
              <span className="material-symbols-outlined text-sm">edit</span>
            </button>
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-on-surface tracking-tight">
              {loading ? "Loading profile..." : user?.fullName || "Profile unavailable"}
            </h1>
            <p className="text-on-surface-variant font-medium">
              {user?.id ? `Patient ID: HV-${user.id}` : "Patient profile"}
            </p>
          </div>
        </section>

        {/* Personal Information */}
        <section className="bg-surface-container-lowest p-8 rounded-xl shadow-sm space-y-6">
          <h2 className="text-xl font-bold text-primary flex items-center gap-2">
            <span className="material-symbols-outlined">person</span> Personal Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-outline">Full Name</label>
              <input 
                className="w-full bg-surface-container-low border-none rounded-lg p-3" 
                value={user?.fullName || ""}
readOnly 
                type="text" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-outline">Email Address</label>
              <input 
                className="w-full bg-surface-container-low border-none rounded-lg p-3" 
                value={user?.email || ""}
readOnly
                type="email" 
              />
            </div>
          </div>
        </section>

        {/* Actions */}
        <section className="space-y-4">
          <div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm">
            <button 
              onClick={() => {
                localStorage.removeItem("email");
                localStorage.removeItem("profile");
                navigate('/login');
              }} 
              className="w-full flex items-center justify-between px-6 py-4 hover:bg-error-container/20 transition-colors group text-error"
            >
              <div className="flex items-center gap-4">
                <span className="material-symbols-outlined">logout</span>
                <span className="font-medium">Logout</span>
              </div>
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </section>
      </main>
      <BottomNavBar activeTab="profile" />
    </div>
  );
}
