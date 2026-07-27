import { useNavigate } from 'react-router-dom';

export default function PatientRecords() {
  const navigate = useNavigate();

  return (
    <div className="bg-surface font-body text-on-surface antialiased min-h-screen">
      <header className="fixed top-0 w-full z-50 glass-header flex items-center justify-between px-6 py-4 shadow-sm shadow-teal-900/5">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/')} className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-slate-200/50 transition-colors">
            <span className="material-symbols-outlined text-teal-700">arrow_back</span>
          </button>
          <h1 className="font-headline font-bold text-slate-900 text-xl">Patient Records</h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary-container">
            <img alt="Doctor Profile" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBCZ1FHCXz5RCjDRsmpkCrv7JsxU2saamqGl5C2h6s9f_CcterGeFwq3KsZL716yiP2PNfhGyrPT6hIfQicCUSxjAyt4r8ZKPOhp8fbG_rpI62l2P38KmXeS_UCIeDGM01QrBzh0YezZEMPj2_ZAXkt8rrioKf-VJNs5w8F2XlJmk1-HhvM1kJSg6cEW2GPeg_vvgdYNFpXSByj6fvAFenhkXtLeSORhGIF2-jdhqqdlDui0PAdzIyDN8yZMf2VaD0gZLNlybRuMp4" />
          </div>
        </div>
      </header>

      <main className="min-h-screen pt-24 pb-12 px-6 flex items-center justify-center bg-slate-100/50">
        <div className="w-full max-w-lg bg-surface-container-lowest rounded-[2rem] shadow-2xl shadow-teal-950/10 overflow-hidden relative border border-outline-variant/10">
          <div className="bg-gradient-to-br from-primary to-primary-container p-8 text-on-primary">
            <div className="flex items-center justify-between mb-6">
              <div className="bg-white/20 backdrop-blur-md rounded-full px-4 py-1 flex items-center gap-2">
                <span className="material-symbols-outlined text-sm" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span>
                <span className="text-xs font-semibold tracking-wide uppercase">Scan Successful</span>
              </div>
              <span className="material-symbols-outlined opacity-60">qr_code_scanner</span>
            </div>
            <div className="flex items-end justify-between">
              <div>
                <h2 className="font-headline text-3xl font-extrabold tracking-tight mb-1">Alexander Chen</h2>
                <p className="text-on-primary/80 text-sm font-medium">ID: #882-901 • DOB: 12/05/1984</p>
              </div>
              <div className="bg-surface-container-lowest text-primary rounded-2xl p-4 text-center min-w-[80px]">
                <p className="text-[10px] uppercase font-bold tracking-widest mb-1 opacity-60">Blood</p>
                <p className="font-headline text-2xl font-black">O+</p>
              </div>
            </div>
          </div>

          <div className="p-8 space-y-8">
            <section>
              <div className="flex items-center gap-2 mb-4 text-error font-semibold">
                <span className="material-symbols-outlined">warning</span>
                <h3 className="font-headline text-sm uppercase tracking-wider">Critical Allergies</h3>
              </div>
              <div className="bg-error-container/30 rounded-2xl p-5 border border-error/10 flex flex-wrap gap-2">
                <span className="bg-error text-on-error px-4 py-1.5 rounded-full text-sm font-medium shadow-sm">Penicillin</span>
                <span className="bg-error text-on-error px-4 py-1.5 rounded-full text-sm font-medium shadow-sm">Peanuts</span>
                <span className="bg-error/10 text-error px-4 py-1.5 rounded-full text-sm font-medium italic border border-error/20">Latex (Potential)</span>
              </div>
            </section>

            <div className="bg-surface-container-low rounded-2xl p-6 relative overflow-hidden">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-primary" style={{fontVariationSettings: "'FILL' 1"}}>lock</span>
                </div>
                <div>
                  <p className="font-semibold text-slate-800 mb-1">Privacy Protection Active</p>
                  <p className="text-sm text-slate-500 leading-relaxed">Access requested to view full clinical history, medication logs, and lab results for this patient.</p>
                </div>
              </div>
              <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-primary/5 rounded-full blur-2xl"></div>
            </div>

            <div className="space-y-3">
              <button onClick={() => navigate('/patient-overview')} className="w-full py-4 px-6 bg-primary text-on-primary rounded-xl font-headline font-bold text-lg shadow-lg shadow-primary/20 hover:bg-primary-container transition-all active:scale-[0.98] flex items-center justify-center gap-3">
                Request Access
                <span className="material-symbols-outlined">key</span>
              </button>
              <button onClick={() => navigate('/')} className="w-full py-4 px-6 text-slate-500 font-semibold hover:bg-slate-100 rounded-xl transition-colors">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
