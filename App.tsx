
import React, { useState, useEffect } from 'react';
import Hero from './components/Hero';
import Music from './components/Music';
import Gallery from './components/Gallery';
import Moments from './components/Moments';
import EmotionalMessage from './components/EmotionalMessage';
import LoginPage from './components/LoginPage';
import Navigation from './components/Navigation';
import SpecialMoments from './components/SpecialMoments';

type ActiveView = 'home' | 'music' | 'gallery' | 'moments' | 'message' | 'voices';

const App: React.FC = () => {
  const [isAuthorized, setIsAuthorized] = useState(() => localStorage.getItem('sweeta_auth') === 'true');
  const [activeView, setActiveView] = useState<ActiveView>('home');
  const [editMode, setEditMode] = useState(() => localStorage.getItem('sweeta_edit_mode') !== 'false');
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('sweeta_auth', isAuthorized.toString());
  }, [isAuthorized]);

  useEffect(() => {
    localStorage.setItem('sweeta_edit_mode', editMode.toString());
  }, [editMode]);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleUnlock = () => {
    setIsAuthorized(true);
    setActiveView('home');
    showToast("Welcome Back! 💙");
  };

  const handleLogout = () => {
    setIsAuthorized(false);
    localStorage.removeItem('sweeta_auth');
  };

  if (!isAuthorized) {
    return <LoginPage onUnlock={handleUnlock} />;
  }

  const renderView = () => {
    const props = { editMode, onSave: () => showToast("Memory Saved ✨") };
    switch (activeView) {
      case 'home':
        return <Hero onStart={() => setActiveView('gallery')} onLogout={handleLogout} />;
      case 'music':
        return <Music {...props} />;
      case 'gallery':
        return <Gallery {...props} />;
      case 'moments':
        return <Moments {...props} />;
      case 'message':
        return <EmotionalMessage />;
      case 'voices':
        return <SpecialMoments {...props} />;
      default:
        return <Hero onStart={() => setActiveView('gallery')} onLogout={handleLogout} />;
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gradient-soft font-inter selection:bg-rose-200">
      <Navigation 
        activeView={activeView} 
        setView={setActiveView} 
        editMode={editMode} 
        setEditMode={setEditMode} 
      />

      <main className="flex-grow flex flex-col items-center justify-start p-4 md:p-10 lg:p-16 overflow-y-auto h-screen custom-scrollbar relative">
        <div className="w-full max-w-7xl animate-in fade-in zoom-in duration-500">
          {renderView()}
        </div>
      </main>

      {/* Persistence Toast */}
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
