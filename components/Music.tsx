
import React from 'react';

const Music: React.FC = () => {
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

      {/* Main Playlist Player */}
      <div className="w-full max-w-3xl relative">
        <div className="absolute inset-0 bg-gradient-to-br from-green-100/50 to-blue-100/50 blur-[100px] opacity-40 -z-10 rounded-full"></div>
        <div className="bg-white rounded-[4rem] p-8 shadow-2xl border-4 border-white overflow-hidden transition-all duration-500 hover:shadow-green-100/50">
          <iframe 
            src={FIXED_PLAYLIST_URL} 
            width="100%" 
            height="450" 
            frameBorder="0" 
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
            loading="lazy"
            className="rounded-[3rem] shadow-sm"
          ></iframe>
        </div>
      </div>

      <div className="max-w-xl text-center">
        <p className="text-gray-400 font-serif italic text-lg leading-relaxed">
          "Music is the language of our feelings, and this playlist is my heart's message to you. Play it whenever you miss me."
        </p>
      </div>
    </div>
  );
};

export default Music;
