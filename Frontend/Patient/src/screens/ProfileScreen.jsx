import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TopAppBar from '../components/TopAppBar';
import BottomNavBar from '../components/BottomNavBar';
import { getProfile, updateProfile } from "../services/profileService";

const formatDateForInput = (dateValue) => {
  if (!dateValue) {
    return "";
  }

  const parsed = new Date(dateValue);

  if (Number.isNaN(parsed.getTime())) {
    return "";
  }

  return parsed.toISOString().split("T")[0];
};

const getProfileSaveMessage = (error) => {
  const data = error?.response?.data;

  if (typeof data === "string" && data.trim()) {
    return data;
  }

  if (data && typeof data === "object") {
    if (typeof data.message === "string" && data.message.trim()) {
      return data.message;
    }

    if (typeof data.error === "string" && data.error.trim()) {
      return data.error;
    }
  }

  return "Unable to save profile. Please try again.";
};

export default function ProfileScreen() {
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState("");
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
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    dateOfBirth: "",
    gender: "",
    bloodGroup: "",
    address: "",
  });

  const applyUserToForm = (profile) => {
    setFormData({
      fullName: profile?.fullName || "",
      dateOfBirth: formatDateForInput(profile?.dateOfBirth),
      gender: profile?.gender || "",
      bloodGroup: profile?.bloodGroup || "",
      address: profile?.address || "",
    });
  };

useEffect(() => {
  const fetchProfile = async () => {
    try {
      const currentIdentifier = localStorage.getItem("authIdentifier") || localStorage.getItem("email");

      if (!currentIdentifier) {
        setLoading(false);
        return;
      }

      setIdentifier(currentIdentifier);

      const response = await getProfile(currentIdentifier);
      setUser(response.data);
      applyUserToForm(response.data);
      localStorage.setItem("profile", JSON.stringify(response.data));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  fetchProfile();
}, []);

  const handleFieldChange = (field, value) => {
    setFormData((previous) => ({ ...previous, [field]: value }));
  };

  const handleSaveProfile = async () => {
    if (!identifier) {
      alert("Please login again.");
      return;
    }

    setIsSaving(true);

    try {
      const payload = {
        fullName: formData.fullName,
        dateOfBirth: formData.dateOfBirth || null,
        gender: formData.gender || null,
        bloodGroup: formData.bloodGroup || null,
        address: formData.address || null,
      };

      const response = await updateProfile(identifier, payload);

      setUser(response.data);
      applyUserToForm(response.data);
      localStorage.setItem("profile", JSON.stringify(response.data));

      alert("Profile updated successfully.");
    } catch (error) {
      alert(getProfileSaveMessage(error));
    } finally {
      setIsSaving(false);
    }
  };

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
                value={formData.fullName}
                onChange={(event) => handleFieldChange('fullName', event.target.value)}
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
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-outline">Date of Birth</label>
              <input 
                className="w-full bg-surface-container-low border-none rounded-lg p-3" 
                value={formData.dateOfBirth}
                onChange={(event) => handleFieldChange('dateOfBirth', event.target.value)}
                type="date" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-outline">Blood Group</label>
              <select
                className="w-full bg-surface-container-low border-none rounded-lg p-3"
                value={formData.bloodGroup}
                onChange={(event) => handleFieldChange('bloodGroup', event.target.value)}
              >
                <option value="">Select blood group</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-outline">Gender</label>
              <div className="grid grid-cols-3 gap-2">
                {['Male', 'Female', 'Other'].map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => handleFieldChange('gender', option)}
                    className={`px-4 py-3 rounded-xl border text-sm font-semibold transition-all ${
                      formData.gender === option
                        ? 'bg-primary text-on-primary border-primary shadow-lg shadow-primary/10'
                        : 'bg-surface-container-highest text-on-surface-variant border-transparent hover:border-primary/20'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-outline">Address</label>
              <textarea
                className="w-full bg-surface-container-low border-none rounded-lg p-3 min-h-[92px]"
                value={formData.address}
                onChange={(event) => handleFieldChange('address', event.target.value)}
                placeholder="Enter address"
              />
            </div>
          </div>
          <button
            type="button"
            onClick={handleSaveProfile}
            disabled={loading || isSaving}
            className="w-full md:w-auto px-8 py-3 bg-primary text-on-primary font-semibold rounded-lg shadow-lg shadow-primary/10 transition-all hover:translate-y-[-1px] active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSaving ? 'Saving...' : 'Save Profile'}
          </button>
        </section>

        {/* Actions */}
        <section className="space-y-4">
          <div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm">
            <button 
              onClick={() => {
                localStorage.removeItem("authIdentifier");
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
