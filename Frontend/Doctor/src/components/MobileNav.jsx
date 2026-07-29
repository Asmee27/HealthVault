import { Link, useParams } from "react-router-dom";

export default function MobileNav() {
  const { qrToken } = useParams();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-slate-100 flex items-center justify-around py-3 px-6 z-50">
      <Link to={`/patient-overview/${qrToken}`} className="flex flex-col items-center gap-1 text-teal-700">
        <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>analytics</span>
        <span className="text-[10px] font-bold">Summary</span>
      </Link>
      <Link to={`/add-prescription/${qrToken}`} className="flex flex-col items-center gap-1 text-slate-400">
        <span className="material-symbols-outlined">description</span>
        <span className="text-[10px] font-medium">Notes</span>
      </Link>
      <div className="flex flex-col items-center gap-1 text-slate-400">
        <span className="material-symbols-outlined">science</span>
        <span className="text-[10px] font-medium">Labs</span>
      </div>
      <div className="flex flex-col items-center gap-1 text-slate-400">
        <span className="material-symbols-outlined">biotech</span>
        <span className="text-[10px] font-medium">Imaging</span>
      </div>
    </nav>
  );
}
