
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
    <div className="max-w-4xl mx-auto px-6 relative pb-40">
      {/* Header */}
      <div className="text-center mb-16 space-y-8 animate-in fade-in slide-in-from-top-4 duration-700">
        <div className="space-y-4">
          <h2 className="text-5xl md:text-7xl font-serif-elegant font-bold text-gray-900 italic tracking-tight">Our Story Albums</h2>
          <p className="text-gray-500 font-light max-w-xl mx-auto italic text-lg leading-relaxed">
            I've organized our memories into special collections. Click on a category to open the full Google Photos album.
          </p>
        </div>
        
        {/* Custom Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map(cat => (
            <button
              key={cat.value}
              onClick={() => setActiveTab(cat.value)}
              className={`px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-[0.2em] transition-all duration-300 border-2 ${
                activeTab === cat.value 
                ? 'bg-blue-500 text-white border-blue-500 shadow-[0_10px_20px_rgba(59,130,246,0.2)] scale-105' 
                : 'bg-white text-blue-300 border-blue-50 hover:border-blue-200 hover:text-blue-500'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Album Invitation Card */}
      <div className="relative group animate-in zoom-in fade-in duration-500">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-indigo-500/20 blur-[100px] -z-10 rounded-full"></div>
        
        <div className="bg-white/80 backdrop-blur-xl border-4 border-white rounded-[4rem] p-12 md:p-20 shadow-2xl text-center space-y-10 hover:shadow-blue-200/50 transition-shadow">
          <div className="space-y-6">
            <div className="text-7xl md:text-9xl animate-float inline-block">
              {currentCategory.emoji}
            </div>
            <h3 className="text-4xl md:text-6xl font-serif-elegant font-bold text-gray-800 italic">
              {currentCategory.label}
            </h3>
            <p className="text-gray-500 text-lg md:text-xl font-light italic max-w-2xl mx-auto leading-relaxed">
              "{currentCategory.description}"
            </p>
          </div>

          <div className="flex flex-col items-center gap-6">
            <a 
              href={currentLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="group relative px-12 py-6 bg-blue-600 text-white rounded-full font-black uppercase tracking-widest text-sm shadow-[0_20px_40px_-10px_rgba(37,99,235,0.4)] hover:bg-blue-700 hover:shadow-[0_25px_50px_-12px_rgba(37,99,235,0.5)] transition-all transform hover:-translate-y-1 active:scale-95 flex items-center gap-4 overflow-hidden"
            >
              <span className="relative z-10">Open Google Photos Album</span>
              <svg className="w-5 h-5 z-10 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </a>
            
            <p className="text-blue-300 text-[10px] uppercase tracking-[0.4em] font-black flex items-center gap-2">
              <span className="w-8 h-px bg-blue-100"></span>
              Secure & Private Access
              <span className="w-8 h-px bg-blue-100"></span>
            </p>
          </div>
        </div>

        {/* Decorative Polaroids Peeking */}
        <div className="hidden lg:block absolute -left-20 top-20 w-48 h-56 bg-white p-4 shadow-xl -rotate-12 rounded-lg border border-gray-100 opacity-60">
            <div className="w-full h-4/5 bg-gray-100 rounded flex items-center justify-center text-4xl">🎞️</div>
        </div>
        <div className="hidden lg:block absolute -right-20 bottom-10 w-48 h-56 bg-white p-4 shadow-xl rotate-12 rounded-lg border border-gray-100 opacity-60">
            <div className="w-full h-4/5 bg-gray-100 rounded flex items-center justify-center text-4xl">🎞️</div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
