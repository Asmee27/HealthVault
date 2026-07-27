import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { login } from "../services/authService";

export default function LoginScreen() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen bg-surface flex flex-col relative overflow-hidden">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -right-[10%] w-[60%] h-[60%] bg-secondary-container/20 rounded-full blur-[120px]"></div>
        <div className="absolute top-[60%] -left-[5%] w-[40%] h-[40%] bg-primary-container/10 rounded-full blur-[100px]"></div>
      </div>

      <main className="flex-grow flex items-center justify-center p-6 relative z-10">
        <div className="w-full max-w-md">
          <div className="bg-surface-container-lowest rounded-[2rem] shadow-[0_32px_64px_-12px_rgba(0,106,100,0.08)] overflow-hidden">
            <div className="pt-12 pb-8 px-10 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-container/10 rounded-2xl mb-6">
                <span
                  className="material-symbols-outlined text-primary text-4xl"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  health_and_safety
                </span>
              </div>
              <h1 className="font-headline font-black text-4xl tracking-tight text-teal-800 mb-2">
                HVault
              </h1>
              <p className="text-on-surface-variant font-medium text-sm leading-relaxed">
                Your secure clinical sanctuary for medical records and health
                insights.
              </p>
            </div>

            <div className="px-10 pb-12 space-y-6">
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant ml-1">
                  Mobile Number or Email
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
                    <span className="material-symbols-outlined text-xl">
                      person_pin
                    </span>
                  </div>
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-surface-container-highest border-none rounded-xl text-on-surface focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-slate-400 font-medium"
                    placeholder="Enter details..."
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant ml-1">
                  Password
                </label>

                <div className="relative group">
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
                    <span className="material-symbols-outlined text-xl">
                      lock
                    </span>
                  </div>

                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    className="w-full pl-12 pr-14 py-4 bg-surface-container-highest border-none rounded-xl text-on-surface focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-slate-400 font-medium"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-4 flex items-center text-slate-400 hover:text-primary transition-colors"
                  >
                    <span className="material-symbols-outlined">
                      {showPassword ? "visibility_off" : "visibility"}
                    </span>
                  </button>
                </div>
              </div>

              <div className="pt-4 space-y-4">
                <button
                  onClick={async () => {
                    try {
                      const response = await login(email, password);

                      const profile = {
                        id: response.data.id,
                        fullName: response.data.fullName,
                        email: response.data.email,
                        mobileNumber: response.data.mobileNumber,
                        role: response.data.role,
                      };

                      localStorage.setItem("email", response.data.email || email);
                      localStorage.setItem("profile", JSON.stringify(profile));

                      alert(response.data.message);

                      navigate("/profile", { replace: true });
                    } catch (error) {
                      alert(error.response?.data || "Login Failed");
                    }
                  }}
                  className="w-full py-4 bg-primary text-on-primary font-headline font-bold text-lg rounded-xl shadow-lg shadow-primary/10 transition-all hover:translate-y-[-2px] active:scale-95 active:translate-y-0"
                >
                  Login
                </button>
                <div className="flex items-center justify-center gap-2 pt-2">
                  <span className="text-on-surface-variant text-sm font-medium">
                    New user?
                  </span>
                    <button
                      type="button"
                      onClick={() => navigate('/register')}
                      className="text-primary font-bold text-sm hover:underline underline-offset-4"
                    >
                    Register
                    </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
