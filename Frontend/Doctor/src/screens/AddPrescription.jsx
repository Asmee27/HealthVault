import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import MobileNav from '../components/MobileNav';
import HistoryCard from '../components/HistoryCard';

export default function AddPrescription() {
  const navigate = useNavigate();
  
  const patient = {
    name: "Alexander Chen",
    id: "#882-901",
    dob: "12/05/1984",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDhtrPjzpBE67VDG5bkPZBcEVT09x63zCVj5X5gd0AwpbMbm85YD2Fp8OnNLGidczPgARvzXvr0o-_TrrUzGp17HiGoaL9j0kUW1mAd7zlYu_xIsmee723yyb43EQ4LOW_oDvttNBjFByiroiJ5Hsw7clBDTNrOxl8Cu_0rwwxOKkvzGBXaz711yvj6gCcGFrGn7ilHuoBousyQ7vvZDDAs2xcNNOJa0RAOaAGwNIOh7RpCQ1-LeieuyaewrvyQl9khvY7Xd5JFX3A"
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/patient-overview');
  };

  return (
    <div className="bg-surface font-body text-on-surface min-h-screen">
      <header className="fixed top-0 w-full z-50 bg-slate-50/80 dark:bg-slate-900/80 backdrop-blur-md shadow-sm shadow-teal-900/5 flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/patient-overview')} className="hover:bg-slate-200/50 dark:hover:bg-slate-800/50 transition-colors p-2 rounded-full">
            <span className="material-symbols-outlined text-teal-700 dark:text-teal-400">arrow_back</span>
          </button>
          <h1 className="font-headline font-bold text-slate-900 dark:text-slate-100 text-xl">Patient Records</h1>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden md:block text-sm font-medium text-slate-600 dark:text-slate-400">Dr. Sarah Jenkins</span>
          <img alt="Doctor Profile" className="w-10 h-10 rounded-full border-2 border-primary-container" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBCZ1FHCXz5RCjDRsmpkCrv7JsxU2saamqGl5C2h6s9f_CcterGeFwq3KsZL716yiP2PNfhGyrPT6hIfQicCUSxjAyt4r8ZKPOhp8fbG_rpI62l2P38KmXeS_UCIeDGM01QrBzh0YezZEMPj2_ZAXkt8rrioKf-VJNs5w8F2XlJmk1-HhvM1kJSg6cEW2GPeg_vvgdYNFpXSByj6fvAFenhkXtLeSORhGIF2-jdhqqdlDui0PAdzIyDN8yZMf2VaD0gZLNlybRuMp4" />
        </div>
      </header>

      <Sidebar activePatient={patient} />

      <main className="lg:ml-72 pt-24 px-4 md:px-8 pb-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          {/* Recent History Section */}
          <div className="xl:col-span-5 space-y-6">
            <header className="flex items-center justify-between">
              <div>
                <h3 className="font-headline text-2xl text-on-surface font-bold">Recent History</h3>
                <p className="text-on-surface-variant text-sm">Review past clinical observations</p>
              </div>
            </header>
            <div className="space-y-4">
              <HistoryCard 
                type="Infection" 
                color="bg-secondary-container text-on-secondary-container" 
                date="Oct 14, 2023" 
                title="Seasonal Influenza" 
                desc="Patient presented with high fever, body aches, and persistent dry cough for 3 days." 
                extra="Oseltamivir 75mg • 5 Days" 
                extraIcon="medication" 
              />
              <HistoryCard 
                type="Routine" 
                color="bg-tertiary-container text-white" 
                date="Aug 22, 2023" 
                title="Annual Physical" 
                desc="Overall health stable. Recommended increase in Vitamin D intake and regular cardiovascular exercise." 
                extra="BP: 120/82 • BMI: 24.1" 
                extraIcon="monitoring" 
              />
              <HistoryCard 
                type="Allergy" 
                color="bg-error-container text-on-error-container" 
                date="May 10, 2023" 
                title="Allergic Rhinitis" 
                desc="Severe reaction to pollen. Prescribed antihistamines and nasal spray." 
                extra="Cetirizine 10mg • 30 Days" 
                extraIcon="medication" 
                opacity="opacity-75" 
              />
            </div>
          </div>

          {/* Prescription Form Section */}
          <div className="xl:col-span-7">
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-xl shadow-teal-950/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
              
              <header className="relative mb-10">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 bg-primary-container/20 rounded-2xl flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary text-3xl">add_notes</span>
                  </div>
                  <h2 className="font-headline text-3xl font-bold text-on-surface tracking-tight">New Prescription</h2>
                </div>
                <p className="text-on-surface-variant">Fill in the details to record a new clinical entry for Alexander Chen.</p>
              </header>

              <form className="space-y-8 relative" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-on-surface-variant ml-1">Doctor Name</label>
                    <div className="relative group">
                      <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">person</span>
                      <input 
                        className="w-full pl-12 pr-4 py-4 bg-surface-container-low border-transparent rounded-xl font-medium text-on-surface focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all" 
                        readOnly 
                        type="text" 
                        defaultValue="Dr. Sarah Jenkins"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-on-surface-variant ml-1">Specialization</label>
                    <div className="relative group">
                      <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">medical_services</span>
                      <input 
                        className="w-full pl-12 pr-4 py-4 bg-surface-container-low border-transparent rounded-xl font-medium text-on-surface focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all" 
                        readOnly 
                        type="text" 
                        defaultValue="General Practitioner"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-on-surface-variant ml-1">Issue / Diagnosis</label>
                  <textarea 
                    className="w-full px-5 py-4 bg-surface-container-lowest border-outline-variant/30 rounded-2xl font-body text-on-surface focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all placeholder:text-slate-400" 
                    placeholder="Describe the patient's symptoms and primary diagnosis..." 
                    rows="4"
                  ></textarea>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between px-1">
                    <label className="text-sm font-semibold text-on-surface-variant">Medicines & Dosage</label>
                    <button className="text-xs font-bold text-primary flex items-center gap-1 hover:underline" type="button">
                      <span className="material-symbols-outlined text-base">add</span>
                      Add Another
                    </button>
                  </div>
                  <div className="space-y-3">
                    <div className="grid grid-cols-12 gap-3 items-center">
                      <div className="col-span-12 md:col-span-7">
                        <input 
                          className="w-full px-5 py-4 bg-surface-container-lowest border-outline-variant/30 rounded-xl text-sm focus:ring-primary/5 focus:border-primary transition-all" 
                          placeholder="Medicine Name (e.g. Amoxicillin)" 
                          type="text"
                        />
                      </div>
                      <div className="col-span-8 md:col-span-4">
                        <input 
                          className="w-full px-5 py-4 bg-surface-container-lowest border-outline-variant/30 rounded-xl text-sm focus:ring-primary/5 focus:border-primary transition-all" 
                          placeholder="Dosage (e.g. 500mg)" 
                          type="text"
                        />
                      </div>
                      <div className="col-span-4 md:col-span-1 flex justify-center">
                        <button className="text-slate-400 hover:text-error transition-colors" type="button">
                          <span className="material-symbols-outlined">delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-on-surface-variant ml-1">Duration</label>
                    <div className="relative group">
                      <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">calendar_today</span>
                      <select className="w-full pl-12 pr-4 py-4 bg-surface-container-lowest border-outline-variant/30 rounded-xl text-sm appearance-none focus:ring-primary/5 focus:border-primary">
                        <option>3 Days</option>
                        <option>5 Days</option>
                        <option defaultValue>7 Days</option>
                        <option>14 Days</option>
                        <option>30 Days</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-on-surface-variant ml-1">Frequency</label>
                    <div className="relative group">
                      <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">schedule</span>
                      <select className="w-full pl-12 pr-4 py-4 bg-surface-container-lowest border-outline-variant/30 rounded-xl text-sm appearance-none focus:ring-primary/5 focus:border-primary">
                        <option>Once daily</option>
                        <option>Twice daily</option>
                        <option defaultValue>Three times daily</option>
                        <option>Every 6 hours</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="pt-6 flex flex-col md:flex-row gap-4">
                  <button 
                    className="flex-1 bg-primary text-on-primary font-headline font-bold py-4 rounded-xl shadow-lg shadow-primary/20 hover:bg-primary-container transition-all active:scale-[0.98]" 
                    type="submit"
                  >
                    Save Prescription
                  </button>
                  <button 
                    className="px-8 py-4 bg-surface-container text-on-surface-variant font-headline font-bold rounded-xl hover:bg-surface-container-highest transition-all" 
                    type="button" 
                    onClick={() => navigate('/patient-overview')}
                  >
                    Save as Draft
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>

      <button onClick={() => navigate('/add-prescription')} className="fixed bottom-8 right-8 w-16 h-16 bg-primary text-on-primary rounded-2xl shadow-2xl flex items-center justify-center group transition-all hover:w-48 hover:rounded-xl active:scale-95 z-50 overflow-hidden md:hidden">
        <div className="flex items-center gap-2 px-4 whitespace-nowrap">
          <span className="material-symbols-outlined text-3xl">add</span>
          <span className="font-headline font-bold hidden group-hover:block transition-all opacity-0 group-hover:opacity-100">Add Prescription</span>
        </div>
      </button>

      <MobileNav />
    </div>
  );
}
