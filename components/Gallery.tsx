
import React, { useState } from 'react';
import { PHOTOS } from '../photosData';
import { PhotoCategory, Photo } from '../types';

const Gallery: React.FC = () => {
  const categories: { label: string; value: PhotoCategory }[] = [
    { label: 'Childhood', value: 'Childhood' },
    { label: 'Growing Years', value: 'Growing Years' },
    { label: 'Present Her', value: 'Present Her' },
    { label: 'Our Pictures', value: 'Our Journey' }
  ];

  const [activeTab, setActiveTab] = useState<PhotoCategory>('Childhood');
  const [selectedSecret, setSelectedSecret] = useState<string | null>(null);

  const filteredPhotos = PHOTOS.filter(p => p.category === activeTab);

  return (
    <div className="max-w-7xl mx-auto px-6 relative">
      {/* Secret Message Modal */}
      {selectedSecret && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-rose-900/40 backdrop-blur-md animate-in fade-in duration-300"
          onClick={() => setSelectedSecret(null)}
        >
          <div 
            className="max-w-md w-full bg-white rounded-[2.5rem] p-10 text-center shadow-2xl border border-rose-100 animate-in zoom-in duration-300"
            onClick={e => e.stopPropagation()}
          >
            <div className="text-4xl mb-6">💌</div>
            <p className="text-2xl font-serif-elegant italic text-gray-800 leading-relaxed">
              "{selectedSecret}"
            </p>
            <button 
              onClick={() => setSelectedSecret(null)}
              className="mt-8 px-8 py-3 bg-rose-500 text-white rounded-full font-bold shadow-lg hover:bg-rose-600 transition-all"
            >
              Close with Love
            </button>
          </div>
        </div>
      )}

      <div className="text-center mb-16 space-y-4">
        <h2 className="text-5xl font-serif-elegant font-bold text-gray-900 italic tracking-tight">Chapters of You</h2>
        <p className="text-gray-500 font-light max-w-xl mx-auto italic">Tap the photos to find hidden messages from my heart...</p>
        
        <div className="flex flex-wrap justify-center gap-3 mt-12">
          {categories.map(cat => (
            <button
              key={cat.value}
              onClick={() => setActiveTab(cat.value)}
              className={`px-8 py-3 rounded-2xl text-sm font-bold tracking-widest uppercase transition-all duration-300 border-2 ${
                activeTab === cat.value 
                ? 'bg-rose-500 text-white border-rose-500 shadow-[0_10px_20px_rgba(225,29,72,0.2)] scale-105' 
                : 'bg-white text-rose-300 border-rose-50 hover:border-rose-200 hover:text-rose-500'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
        {filteredPhotos.map((photo, index) => (
          <div 
            key={index}
            onClick={() => photo.secretMessage && setSelectedSecret(photo.secretMessage)}
            className={`break-inside-avoid relative overflow-hidden rounded-[2.5rem] bg-rose-50 border-4 border-white shadow-xl hover:shadow-2xl transition-all duration-500 group ${photo.secretMessage ? 'cursor-help' : 'cursor-default'}`}
          >
            <img 
              src={photo.url} 
              alt={photo.caption}
              className="w-full h-auto object-cover transition-transform duration-1000 group-hover:scale-105"
              loading="lazy"
            />
            
            {/* Easter Egg Indicator */}
            {photo.secretMessage && (
              <div className="absolute top-6 right-6 w-8 h-8 bg-white/40 backdrop-blur-md rounded-full flex items-center justify-center text-white shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                ✨
              </div>
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-rose-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
              <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <p className="text-white text-xl font-serif-elegant italic">"{photo.caption}"</p>
                <div className="w-12 h-1 bg-rose-400 mt-4 rounded-full"></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredPhotos.length === 0 && (
        <div className="py-20 text-center text-rose-200 italic font-serif text-2xl">
          More memories coming soon...
        </div>
      )}
    </div>
  );
};

export default Gallery;
