
import React from 'react';

type View = 'home' | 'music' | 'gallery' | 'message' | 'dreams' | 'bubbles';

interface NavProps {
  activeView: View;
  setView: (v: View) => void;
  onLogout: () => void;
}

const Navigation: React.FC<NavProps> = ({ activeView, setView, onLogout }) => {
  const navItems: { id: View; label: string; icon: string }[] = [
    { id: 'home', label: 'Welcome', icon: '🏠' },
    { id: 'gallery', label: 'Pictures', icon: '📸' },
    { id: 'music', label: 'Music', icon: '🎵' },
    { id: 'dreams', label: 'Collection', icon: '✨' },
    { id: 'bubbles', label: 'Bubbles', icon: '🫧' },
    { id: 'message', label: 'Letter', icon: '✉️' },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <nav className="hidden md:flex flex-col w-64 bg-white/60 backdrop-blur-xl border-r border-slate-100 p-8 space-y-10 shrink-0">
        <div className="text-center">
          <div className="text-3xl mb-2 animate-float">🌸</div>
          <h1 className="font-serif-elegant font-bold text-slate-800 text-xl tracking-tight">For Janu 💙</h1>
        </div>

        <div className="flex flex-col gap-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className={`flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-150 font-bold text-xs uppercase tracking-widest ${
                activeView === item.id 
                  ? 'bg-blue-600 text-white shadow-xl scale-105' 
                  : 'text-slate-400 hover:bg-blue-50 hover:text-blue-600'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        <div className="mt-auto pt-8 border-t border-slate-100 space-y-4">
          <button 
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-rose-400 hover:bg-rose-50 hover:text-rose-600 transition-all font-black text-[10px] uppercase tracking-widest border border-transparent hover:border-rose-100"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Lock Vault
          </button>
          <div className="text-center">
            <p className="text-[8px] text-slate-400 uppercase tracking-widest italic">Naveen's Surprise 🦖</p>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-2xl border-t border-slate-100 flex justify-around p-4 pb-6 z-[200]">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setView(item.id)}
            className={`flex flex-col items-center gap-1 transition-all ${
              activeView === item.id ? 'text-blue-600 scale-110' : 'text-slate-400'
            }`}
          >
            <span className="text-2xl">{item.icon}</span>
            <span className="text-[8px] font-black uppercase tracking-tighter">{item.label}</span>
          </button>
        ))}
      </nav>
    </>
  );
};

export default Navigation;
