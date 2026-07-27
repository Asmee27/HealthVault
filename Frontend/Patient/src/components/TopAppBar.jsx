import { useNavigate } from 'react-router-dom';

export default function TopAppBar({ title, showProfile = true }) {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 w-full z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-sm flex justify-between items-center px-6 py-3">
      <div className="flex items-center gap-3">
        <div 
          className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary-container cursor-pointer"
          onClick={() => navigate('/profile')}
        >
          <img 
            alt="Profile" 
            className="w-full h-full object-cover" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBK3tVzLIXmbOG5XndqkwQiX2cSJlR92t7SUlu5io3xqAeRvHQw5Fh_b2NrUjcTqEQFDtsmPX6mtudFAu7ikB2pFfLyqz6dvqrSgNKrOdyTyPVfxIz6HWrlRTUuUlXI_GdriXKGgJouHrHi2BkM58bfYWmLBRqp1ZUmoR5NwzDGDkuFlp3Z6SHSMSKlboe9wQzeaJaC7N-a5g_ielwaTAxOs1PGw1brR9Wh4bG6ol694iqUFavdcVEX0Sklxr5QErd4HCwLwUCPkJ4"
          />
        </div>
        <span className="font-headline font-black text-2xl tracking-tight text-teal-800 dark:text-teal-300">HVault</span>
      </div>
      <div className="flex items-center gap-2">
        {title && <h1 className="hidden md:block font-bold text-teal-700">{title}</h1>}
        <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors active:scale-95 text-teal-700 dark:text-teal-400">
          <span className="material-symbols-outlined">notifications</span>
        </button>
      </div>
    </header>
  );
}
