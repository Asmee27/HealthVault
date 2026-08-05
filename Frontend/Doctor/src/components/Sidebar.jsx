
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
export default function Sidebar({ activePatient = null }) {
  const navigate = useNavigate();
  const { qrToken } = useParams();
  const location = useLocation();

  const activeClass =
  "flex items-center gap-3 bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 font-semibold rounded-xl px-4 py-3 mx-2 transition-all";

const inactiveClass =
  "flex items-center gap-3 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl px-4 py-3 mx-2 transition-all";

  return (
    <aside className="fixed left-0 top-0 h-full w-96 max-lg:hidden flex flex-col z-40 bg-white dark:bg-slate-950 rounded-r-2xl shadow-2xl shadow-teal-950/10 pt-20">
      <div className="px-6 py-4 flex flex-col gap-1 mb-6">
        {activePatient ? (
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-secondary-fixed flex items-center justify-center overflow-hidden">
              <img alt="Patient Avatar"className="w-full h-full object-cover"src={activePatient.gender?.toLowerCase() === "female"? "/female-avatar.jpeg": "/male-avatar.jpeg"}
            />
            </div>
            <div>
              <p className="font-headline text-xl font-extrabold text-teal-900 dark:text-teal-100">{activePatient.fullName}</p>
              <p className="text-xs text-slate-500 font-inter">ID: {activePatient.id}</p>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined text-white text-sm">medical_services</span>
            </div>
            <span className="font-headline text-xl font-extrabold text-teal-900">MediVault</span>
          </div>
        )}
        
      </div>
      
      <nav className="flex-1 space-y-1">
         <Link to={`/patient-overview/${qrToken}`}className={location.pathname.includes("/patient-overview")? activeClass: inactiveClass}>
          <span className="material-symbols-outlined">analytics</span>
          <span className="text-base font-medium">Patient Overview</span>
        </Link>
       <Link to={`/add-prescription/${qrToken}`} className={location.pathname.includes("/add-prescription")? activeClass: inactiveClass}>
          <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>description</span>
          <span className="text-base font-medium">Clinical Notes</span>
        </Link>
        
      </nav>

      
    </aside>
  );
}
