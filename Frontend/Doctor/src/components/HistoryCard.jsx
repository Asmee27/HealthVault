export default function HistoryCard({ 
  type, 
  color, 
  date, 
  title, 
  desc, 
  extra, 
  extraIcon, 
  opacity = "" 
}) {
  return (
    <div className={`bg-surface-container-lowest rounded-xl p-5 shadow-sm border border-transparent hover:border-outline-variant/20 transition-all ${opacity}`}>
      <div className="flex justify-between items-start mb-3">
        <span className={`px-3 py-1 ${color} text-xs font-bold rounded-full uppercase tracking-widest`}>{type}</span>
        <span className="text-xs text-on-surface-variant font-medium">{date}</span>
      </div>
      <h4 className="font-headline text-lg text-primary font-bold mb-1">{title}</h4>
      <p className="text-sm text-on-surface-variant line-clamp-2 mb-4">{desc}</p>
      <div className="flex items-center gap-2">
        <span className="material-symbols-outlined text-sm text-tertiary">{extraIcon}</span>
        <span className="text-xs font-medium text-tertiary">{extra}</span>
      </div>
    </div>
  );
}
