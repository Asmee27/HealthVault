import TopAppBar from '../components/TopAppBar';
import BottomNavBar from '../components/BottomNavBar';

export default function UploadScreen() {
  return (
    <div className="pb-32 bg-surface min-h-screen">
      <TopAppBar />
      <main className="pt-24 px-6 max-w-2xl mx-auto">
        <header className="mb-10 text-center">
          <h1 className="text-3xl font-extrabold text-on-surface mb-2 leading-tight">Upload Records</h1>
          <p className="text-on-surface-variant text-sm font-medium">Keep your medical history organized and accessible anywhere.</p>
        </header>

        <div className="space-y-8">
          <section className="relative group">
            <div className="border-2 border-dashed border-outline-variant bg-surface-container-lowest rounded-xl p-10 flex flex-col items-center justify-center transition-all group-hover:border-primary/40 group-hover:bg-primary/5">
              <div className="w-16 h-16 bg-primary-container/20 rounded-full flex items-center justify-center mb-4 text-primary">
                <span 
                  className="material-symbols-outlined text-3xl" 
                  style={{fontVariationSettings: "'FILL' 1"}}
                >
                  cloud_upload
                </span>
              </div>
              <h3 className="text-lg font-bold text-on-surface mb-1">Select Medical File</h3>
              <p className="text-on-surface-variant text-sm mb-6">Drag and drop or browse from your device</p>
              <button className="px-6 py-2.5 bg-secondary-container text-on-secondary-container font-semibold rounded-full hover:bg-secondary-fixed-dim transition-colors text-sm active:scale-95">Choose File</button>
              <p className="mt-4 text-[11px] text-outline uppercase tracking-widest font-bold">PDF, JPEG, or PNG (Max 10MB)</p>
            </div>
          </section>

          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider ml-1">Report Type</label>
              <select className="w-full bg-surface-container-highest border-none rounded-xl px-5 py-4 text-on-surface font-medium focus:ring-2 focus:ring-primary/20">
                <option disabled defaultValue="">Select the type of report</option>
                <option>Blood Test</option>
                <option>X-ray</option>
                <option>Prescription</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider ml-1">Notes</label>
              <textarea 
                className="w-full bg-surface-container-highest border-none rounded-xl px-5 py-4 text-on-surface font-medium placeholder:text-outline focus:ring-2 focus:ring-primary/20 resize-none" 
                placeholder="Add context about this report..." 
                rows="4"
              ></textarea>
            </div>
            <button className="w-full bg-primary text-on-primary font-headline font-bold py-5 rounded-xl shadow-lg shadow-primary/20 hover:bg-primary/90 active:scale-[0.98] transition-all text-lg flex items-center justify-center gap-2">
              <span className="material-symbols-outlined">upload</span> Upload
            </button>
          </div>
        </div>
      </main>
      <BottomNavBar activeTab="upload" />
    </div>
  );
}
