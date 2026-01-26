
import React, { useState, useEffect, useRef } from 'react';
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
  const [selectedPhoto, setSelectedPhoto] = useState<{url: string, caption: string, secret?: string} | null>(null);
  const [localImages, setLocalImages] = useState<Record<string, string>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadingId, setUploadingId] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('sweeta_birthday_pics');
    if (saved) {
      try {
        setLocalImages(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load local images");
      }
    }
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && uploadingId) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        const newLocalImages = { ...localImages, [uploadingId]: base64String };
        setLocalImages(newLocalImages);
        localStorage.setItem('sweeta_birthday_pics', JSON.stringify(newLocalImages));
        setUploadingId(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerUpload = (id: string) => {
    setUploadingId(id);
    fileInputRef.current?.click();
  };

  const filteredPhotos = PHOTOS.filter(p => p.category === activeTab);

  return (
    <div className="max-w-7xl mx-auto px-6 relative pb-20">
      <input 
        type="file" 
        ref={fileInputRef} 
        className="hidden" 
        accept="image/*" 
        onChange={handleFileUpload}
      />

      {/* Image Preview Modal */}
      {selectedPhoto && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 bg-black/95 backdrop-blur-xl animate-in fade-in duration-300"
          onClick={() => setSelectedPhoto(null)}
        >
          <button 
            className="absolute top-6 right-6 text-white/50 hover:text-white text-4xl z-[110] transition-colors"
            onClick={() => setSelectedPhoto(null)}
          >
            ✕
          </button>
          
          <div 
            className="relative max-w-5xl w-full h-full flex flex-col items-center justify-center gap-6 animate-in zoom-in duration-300"
            onClick={e => e.stopPropagation()}
          >
            <div className="relative group w-full h-[70vh] flex items-center justify-center">
               <img 
                src={selectedPhoto.url} 
                alt={selectedPhoto.caption}
                className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl border-4 border-white/10"
              />
            </div>
            
            <div className="text-center space-y-4 max-w-2xl px-4">
              <h3 className="text-3xl md:text-4xl font-serif-elegant font-bold text-white italic">
                "{selectedPhoto.caption}"
              </h3>
              {selectedPhoto.secret && (
                <div className="p-6 bg-blue-500/20 border border-blue-400/30 rounded-3xl backdrop-blur-md">
                   <p className="text-blue-200 text-xl font-cursive">
                     {selectedPhoto.secret}
                   </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="text-center mb-16 space-y-4">
        <h2 className="text-5xl md:text-7xl font-serif-elegant font-bold text-gray-900 italic tracking-tight">Our Story Gallery</h2>
        <p className="text-gray-500 font-light max-w-xl mx-auto italic text-lg">
          Upload 6 photos for each chapter to complete the journey... 💙
        </p>
        
        <div className="flex flex-wrap justify-center gap-3 mt-12">
          {categories.map(cat => (
            <button
              key={cat.value}
              onClick={() => setActiveTab(cat.value)}
              className={`px-8 py-3 rounded-2xl text-sm font-bold tracking-widest uppercase transition-all duration-300 border-2 ${
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {filteredPhotos.map((photo, index) => {
          const displayUrl = localImages[photo.url];
          const needsUpload = !displayUrl;

          return (
            <div 
              key={index}
              className={`relative overflow-hidden rounded-[3rem] bg-white border-4 border-white shadow-xl hover:shadow-2xl transition-all duration-500 group aspect-[4/5] ${needsUpload ? 'bg-blue-50/50 border-dashed border-blue-200' : ''}`}
            >
              {needsUpload ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center space-y-6">
                  <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center text-blue-500 animate-pulse text-3xl">📸</div>
                  <div className="space-y-2">
                    <h4 className="font-bold text-gray-800 text-xl">{photo.caption}</h4>
                    <p className="text-blue-300 text-sm italic">Slot {index + 1} of 6</p>
                  </div>
                  <button 
                    onClick={() => triggerUpload(photo.url)}
                    className="px-8 py-3 bg-blue-500 text-white rounded-full font-bold text-sm shadow-lg hover:bg-blue-600 active:scale-95 transition-all flex items-center gap-2"
                  >
                    <span>Choose Photo</span>
                  </button>
                </div>
              ) : (
                <div 
                  className="h-full cursor-pointer relative"
                  onClick={() => setSelectedPhoto({ url: displayUrl, caption: photo.caption, secret: photo.secretMessage })}
                >
                  <img 
                    src={displayUrl} 
                    alt={photo.caption}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  
                  {/* Edit Button */}
                  <button 
                    onClick={(e) => { e.stopPropagation(); triggerUpload(photo.url); }}
                    className="absolute top-6 right-6 z-10 w-12 h-12 bg-white/40 hover:bg-white/90 backdrop-blur-md rounded-full text-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg"
                    title="Change Photo"
                  >
                    🔄
                  </button>

                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-10">
                    <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                      <p className="text-white text-2xl font-serif-elegant italic leading-tight">"{photo.caption}"</p>
                      <div className="flex items-center gap-2 mt-4">
                        <div className="w-10 h-1 bg-blue-400 rounded-full"></div>
                        <span className="text-blue-200 text-xs font-bold uppercase tracking-widest">Click to view large</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      <div className="mt-20 text-center">
        <p className="text-blue-300 font-serif italic text-xl">
          "Every picture tells a story, and ours is my favorite one."
        </p>
      </div>
    </div>
  );
};

export default Gallery;
