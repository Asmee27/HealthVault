export default function ReportItem({ 
  title, 
  source, 
  date, 
  status, 
  statusColor = "bg-green-100 text-green-700", 
  icon, 
  iconBg, 
  iconColor, 
  attachment, 
  footer 
}) {
  return (
    <div className="group bg-surface-container-lowest p-5 rounded-xl shadow-sm hover:shadow-md transition-all border border-outline-variant/10 flex items-start gap-4">
      <div className={`p-4 ${iconBg} rounded-xl group-hover:scale-105 transition-transform`}>
        <span className={`material-symbols-outlined ${iconColor} text-2xl`}>{icon}</span>
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-headline font-bold text-on-surface">{title}</h3>
            <p className="text-xs text-slate-500 font-medium mt-0.5">{source} • {date}</p>
          </div>
          {status && <span className={`px-2 py-0.5 ${statusColor} text-[10px] font-bold rounded`}>{status}</span>}
        </div>
        <div className="mt-4 flex items-center justify-between">
          {attachment ? (
            <div className="flex items-center gap-1 text-slate-400">
              <span className="material-symbols-outlined text-xs">attachment</span>
              <span className="text-[10px] font-bold">{attachment}</span>
            </div>
          ) : footer ? (
            <div className="text-[10px] text-slate-400 italic">{footer}</div>
          ) : (
            <div className="flex -space-x-2">
              <div className="w-6 h-6 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[8px] font-bold">DR</div>
              <div className="w-6 h-6 rounded-full border-2 border-white bg-teal-100 flex items-center justify-center text-[8px] font-bold">LB</div>
            </div>
          )}
          <button className="flex items-center gap-1.5 text-primary text-xs font-bold hover:underline">
            View PDF <span className="material-symbols-outlined text-sm">open_in_new</span>
          </button>
        </div>
      </div>
    </div>
  );
}
