import { useNavigate } from 'react-router-dom';

export default function BottomNavBar({ activeTab }) {
  const navigate = useNavigate();

  const navItems = [
    { id: 'dashboard', label: 'Health', icon: 'dashboard', path: '/dashboard' },
    { id: 'records', label: 'Records', icon: 'description', path: '/records' },
    { id: 'upload', label: 'Upload', icon: 'cloud_upload', path: '/upload', center: true },
    { id: 'access', label: 'Access', icon: 'key', path: '/access' },
    { id: 'profile', label: 'Profile', icon: 'person', path: '/profile' }
  ];

  return (
    <nav className="fixed bottom-0 w-full z-50 rounded-t-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-[0_-4px_24px_rgba(0,106,100,0.06)] flex justify-around items-center px-2 pt-2 pb-6">
      {navItems.map((item) => (
        <button 
          key={item.id}
          onClick={() => navigate(item.path)}
          className={`flex flex-col items-center justify-center px-4 py-1.5 transition-all duration-200 active:scale-90 ${activeTab === item.id ? 'bg-teal-100 dark:bg-teal-900/40 text-teal-900 dark:text-teal-100 rounded-2xl' : 'text-slate-500 dark:text-slate-400 hover:text-teal-600'}`}
        >
          {item.center ? (
            <div className="bg-primary p-2 rounded-full text-on-primary mb-1 -mt-6 shadow-lg shadow-primary/30">
              <span className="material-symbols-outlined text-2xl">{item.icon}</span>
            </div>
          ) : (
            <span 
              className={`material-symbols-outlined ${activeTab === item.id ? 'fill-1' : ''}`}
              style={activeTab === item.id ? {fontVariationSettings: "'FILL' 1"} : {}}
            >
              {item.icon}
            </span>
          )}
          <span className="font-inter text-[11px] font-medium mt-1">{item.label}</span>
        </button>
      ))}
    </nav>
  );
}
