
import React, { useState, useEffect } from 'react';
import Hero from './components/Hero.tsx';
import Music from './components/Music.tsx';
import Gallery from './components/Gallery.tsx';
import EmotionalMessage from './components/EmotionalMessage.tsx';
import LoginPage from './components/LoginPage.tsx';
import Navigation from './components/Navigation.tsx';
import DreamBoard from './components/DreamBoard.tsx';
import BubblesGame from './components/BubblesGame.tsx';

type ActiveView = 'home' | 'music' | 'gallery' | 'message' | 'dreams' | 'bubbles';

const App: React.FC = () => {
  const [isAuthorized, setIsAuthorized] = useState(() => {
    // Unique key for storage to avoid conflicts
    return localStorage.getItem('janu_birthday_auth_v1') === 'true';
  });
  const [activeView, setActiveView] = useState<ActiveView>('home');
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('janu_birthday_auth_v1', isAuthorized.toString());
  }, [isAuthorized]);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2000);
  };

  const handleUnlock = () => {
    setIsAuthorized(true);
    setActiveView('home');
    showToast("Access Granted 💙");
  };

  const handleLogout = () => {
    setIsAuthorized(false);
    localStorage.removeItem('janu_birthday_auth_v1');
  };

  if (!isAuthorized) {
    return <LoginPage onUnlock={handleUnlock} />;
  }

  const renderView = () => {
    // Direct mapping for fastest render
    const views = {
      home: <Hero onStart={() => setActiveView('gallery')} onLogout={handleLogout} />,
      music: <Music />,
      gallery: <Gallery />,
      message: <EmotionalMessage />,
      dreams: <DreamBoard />,
      bubbles: <BubblesGame />
    };
    return views[activeView] || views.home;
  };

  return (
    <div className="flex flex-col md:flex-row min-h-[100dvh] bg-[#f8fafc] font-inter selection:bg-blue-100 overflow-hidden">
      <Navigation 
        activeView={activeView} 
        setView={setActiveView} 
        onLogout={handleLogout}
      />

      <main className="flex-grow flex flex-col items-center justify-start p-4 md:p-8 lg:p-10 overflow-y-auto h-[100dvh] custom-scrollbar relative pb-24 md:pb-10">
        {/* Rapid Content Transitions */}
        <div key={activeView} className="w-full max-w-7xl animate-in fade-in duration-200">
          {renderView()}
        </div>
      </main>

      {/* Lightning-fast toast feedback */}
      {toast && (
        <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[300] bg-slate-900/95 backdrop-blur-md text-white px-6 py-3 rounded-2xl font-bold text-[10px] uppercase tracking-widest shadow-2xl animate-in slide-in-from-top-4 duration-150">
          {toast}
        </div>
      )}

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 3px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default App;
