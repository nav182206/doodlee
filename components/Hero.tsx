
import React from 'react';

interface HeroProps {
  onStart: () => void;
  onLogout: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStart, onLogout }) => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-2 relative py-10">
      {/* Sign Out Button */}
      <button 
        onClick={onLogout}
        className="absolute top-0 right-0 group flex items-center gap-2 px-4 py-2 text-rose-400 hover:text-rose-600 font-bold text-[10px] uppercase tracking-widest transition-all"
      >
        <span>Sign Out</span>
        <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
      </button>

      <div className="max-w-4xl space-y-8 md:space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
        {/* Subtle Badge */}
        <div className="inline-block p-3 px-6 rounded-full bg-white/60 backdrop-blur-md border border-rose-100 shadow-sm mb-2">
          <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.5em] text-rose-500">Today is for you</span>
        </div>
        
        {/* Main Heading */}
        <div className="space-y-4 md:space-y-6">
          <h1 className="text-4xl md:text-8xl font-serif-elegant italic text-gray-900 leading-tight">
            Happy Birthday, <br />
            <span className="text-blue-600 not-italic font-cursive font-bold drop-shadow-sm text-5xl md:text-9xl">Sweeta 💙</span>
          </h1>
          
          {/* Heart Divider */}
          <div className="flex items-center justify-center gap-4 py-2">
            <div className="h-px w-8 md:w-12 bg-rose-200"></div>
            <div className="text-blue-300 text-sm">❦</div>
            <div className="h-px w-8 md:w-12 bg-rose-200"></div>
          </div>

          <p className="text-base md:text-2xl text-gray-600 font-light max-w-2xl mx-auto leading-relaxed italic font-serif px-4">
            "I’ve gathered our most precious memories and a few surprises to celebrate the person who makes my life beautiful."
          </p>
        </div>

        {/* Action Button */}
        <div className="flex flex-col items-center gap-6 pt-4">
          <button 
            onClick={onStart}
            className="group relative px-10 py-4 md:px-12 md:py-5 bg-rose-500 text-white rounded-full font-bold text-sm md:text-lg shadow-lg hover:bg-rose-600 transition-all active:scale-95 flex items-center gap-3 overflow-hidden"
          >
            <span className="relative z-10">Begin Our Journey</span>
            <svg className="w-5 h-5 z-10 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
          
          <div className="flex items-center gap-2 text-rose-300 font-serif italic text-sm animate-pulse">
            <span>Explore using the icons below</span>
            <span className="text-lg">✨</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
