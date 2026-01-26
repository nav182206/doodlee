
import React from 'react';

type View = 'home' | 'music' | 'gallery' | 'moments' | 'message' | 'voices';

interface NavProps {
  activeView: View;
  setView: (v: View) => void;
}

const Navigation: React.FC<NavProps> = ({ activeView, setView }) => {
  const navItems: { id: View; label: string; icon: string }[] = [
    { id: 'home', label: 'Welcome', icon: '🏠' },
    { id: 'gallery', label: 'Pictures', icon: '📸' },
    { id: 'music', label: 'Music', icon: '🎵' },
    { id: 'moments', label: 'Timeline', icon: '⏳' },
    { id: 'voices', label: 'Voices', icon: '🎙️' },
    { id: 'message', label: 'Letters', icon: '✉️' },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <nav className="hidden md:flex flex-col w-64 bg-white/40 backdrop-blur-xl border-r border-rose-100 p-8 space-y-10 shrink-0">
        <div className="text-center">
          <div className="text-3xl mb-2">🌸</div>
          <h1 className="font-serif-elegant font-bold text-rose-600 text-xl">Birthday Edition</h1>
        </div>

        <div className="flex flex-col gap-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className={`flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 font-medium ${
                activeView === item.id 
                  ? 'bg-rose-500 text-white shadow-lg translate-x-2' 
                  : 'text-gray-500 hover:bg-rose-50 hover:text-rose-500'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        <div className="mt-auto pt-10 text-center">
          <p className="text-[10px] uppercase tracking-widest text-rose-300 font-bold">Made for you with love</p>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-2xl border-t border-rose-100 flex justify-around p-4 z-50">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setView(item.id)}
            className={`flex flex-col items-center gap-1 transition-colors ${
              activeView === item.id ? 'text-rose-500 scale-110' : 'text-gray-400'
            }`}
          >
            <span className="text-2xl">{item.icon}</span>
            <span className="text-[10px] font-bold uppercase tracking-tighter">{item.label}</span>
          </button>
        ))}
      </nav>
    </>
  );
};

export default Navigation;
