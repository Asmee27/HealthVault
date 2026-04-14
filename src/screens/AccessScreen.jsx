import TopAppBar from '../components/TopAppBar';
import BottomNavBar from '../components/BottomNavBar';

export default function AccessScreen() {
  return (
    <div className="pb-32 bg-surface min-h-screen">
      <TopAppBar />
      <main className="pt-24 px-6 max-w-2xl mx-auto">
        {/* QR Code Section */}
        <section className="flex flex-col items-center justify-center text-center py-8">
          <div className="relative p-8 bg-surface-container-lowest rounded-3xl shadow-[0_32px_48px_rgba(0,106,100,0.06)] border border-outline-variant/15">
            <div className="bg-gradient-to-br from-primary to-primary-container p-1 rounded-2xl">
              <div className="bg-white p-4 rounded-[calc(1rem-4px)]">
                <div className="w-48 h-48 bg-white relative">
                  <img 
                    alt="QR" 
                    className="w-full h-full grayscale opacity-90" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuD3INOMXz4K_SCUCqFoIGLaNt1JfwUZdxZUZnh2ZZC8iUVDMiqBcc9Px1S276SpNqHTwM52pFJTDU1x4dtUhMjbwo63xkRPOnbS9_9Zg7wW_vexXqh63oTD_diQp0IhJdD5ERv5CW4mTgidMOLeR_zi8lpD7FWsK7Z0_8NyAihX2ZNXLqDX0CtC5tuSioGv98WRkR7TdebwSoXX5x0nCZ6ARJGBy2tG4N5YbZSM0gKh6f2J3ioVEHtFZm6WeOzjqjmaEIqL1f4tAVY"
                  />
                </div>
              </div>
            </div>
            <div className="mt-8 space-y-2">
              <p className="text-xs font-bold tracking-widest text-on-surface-variant uppercase">Health ID</p>
              <h2 className="text-2xl font-extrabold tracking-tight text-teal-800 font-headline">HV-293-881-00</h2>
            </div>
          </div>
          <p className="mt-6 text-on-surface-variant text-sm max-w-xs leading-relaxed">Scan this code to instantly share records with certified practitioners.</p>
        </section>

        {/* Access Requests */}
        <section className="mt-12">
          <h3 className="text-xl font-bold text-on-surface font-headline mb-6">Access Requests</h3>
          <div className="space-y-4">
            <div className="bg-surface-container-lowest p-5 rounded-2xl flex items-center justify-between border border-transparent hover:border-outline-variant/10 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-surface-container-low overflow-hidden">
                  <img 
                    alt="Dr" 
                    className="w-full h-full object-cover" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCbFK82TYs60LFKtOnM-A47pVuGTxBK-YSSkNSU2AoDH4sMDFm9hcgXarIxf6p0htMUoTecsohQiEAkUUChhvSgJD23OzFJXocKiEIQoFMpPJR8xax8Se55rk0UNk6DBKF9H-v9V42Q0Zu6dqu37E1Ux4ETabfOu_STRYiNdaJQ7wvfCw3PGy8kZ1QR15ueHhgimqHD-QfIEa64XgXDN4h4h3YjHDeAUcvuELABQeWw4lMlsEgjAIln8FmiPo2reChe3mXn0GCgT84"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-on-surface">Dr. Jonathan Sterling</h4>
                  <p className="text-xs text-on-surface-variant">Cardiology Specialist</p>
                </div>
              </div>
              <button className="bg-primary hover:bg-surface-tint text-on-primary px-5 py-2.5 rounded-xl text-sm font-semibold transition-all">Allow</button>
            </div>
          </div>
        </section>
      </main>
      <BottomNavBar activeTab="access" />
    </div>
  );
}
