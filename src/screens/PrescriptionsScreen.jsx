import TopAppBar from '../components/TopAppBar';
import BottomNavBar from '../components/BottomNavBar';

export default function PrescriptionsScreen() {
  const prescriptions = [
    { dr: "Dr. Elena Rossi", spec: "Cardiologist", date: "Oct 12", meds: ["Lisinopril 10mg", "Vitamin D3"], primary: false },
    { dr: "Dr. Sarah Jenkins", spec: "GP", date: "Current", meds: ["Amoxicillin 500mg"], primary: true },
  ];

  return (
    <div className="pb-32 bg-surface min-h-screen">
      <TopAppBar />
      <main className="pt-24 px-6 max-w-screen-xl mx-auto">
        <div className="mb-10 max-w-xl">
          <h2 className="font-headline text-4xl font-extrabold tracking-tight text-on-surface mb-2">Medication History</h2>
          <p className="text-on-surface-variant">Manage and track prescriptions from your care team.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {prescriptions.map((card, idx) => (
            <div 
              key={idx} 
              className={`${card.primary ? 'bg-primary text-on-primary' : 'bg-surface-container-lowest text-on-surface'} clinical-shadow rounded-xl p-6 border border-white/40 flex flex-col justify-between`}
            >
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-lg ${card.primary ? 'bg-white/20' : 'bg-primary-container/10'} flex items-center justify-center`}>
                      <span className={`material-symbols-outlined text-3xl ${card.primary ? 'text-white' : 'text-primary'}`}>medical_services</span>
                    </div>
                    <div>
                      <h3 className="font-headline text-lg font-bold leading-tight">{card.dr}</h3>
                      <p className={`text-xs font-medium uppercase tracking-wider ${card.primary ? 'text-white/70' : 'text-primary'}`}>{card.spec}</p>
                    </div>
                  </div>
                  <span className={`${card.primary ? 'bg-white/20' : 'bg-tertiary-container/10'} text-[11px] font-bold px-2 py-1 rounded-full uppercase`}>{card.date}</span>
                </div>
                <div className="space-y-4 mb-8">
                  {card.meds.map((m, mi) => (
                    <div key={mi} className="flex items-center gap-2">
                      <span className={`w-1.5 h-1.5 rounded-full ${card.primary ? 'bg-white' : 'bg-primary'}`}></span>
                      <span className="font-semibold text-sm">{m}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex gap-3">
                <button className={`flex-1 font-bold text-sm py-3 rounded-xl transition-all ${card.primary ? 'bg-white text-primary' : 'bg-primary text-on-primary'}`}>View Details</button>
                <button className={`p-3 rounded-xl ${card.primary ? 'bg-white/10' : 'bg-secondary-container/30 text-on-secondary-container'}`}>
                  <span className="material-symbols-outlined">download</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
      <BottomNavBar activeTab="dashboard" />
    </div>
  );
}
