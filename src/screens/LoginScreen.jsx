import { useNavigate } from 'react-router-dom';

export default function LoginScreen() {
  const navigate = useNavigate();

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
                  style={{fontVariationSettings: "'FILL' 1"}}
                >
                  health_and_safety
                </span>
              </div>
              <h1 className="font-headline font-black text-4xl tracking-tight text-teal-800 mb-2">HVault</h1>
              <p className="text-on-surface-variant font-medium text-sm leading-relaxed">Your secure clinical sanctuary for medical records and health insights.</p>
            </div>

            <div className="px-10 pb-12 space-y-6">
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant ml-1">Mobile Number or Email</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
                    <span className="material-symbols-outlined text-xl">person_pin</span>
                  </div>
                  <input 
                    className="w-full pl-12 pr-4 py-4 bg-surface-container-highest border-none rounded-xl text-on-surface focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-slate-400 font-medium" 
                    placeholder="Enter details..." 
                    type="text"
                  />
                  <button className="absolute inset-y-2 right-2 px-4 bg-secondary-container text-on-secondary-container rounded-lg text-xs font-bold transition-all hover:bg-secondary-fixed-dim active:scale-95">Send OTP</button>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center px-1">
                  <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant">One-Time Password</label>
                  <span className="text-[11px] font-semibold text-primary/60">0:59 remaining</span>
                </div>
                <div className="flex gap-3 justify-between">
                  {[1, 2, 3, 4, 5, 6].map(i => (
                    <input 
                      key={i}
                      className="w-full aspect-square text-center text-xl font-bold bg-surface-container-highest rounded-xl border-none focus:ring-2 focus:ring-primary/20" 
                      maxLength="1" 
                      type="text" 
                    />
                  ))}
                </div>
              </div>

              <div className="pt-4 space-y-4">
                <button 
                  onClick={() => navigate('/dashboard')} 
                  className="w-full py-4 bg-primary text-on-primary font-headline font-bold text-lg rounded-xl shadow-lg shadow-primary/10 transition-all hover:translate-y-[-2px] active:scale-95 active:translate-y-0"
                >
                  Login
                </button>
                <div className="flex items-center justify-center gap-2 pt-2">
                  <span className="text-on-surface-variant text-sm font-medium">New user?</span>
                  <a className="text-primary font-bold text-sm hover:underline underline-offset-4" href="#">Register</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
