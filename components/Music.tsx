
import React, { useState } from 'react';

const Music: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  // Hardcoded the provided playlist for Sweeta to ensure it is fixed
  const FIXED_PLAYLIST_URL = "https://open.spotify.com/embed/playlist/6DdCsQDboUo3ZuSEC8YWxq?utm_source=generator&theme=0";

  return (
    <div className="w-full max-w-5xl mx-auto space-y-12 pb-32 px-4 md:px-0 flex flex-col items-center">
      {/* Header Section */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-24 h-24 bg-green-500 rounded-[2.5rem] text-white text-5xl shadow-2xl shadow-green-200 animate-pulse mb-4">
          📻
        </div>
        <h2 className="text-5xl md:text-6xl font-serif-elegant font-bold text-gray-900 tracking-tight italic">The Soundtrack of Us</h2>
        <p className="text-green-600 font-medium italic text-xl">Every song tells our story 💙</p>
      </div>

      {/* Main Playlist Player Container */}
      <div className="w-full max-w-3xl relative min-h-[450px]">
        <div className="absolute inset-0 bg-gradient-to-br from-green-100/50 to-blue-100/50 blur-[100px] opacity-40 -z-10 rounded-full"></div>
        
        {/* Loading State - Beautiful Spinning Record */}
        {!isLoaded && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/40 backdrop-blur-sm rounded-[4rem] border-4 border-white z-20 animate-in fade-in duration-500">
            <div className="relative">
              <div className="w-32 h-32 bg-gray-900 rounded-full flex items-center justify-center shadow-2xl animate-[spin_3s_linear_infinite]">
                <div className="w-10 h-10 bg-green-500 rounded-full border-4 border-gray-800 flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                {/* Grooves on record */}
                <div className="absolute inset-2 border-2 border-white/5 rounded-full"></div>
                <div className="absolute inset-6 border border-white/5 rounded-full"></div>
              </div>
              <div className="absolute -right-4 top-0 text-3xl animate-bounce">🎵</div>
            </div>
            <p className="mt-8 text-green-600 font-bold tracking-widest uppercase text-xs animate-pulse">
              Setting the mood...
            </p>
          </div>
        )}

        <div className={`bg-white rounded-[4rem] p-8 shadow-2xl border-4 border-white overflow-hidden transition-all duration-1000 ${isLoaded ? 'opacity-100 scale-100 shadow-green-100/50' : 'opacity-0 scale-95'}`}>
          <iframe 
            src={FIXED_PLAYLIST_URL} 
            width="100%" 
            height="450" 
            frameBorder="0" 
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
            onLoad={() => setIsLoaded(true)}
            className="rounded-[3rem] shadow-sm"
          ></iframe>
        </div>
      </div>

      <div className="max-w-xl text-center">
        <p className="text-gray-400 font-serif italic text-lg leading-relaxed">
          "Music is the language of our feelings, and this playlist is my heart's message to you. Play it whenever you miss me."
        </p>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Music;
