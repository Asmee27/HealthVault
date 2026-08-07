import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../services/authService";

export default function DoctorRegister() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobileNumber: "",
    password: "",
    confirmPassword: "",
    gender: "",
    dateOfBirth: "",
    bloodGroup: "",
    licenseId: "",
  });

  const updateField = (field, value) => {
    setFormData((previous) => ({ ...previous, [field]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        fullName: formData.fullName,
        email: formData.email,
        mobileNumber: formData.mobileNumber,
        password: formData.password,
        gender: formData.gender,
        dateOfBirth: formData.dateOfBirth,
        bloodGroup: formData.bloodGroup,
        licenseId: formData.licenseId,
        signatureName: formData.signatureName,
        role: "DOCTOR", // Set the role to DOCTOR for doctor registration
      };

      const response = await register(payload);
      alert(response.data?.message || "Registration successful");
      navigate("/", { replace: true });
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col relative overflow-hidden">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -right-[10%] w-[60%] h-[60%] bg-secondary-container/20 rounded-full blur-[120px]"></div>
        <div className="absolute top-[60%] -left-[5%] w-[40%] h-[40%] bg-primary-container/10 rounded-full blur-[100px]"></div>
      </div>

      <main className="flex-grow flex items-center justify-center p-6 relative z-10">
        <div className="w-full max-w-2xl">
          <div className="bg-surface-container-lowest rounded-[2rem] shadow-[0_32px_64px_-12px_rgba(0,106,100,0.08)] overflow-hidden">
            <div className="pt-12 pb-8 px-10 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-container/10 rounded-2xl mb-6">
                <span
                  className="material-symbols-outlined text-primary text-4xl"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  person_add
                </span>
              </div>
              <h1 className="font-headline font-black text-4xl tracking-tight text-teal-800 mb-2">
                Create Account
              </h1>
              <p className="text-on-surface-variant font-medium text-sm leading-relaxed max-w-xl mx-auto">
                Join HVault to securely manage your medical records, reports,
                and access permissions.
              </p>
            </div>

            <form
              className="px-6 md:px-10 pb-12 space-y-6"
              onSubmit={handleSubmit}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Field
                  label="Full Name"
                  value={formData.fullName}
                  onChange={(value) => updateField("fullName", value)}
                  placeholder="Enter full name"
                  icon="badge"
                />
                <Field
                  label="Email Address"
                  type="email"
                  value={formData.email}
                  onChange={(value) => updateField("email", value)}
                  placeholder="Enter email"
                  icon="mail"
                />
                <Field
                  label="Medical License ID"
                  value={formData.licenseId}
                  onChange={(value) => updateField("licenseId", value)}
                  placeholder="Enter License ID"
                  icon="badge"
                />
                <Field
                  label="Mobile Number"
                  type="tel"
                  value={formData.mobileNumber}
                  onChange={(value) => updateField("mobileNumber", value)}
                  placeholder="Enter mobile number"
                  icon="call"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <PasswordField
                  label="Password"
                  value={formData.password}
                  onChange={(value) => updateField("password", value)}
                  showPassword={showPassword}
                  onToggle={() => setShowPassword((previous) => !previous)}
                  placeholder="Create password"
                />
                <PasswordField
                  label="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={(value) => updateField("confirmPassword", value)}
                  showPassword={showConfirmPassword}
                  onToggle={() =>
                    setShowConfirmPassword((previous) => !previous)
                  }
                  placeholder="Confirm password"
                />

                <Field
                  label="Digital Signature Name"
                  value={formData.signatureName}
                  onChange={(value) => updateField("signatureName", value)}
                  placeholder="Enter your signature name"
                  icon="draw"
                />
              </div>

              <div className="pt-2 space-y-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-primary text-on-primary font-headline font-bold text-lg rounded-xl shadow-lg shadow-primary/10 transition-all hover:translate-y-[-2px] active:scale-95 active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Creating Account..." : "Register"}
                </button>

                <div className="flex items-center justify-center gap-2 pt-2">
                  <span className="text-on-surface-variant text-sm font-medium">
                    Already have an account?
                  </span>
                  <button
                    type="button"
                    onClick={() => navigate("/login")}
                    className="text-primary font-bold text-sm hover:underline underline-offset-4"
                  >
                    Login
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

function Field({ label, type = "text", value, onChange, placeholder, icon }) {
  return (
    <div className="space-y-2">
      <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant ml-1">
        {label}
      </label>
      <div className="relative group">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
          <span className="material-symbols-outlined text-xl">{icon}</span>
        </div>
        <input
          type={type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="w-full pl-12 pr-4 py-4 bg-surface-container-highest border-none rounded-xl text-on-surface focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-slate-400 font-medium"
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}

function PasswordField({
  label,
  value,
  onChange,
  showPassword,
  onToggle,
  placeholder,
}) {
  return (
    <div className="space-y-2">
      <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant ml-1">
        {label}
      </label>
      <div className="relative group">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
          <span className="material-symbols-outlined text-xl">lock</span>
        </div>
        <input
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className="w-full pl-12 pr-14 py-4 bg-surface-container-highest border-none rounded-xl text-on-surface focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-slate-400 font-medium"
        />
        <button
          type="button"
          onClick={onToggle}
          className="absolute inset-y-0 right-4 flex items-center text-slate-400 hover:text-primary transition-colors"
        >
          <span className="material-symbols-outlined">
            {showPassword ? "visibility_off" : "visibility"}
          </span>
        </button>
      </div>
    </div>
  );
}
