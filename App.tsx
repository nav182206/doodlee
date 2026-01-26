
import React, { useState } from 'react';
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
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [activeView, setActiveView] = useState<ActiveView>('home');

  const handleUnlock = () => {
    setIsAuthorized(true);
    setActiveView('home');
  };

  const handleLogout = () => {
    setIsAuthorized(false);
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
      case 'moments':
        return <Moments />;
      case 'message':
        return <EmotionalMessage />;
      case 'voices':
        return <SpecialMoments />;
      default:
        return <Hero onStart={() => setActiveView('gallery')} onLogout={handleLogout} />;
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gradient-soft font-inter selection:bg-rose-200">
      {/* Navigation - Sidebar on Desktop, Bottom bar on Mobile */}
      <Navigation activeView={activeView} setView={setActiveView} />

      {/* Main Content Area */}
      <main className="flex-grow flex flex-col items-center justify-start p-4 md:p-10 lg:p-16 overflow-y-auto h-screen custom-scrollbar relative">
        <div className="w-full max-w-7xl animate-in fade-in zoom-in duration-500">
          {renderView()}
        </div>
      </main>

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
