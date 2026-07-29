import { useNavigate } from "react-router-dom";

export default function ScanPatientID() {
  const navigate = useNavigate();

  return (
    <div className="bg-surface font-body text-on-surface h-screen flex flex-col overflow-hidden">
      <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-outline-variant">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/")}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container transition-colors text-on-surface"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
          <h1 className="font-headline font-bold text-lg text-on-surface">
            Scan Patient ID
          </h1>
        </div>
        <div className="w-8 h-8 rounded-full border border-outline-variant overflow-hidden">
          <img
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuD8D2vvj4WdL6IDNkLP44jk3ZYeb0E1Xdq8S1w-D_QChGHQOSVRpEBZGQsoRvZR21DG6K9XFxOAyM4FmBGYU1xy9IrCBqUR9d79ZGe7UK4ufE6mdvSavKvzasOOro10I_CGuyOiOP--7hhitoa59FGicakl4ZZSegQheRXuf8JbT4vRZKx-CMtFgTInph98KHvUZJ1-RkZGn8iXDtJTijHKgmeL4ZeiPhntd14_sN3faMniUop3jsSltZFQlDtbZPEXi21kMHT_bTA"
            alt="Doctor profile"
          />
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-6">
        <div className="relative w-[280px] h-[280px] mb-12">
          <div className="absolute inset-0 bg-white shadow-sm rounded-3xl border border-outline-variant/30 overflow-hidden">
            <div className="absolute inset-0 bg-surface-container-low flex items-center justify-center">
              <span className="material-symbols-outlined text-8xl text-outline-variant/20">
                qr_code_scanner
              </span>
            </div>
            <div className="absolute inset-0 z-10">
              <div className="scan-line"></div>
            </div>
          </div>
          <div className="absolute -inset-1 z-20 pointer-events-none">
            <div className="absolute top-0 left-0 w-12 h-12 border-t-[3px] border-l-[3px] border-primary rounded-tl-2xl"></div>
            <div className="absolute top-0 right-0 w-12 h-12 border-t-[3px] border-r-[3px] border-primary rounded-tr-2xl"></div>
            <div className="absolute bottom-0 left-0 w-12 h-12 border-b-[3px] border-l-[3px] border-primary rounded-bl-2xl"></div>
            <div className="absolute bottom-0 right-0 w-12 h-12 border-b-[3px] border-r-[3px] border-primary rounded-br-2xl"></div>
          </div>
        </div>

        <div className="text-center space-y-2 mb-12 max-w-xs">
          <p className="text-on-surface text-xl font-bold tracking-tight">
            Place the ID inside the frame
          </p>
          <p className="text-on-surface-variant text-base">
            Align the QR code within the corners. Scanning happens
            automatically.
          </p>
        </div>

        <div className="w-full max-w-[240px]">
          <button
            onClick={() =>
  navigate("/patient-overview/550e8400-e29b-41d4-a716-446655440000")
}
            className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-primary text-on-primary rounded-full text-sm font-semibold shadow-lg shadow-primary/20 hover:bg-primary-container hover:text-on-primary-container active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-lg">image</span>
            Upload from Gallery
          </button>
        </div>
      </main>

      <footer className="p-8 flex justify-center">
        <div className="bg-surface-container-high px-5 py-3 rounded-full flex items-center gap-3 border border-outline-variant shadow-sm">
          <span className="material-symbols-outlined text-primary text-xl">
            security
          </span>
          <span className="text-[11px] text-on-surface-variant font-bold tracking-wider uppercase">
            Encrypted Clinical Scanning Mode
          </span>
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
        </div>
      </footer>
    </div>
  );
}
