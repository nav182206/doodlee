
import React, { useState, useEffect } from 'react';
import Hero from './components/Hero.tsx';
import Music from './components/Music.tsx';
import Gallery from './components/Gallery.tsx';
import EmotionalMessage from './components/EmotionalMessage.tsx';
import LoginPage from './components/LoginPage.tsx';
import Navigation from './components/Navigation.tsx';
import DreamBoard from './components/DreamBoard.tsx';

type ActiveView = 'home' | 'music' | 'gallery' | 'message' | 'dreams';

const App: React.FC = () => {
  const [isAuthorized, setIsAuthorized] = useState(() => localStorage.getItem('sweeta_auth') === 'true');
  const [activeView, setActiveView] = useState<ActiveView>('home');
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('sweeta_auth', isAuthorized.toString());
  }, [isAuthorized]);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleUnlock = () => {
    setIsAuthorized(true);
    setActiveView('home');
    showToast("Happy Birthday, Sweeta! 💙");
  };

  const handleLogout = () => {
    setIsAuthorized(false);
    localStorage.removeItem('sweeta_auth');
  };

  if (!isAuthorized) {
    return <LoginPage onUnlock={handleUnlock} />;
  }

  const renderView = () => {
    switch (activeView) {
      case 'home':
        return <Hero onStart={() => setActiveView('gallery')} onLogout={handleLogout} />;
      case 'music':
        return <Music />;
      case 'gallery':
        return <Gallery />;
      case 'message':
        return <EmotionalMessage />;
      case 'dreams':
        return <DreamBoard />;
      default:
        return <Hero onStart={() => setActiveView('gallery')} onLogout={handleLogout} />;
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gradient-soft font-inter selection:bg-rose-200">
      <Navigation 
        activeView={activeView} 
        setView={setActiveView} 
      />

      <main className="flex-grow flex flex-col items-center justify-start p-4 md:p-10 lg:p-16 overflow-y-auto h-screen custom-scrollbar relative">
        <div className="w-full max-w-7xl animate-in fade-in zoom-in duration-500">
          {renderView()}
        </div>
      </main>

      {/* Celebration Toast */}
      {toast && (
        <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[300] bg-gray-900/90 backdrop-blur-md text-white px-8 py-4 rounded-full font-bold text-sm shadow-2xl animate-in slide-in-from-top-4 duration-300 flex items-center gap-3">
          <span className="text-xl">✨</span>
          {toast}
        </div>
      )}

      {/* Floating Decor */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-[-1]">
        {[...Array(10)].map((_, i) => (
          <div 
            key={i}
            className="absolute text-rose-200 opacity-10 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 40 + 20}px`,
              animationDelay: `${Math.random() * 5}s`
            }}
          >
            ❤️
          </div>
        ))}
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #fecdd3; border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default App;
