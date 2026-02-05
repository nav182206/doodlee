
import React, { useState } from 'react';
import { PhotoCategory } from '../types';

const Gallery: React.FC = () => {
  const categories: { label: string; value: PhotoCategory; description: string; emoji: string }[] = [
    { 
      label: 'Childhood', 
      value: 'Childhood', 
      emoji: '🧸',
      description: "A trip down memory lane to where it all began. The purest smiles and the sweetest memories." 
    },
    { 
      label: 'Growing Years', 
      value: 'Growing Years', 
      emoji: '🌱',
      description: "Watching you transform into the incredible woman you are today has been a beautiful journey." 
    },
    { 
      label: 'Present Her', 
      value: 'Present Her', 
      emoji: '✨',
      description: "Radiant, beautiful, and the light of my life. This is you, in all your glory." 
    },
    { 
      label: 'Our Pictures', 
      value: 'Our Journey', 
      emoji: '📸',
      description: "Every frame is a heartbeat, every picture is a story of us. Our favorite moments together." 
    }
  ];

  const [activeTab, setActiveTab] = useState<PhotoCategory>('Childhood');

  // Specific links provided by the user
  const CHILDHOOD_LINK = 'https://photos.app.goo.gl/EJ8nUY5TWj65YWKT9';
  const GROWING_YEARS_LINK = 'https://photos.app.goo.gl/w8S7NMv45PMx1UybA';
  const OUR_PICTURES_LINK = 'https://photos.app.goo.gl/6nSxf6zhD9PrYUFa9';
  const PRESENT_HER_LINK = 'https://photos.app.goo.gl/B5qCHo52AnLtgU776';

  const albumLinks: Record<PhotoCategory, string> = {
    'Childhood': CHILDHOOD_LINK,
    'Growing Years': GROWING_YEARS_LINK,
    'Present Her': PRESENT_HER_LINK,
    'Our Journey': OUR_PICTURES_LINK
  };

  const currentCategory = categories.find(c => c.value === activeTab)!;
  const currentLink = albumLinks[activeTab];

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 relative pb-40">
      {/* Header */}
      <div className="text-center mb-10 md:mb-14 space-y-6">
        <div className="space-y-4">
          <h2 className="text-4xl md:text-6xl font-serif-elegant font-bold text-gray-900 tracking-tight">Our Story Albums</h2>
          <p className="text-gray-500 font-light max-w-lg mx-auto italic text-base md:text-lg">
            "I've organized our memories into special collections for you to explore."
          </p>
        </div>
        
        {/* snappier tab navigation */}
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map(cat => (
            <button
              key={cat.value}
              onClick={() => setActiveTab(cat.value)}
              className={`px-4 py-2.5 rounded-2xl text-[10px] md:text-xs font-black uppercase tracking-widest transition-all duration-200 border-2 ${
                activeTab === cat.value 
                ? 'bg-blue-600 text-white border-blue-600 shadow-xl scale-105' 
                : 'bg-white text-blue-400 border-transparent hover:border-blue-100 hover:text-blue-500'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Album Invitation Card - Cleaned from side decorations */}
      <div className="relative group animate-in zoom-in duration-300">
        <div className="absolute inset-0 bg-blue-100/30 blur-[60px] -z-10 rounded-full"></div>
        
        <div className="bg-white/90 backdrop-blur-xl border-4 border-white rounded-[3rem] md:rounded-[4rem] p-8 md:p-16 shadow-2xl text-center space-y-8 transition-shadow duration-300">
          <div className="space-y-4">
            <div className="text-7xl md:text-8xl mb-2">
              {currentCategory.emoji}
            </div>
            <h3 className="text-3xl md:text-5xl font-serif-elegant font-bold text-gray-800 italic">
              {currentCategory.label}
            </h3>
            <p className="text-gray-500 text-base md:text-lg font-light italic max-w-xl mx-auto leading-relaxed">
              "{currentCategory.description}"
            </p>
          </div>

          <div className="flex flex-col items-center gap-6">
            <a 
              href={currentLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="group relative w-full md:w-auto px-10 py-5 bg-blue-600 text-white rounded-full font-black uppercase tracking-widest text-xs md:text-sm shadow-xl hover:bg-blue-700 hover:-translate-y-1 active:scale-95 transition-all flex items-center justify-center gap-3 overflow-hidden"
            >
              <span className="relative z-10">Open Photo Album</span>
              <svg className="w-4 h-4 md:w-5 md:h-5 z-10 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
            
            <div className="flex items-center gap-4 text-slate-300">
              <div className="h-px w-8 bg-slate-100"></div>
              <p className="text-[8px] md:text-[10px] uppercase tracking-[0.4em] font-black">Private Album</p>
              <div className="h-px w-8 bg-slate-100"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
