
import React from 'react';

interface HeroProps {
  onStart: () => void;
  onLogout: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStart, onLogout }) => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4 relative">
      {/* Sign Out Button in the corner */}
      <button 
        onClick={onLogout}
        className="absolute top-0 right-0 group flex items-center gap-2 px-4 py-2 text-rose-400 hover:text-rose-600 font-bold text-xs uppercase tracking-widest transition-all"
      >
        <span>Sign Out</span>
        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
      </button>

      <div className="max-w-4xl space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
        {/* Subtle Badge */}
        <div className="inline-block p-4 px-8 rounded-full bg-white/60 backdrop-blur-md border border-rose-100 shadow-sm mb-2">
          <span className="text-xs md:text-sm font-bold uppercase tracking-[0.6em] text-rose-500">Today is for you</span>
        </div>
        
        {/* Main Heading */}
        <div className="space-y-6">
          <h1 className="text-5xl md:text-8xl font-serif-elegant italic text-gray-900 leading-tight">
            Happy Birthday, <br />
            <span className="text-blue-600 not-italic font-cursive font-bold drop-shadow-sm">Sweeta 💙</span>
          </h1>
          
          {/* Heart Divider */}
          <div className="flex items-center justify-center gap-4 py-4">
            <div className="h-px w-12 bg-rose-200"></div>
            <div className="text-blue-300">❦</div>
            <div className="h-px w-12 bg-rose-200"></div>
          </div>

          <p className="text-lg md:text-2xl text-gray-600 font-light max-w-3xl mx-auto leading-relaxed italic font-serif">
            I’ve gathered some of our most precious memories and a few little surprises to celebrate the most beautiful person in my life.
          </p>
        </div>

        {/* Action Button */}
        <div className="flex flex-col items-center gap-8 pt-6">
          <button 
            onClick={onStart}
            className="group relative px-12 py-5 bg-rose-500 text-white rounded-full font-bold text-lg shadow-[0_20px_40px_-10px_rgba(225,29,72,0.4)] hover:bg-rose-600 hover:shadow-[0_25px_50px_-12px_rgba(225,29,72,0.5)] transition-all transform hover:-translate-y-1 active:scale-95 flex items-center gap-3 overflow-hidden"
          >
            <span className="relative z-10">Begin Our Journey</span>
            <svg className="w-6 h-6 z-10 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
            <div className="absolute inset-0 bg-gradient-to-r from-rose-400 to-rose-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
          
          <div className="flex items-center gap-3 text-rose-300 font-serif italic text-base animate-pulse">
            <span>Use the dashboard on the side to explore more</span>
            <span className="text-xl">✨</span>
          </div>
        </div>
      </div>

      {/* Background Subtle Elements */}
      <div className="absolute top-1/4 -left-20 w-64 h-64 bg-rose-200/20 blur-[100px] rounded-full"></div>
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-blue-200/20 blur-[120px] rounded-full"></div>
    </div>
  );
};

export default Hero;
