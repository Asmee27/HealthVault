import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SplashScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => navigate('/login'), 2500);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="relative h-screen w-full flex flex-col items-center justify-center clinical-gradient px-8 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary-container/5 organic-shape blur-3xl"></div>
        <div className="absolute -bottom-32 -right-16 w-80 h-80 bg-secondary-container/10 organic-shape blur-3xl"></div>
      </div>
      
      <div className="relative flex flex-col items-center">
        <div className="relative w-32 h-32 md:w-40 md:h-40 flex items-center justify-center mb-8">
          <div className="absolute inset-0 rounded-full border border-primary/10 bg-white/40 backdrop-blur-sm shadow-[0_8px_32px_rgba(0,106,100,0.08)]"></div>
          <svg className="relative z-10 w-16 h-16 md:w-20 md:h-20 text-primary" viewBox="0 0 100 100">
            <path d="M30 20C30 18.8954 30.8954 18 32 18H38C39.1046 18 40 18.8954 40 20V42H60V20C60 18.8954 60.8954 18 62 18H68C69.1046 18 70 18.8954 70 20V80C70 81.1046 69.1046 82 68 82H62C60.8954 82 60 81.1046 60 80V58H40V80C40 81.1046 39.1046 82 38 82H32C30.8954 82 30 81.1046 30 80V20Z" fill="currentColor"></path>
            <rect fill="white" height="8" rx="2" width="16" x="42" y="46"></rect>
            <rect fill="white" height="16" rx="2" width="8" x="46" y="42"></rect>
          </svg>
        </div>
        
        <div className="text-center">
          <h1 className="font-headline text-5xl md:text-6xl font-extrabold tracking-tighter text-teal-900 mb-3">HVault</h1>
          <p className="font-body text-sm md:text-base tracking-[0.2em] uppercase text-outline font-medium opacity-80">Precision Health Records</p>
        </div>
      </div>
      
      <div className="absolute bottom-16 flex flex-col items-center">
        <div className="w-48 h-1 bg-surface-container rounded-full overflow-hidden mb-4">
          <div className="h-full bg-primary-container w-1/3 rounded-full animate-loading"></div>
        </div>
        <span className="text-xs font-label text-outline/60 tracking-widest">ESTABLISHING SECURE CONNECTION</span>
      </div>
    </div>
  );
}
