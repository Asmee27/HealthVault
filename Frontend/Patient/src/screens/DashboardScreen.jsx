import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TopAppBar from "../components/TopAppBar";
import BottomNavBar from "../components/BottomNavBar";
import { getProfile } from "../services/profileService";

export default function DashboardScreen() {
  const navigate = useNavigate();

  const [user, setUser] = useState(() => {
    const cachedProfile = localStorage.getItem("profile");

    if (!cachedProfile) return null;

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
        const identifier =
          localStorage.getItem("authIdentifier") ||
          localStorage.getItem("email");

        if (!identifier) {
          setLoading(false);
          return;
        }

        const response = await getProfile(identifier);

        setUser(response.data);

        localStorage.setItem("profile", JSON.stringify(response.data));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const quickActions = [
    {
      icon: "cloud_upload",
      label: "Upload Report",
      color: "bg-secondary-container/30",
      text: "text-secondary",
      path: "/upload",
    },
    {
      icon: "description",
      label: "View Records",
      color: "bg-primary-fixed/30",
      text: "text-primary",
      path: "/records",
    },
    {
      icon: "key",
      label: "Manage Access",
      color: "bg-tertiary-fixed/40",
      text: "text-on-tertiary-fixed-variant",
      path: "/access",
    },
    {
      icon: "medication",
      label: "Prescriptions",
      color: "bg-secondary-fixed/40",
      text: "text-on-secondary-fixed-variant",
      path: "/prescriptions",
    },
    
  ];

  const calculateAge = (dob) => {
    if (!dob) return "--";

    const birthDate = new Date(dob);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();

    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };

  return (
    <div className="pb-32 bg-surface">
      <TopAppBar />
      <main className="mt-20 px-6 max-w-5xl mx-auto">
        {/* Patient Profile Card */}
        <section className="mb-8">
          <div className="relative overflow-hidden bg-gradient-to-br from-primary to-primary-container rounded-[2rem] p-8 text-on-primary clinical-shadow">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
            <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-semibold tracking-wider uppercase mb-3">
                  Patient Profile
                </span>
                <h1 className="font-headline font-extrabold text-3xl md:text-4xl mb-1">
                  {loading ? "Loading..." : user?.fullName}
                </h1>
                <p className="text-white/80 font-medium tracking-wide">
                  {user?.id ? `Health ID: HV-${user.id}` : ""}
                </p>
              </div>
              <div className="flex gap-4">
                <div className="bg-white/15 backdrop-blur-md rounded-2xl p-4 min-w-[100px] border border-white/10 text-center">
                  <p className="text-[10px] uppercase tracking-widest text-white/70 mb-1">
                    Blood Group
                  </p>
                  <p className="text-2xl font-black">
                    {loading ? "--" : user?.bloodGroup || "--"}
                  </p>
                </div>
                <div className="bg-white/15 backdrop-blur-md rounded-2xl p-4 min-w-[100px] border border-white/10 text-center">
                  <p className="text-[10px] uppercase tracking-widest text-white/70 mb-1">
                    Age
                  </p>
                  <p className="text-2xl font-black">
                    {loading ? "--" : calculateAge(user?.dateOfBirth)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="mb-10">
          <h2 className="font-headline font-bold text-xl text-on-surface-variant mb-6 px-1">
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((act, idx) => (
              <div
                key={idx}
                onClick={() => navigate(act.path)}
                className="group bg-surface-container-lowest p-6 rounded-xl clinical-shadow border border-outline-variant/10 hover:bg-primary/5 cursor-pointer transition-all duration-300 flex flex-col items-start gap-4"
              >
                <div
                  className={`w-12 h-12 rounded-2xl ${act.color} ${act.text} flex items-center justify-center group-hover:scale-110 transition-transform`}
                >
                  <span className="material-symbols-outlined text-2xl">
                    {act.icon}
                  </span>
                </div>
                <span className="font-headline font-bold text-primary tracking-tight leading-tight">
                  {act.label}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Emergency Information */}
        <section className="mb-12">
          <div className="bg-surface-container-lowest rounded-[1.75rem] p-8 border border-error/5 clinical-shadow">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-full bg-error/10 text-error flex items-center justify-center">
                <span
                  className="material-symbols-outlined"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  emergency
                </span>
              </div>
              <h2 className="font-headline font-extrabold text-xl text-error tracking-tight">
                Emergency Information
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-4">
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-on-surface-variant/60">
                  Known Allergies
                </h3>
                <div className="flex flex-wrap gap-2">
                  <span className="px-4 py-2 bg-error-container text-on-error-container rounded-full text-sm font-semibold">
                    Penicillin
                  </span>
                  <span className="px-4 py-2 bg-error-container text-on-error-container rounded-full text-sm font-semibold">
                    Peanuts
                  </span>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-on-surface-variant/60">
                  Current Medications
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-secondary text-lg mt-0.5">
                      pill
                    </span>
                    <div>
                      <p className="font-bold text-sm leading-none">
                        Lisinopril 10mg
                      </p>
                      <p className="text-xs text-on-surface-variant mt-1">
                        Once daily in the morning
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-on-surface-variant/60">
                  Emergency Contact
                </h3>
                <div className="bg-surface-container-low p-4 rounded-2xl">
                  <p className="font-bold text-primary">Dr. Robert Mitchell</p>
                  <p className="text-xs text-on-surface-variant mt-1">
                    Spouse • cardiologist
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Classy Floating AI Assistant Button */}
      <button
        type="button"
        onClick={() => navigate("/ai-health")}
        className="fixed bottom-24 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#00897B] text-white shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl active:scale-95"
        aria-label="Open AI health assistant"
      >
        <span className="material-symbols-outlined text-[28px]">
          auto_awesome
        </span>
      </button>

      <BottomNavBar activeTab="dashboard" />
    </div>
  );
}