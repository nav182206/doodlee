
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

  const albumLinks: Record<PhotoCategory, string> = {
    'Childhood': 'https://photos.app.goo.gl/EJ8nUY5TWj65YWKT9',
    'Growing Years': 'https://photos.app.goo.gl/w8S7NMv45PMx1UybA',
    'Present Her': 'https://photos.app.goo.gl/B5qCHo52AnLtgU776',
    'Our Journey': 'https://photos.app.goo.gl/6nSxf6zhD9PrYUFa9'
  };

  const currentCategory = categories.find(c => c.value === activeTab)!;
  const currentLink = albumLinks[activeTab];

  return (
    <div className="max-w-4xl mx-auto px-4 relative pb-40">
      {/* Clean Header */}
      <div className="text-center mb-10 space-y-6">
        <div className="space-y-3">
          <h2 className="text-4xl md:text-6xl font-serif-elegant font-bold text-slate-900 tracking-tight">Our Memories</h2>
          <p className="text-slate-500 font-light max-w-md mx-auto italic text-sm md:text-base">
            "Every photo holds a special place in my heart."
          </p>
        </div>
        
        {/* Snappy Tab Switches */}
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map(cat => (
            <button
              key={cat.value}
              onClick={() => setActiveTab(cat.value)}
              className={`px-5 py-3 rounded-2xl text-[10px] md:text-xs font-black uppercase tracking-widest transition-all duration-150 border-2 ${
                activeTab === cat.value 
                ? 'bg-blue-600 text-white border-blue-600 shadow-md scale-105' 
                : 'bg-white text-slate-400 border-slate-100 hover:border-blue-100 hover:text-blue-600'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Album Card - Fast Render */}
      <div key={activeTab} className="relative animate-in zoom-in-95 duration-200">
        <div className="bg-white border-2 border-slate-50 rounded-[2.5rem] p-10 md:p-16 shadow-lg text-center space-y-8">
          <div className="space-y-4">
            <div className="text-7xl md:text-8xl mb-2">
              {currentCategory.emoji}
            </div>
            <h3 className="text-3xl md:text-4xl font-serif-elegant font-bold text-slate-800 italic">
              {currentCategory.label}
            </h3>
            <p className="text-slate-500 text-sm md:text-base font-light italic max-w-sm mx-auto leading-relaxed">
              "{currentCategory.description}"
            </p>
          </div>

          <div className="flex flex-col items-center gap-6">
            <a 
              href={currentLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full md:w-auto px-12 py-5 bg-blue-600 text-white rounded-full font-black uppercase tracking-widest text-xs shadow-lg hover:bg-blue-700 hover:-translate-y-0.5 active:scale-95 transition-all flex items-center justify-center gap-3"
            >
              <span>Explore Album</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
            <p className="text-[9px] text-slate-300 font-bold uppercase tracking-[0.4em]">Personal Collection Link</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
