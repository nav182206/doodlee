
import React, { useState, useEffect, useRef } from 'react';
import { VoiceNote } from '../types';

const BIRTHDAY_VOICE_NOTE: VoiceNote = {
  id: 'special-wish',
  title: 'Your Birthday Wish from Me',
  date: 'Today',
  duration: '2:30',
  transcript: "Happy Birthday Sweeta! I recorded this to let you know that you are the light of my life. Every second with you is a gift, and I hope this year brings you as much joy as you've brought me. I love you more than words can say. 💙"
};

const SLOT_COUNT = 6;
const STORAGE_KEY = 'sweeta_special_moments_v2';

const SpecialMoments: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [specialPhotos, setSpecialPhotos] = useState<Record<number, string>>({});
  const [uploadingIdx, setUploadingIdx] = useState<number | null>(null);
  const [previewPhoto, setPreviewPhoto] = useState<{url: string, caption: string} | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load photos from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setSpecialPhotos(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load special photos");
      }
    }
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && uploadingIdx !== null) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        const updatedPhotos = { ...specialPhotos, [uploadingIdx]: base64String };
        setSpecialPhotos(updatedPhotos);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPhotos));
        setUploadingIdx(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerUpload = (idx: number) => {
    setUploadingIdx(idx);
    fileInputRef.current?.click();
  };

  const removePhoto = (idx: number) => {
    const updatedPhotos = { ...specialPhotos };
    delete updatedPhotos[idx];
    setSpecialPhotos(updatedPhotos);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPhotos));
  };

  const captions = [
    "The way you look at me",
    "Late night video calls",
    "That goofy face you make",
    "Pure happiness",
    "My favorite screenshot",
    "Waking up to your texts"
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 space-y-20 pb-32">
      {/* Hidden File Input */}
      <input 
        type="file" 
        ref={fileInputRef} 
        className="hidden" 
        accept="image/*" 
        onChange={handleFileUpload}
      />

      {/* Image Preview Modal */}
      {previewPhoto && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-in fade-in duration-300"
          onClick={() => setPreviewPhoto(null)}
        >
          <button 
            className="absolute top-6 right-6 text-white/50 hover:text-white text-4xl z-[110]"
            onClick={() => setPreviewPhoto(null)}
          >
            ✕
          </button>
          <div 
            className="relative max-w-4xl w-full flex flex-col items-center animate-in zoom-in duration-300"
            onClick={e => e.stopPropagation()}
          >
            <img 
              src={previewPhoto.url} 
              alt={previewPhoto.caption}
              className="max-w-full max-h-[80vh] object-contain rounded-3xl shadow-2xl border-4 border-white"
            />
            <h3 className="mt-8 text-3xl font-serif-elegant font-bold text-white italic text-center">
              {previewPhoto.caption}
            </h3>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col items-center text-center gap-4">
        <div className="w-20 h-20 bg-gradient-to-tr from-blue-400 to-indigo-500 rounded-[2rem] flex items-center justify-center text-white text-4xl shadow-2xl shadow-blue-200 animate-bounce">🎙️</div>
        <div>
          <h2 className="text-5xl font-serif-elegant font-bold text-gray-900">Special Moments</h2>
          <p className="text-blue-400 font-medium tracking-widest uppercase text-sm mt-2 italic">A whisper and a glance for Sweeta 💙</p>
        </div>
      </div>

      {/* Voice Note Player */}
      <div className="max-w-3xl mx-auto">
        <div className={`group bg-white/70 backdrop-blur-md rounded-[3rem] p-10 border-2 transition-all duration-700 ${
          isPlaying ? 'border-blue-400 shadow-[0_30px_60px_-15px_rgba(59,130,246,0.3)] scale-[1.03]' : 'border-white shadow-xl hover:shadow-2xl'
        }`}>
          <div className="flex flex-col items-center gap-8">
            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              className={`w-32 h-32 rounded-full flex items-center justify-center transition-all duration-500 shadow-2xl ${
                isPlaying ? 'bg-blue-500 text-white rotate-[360deg]' : 'bg-blue-50 text-blue-500 hover:bg-blue-100 hover:scale-105'
              }`}
            >
              {isPlaying ? (
                <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
              ) : (
                <svg className="w-16 h-16 ml-2" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
              )}
            </button>

            <div className="text-center space-y-3">
              <h3 className="text-3xl font-serif-elegant font-bold text-gray-800">{BIRTHDAY_VOICE_NOTE.title}</h3>
              <div className="flex items-center justify-center gap-4">
                <span className="text-blue-400 font-bold uppercase tracking-widest text-xs">{BIRTHDAY_VOICE_NOTE.date}</span>
                <span className="w-1 h-1 bg-blue-200 rounded-full"></span>
                <span className="text-blue-300 font-bold text-xs">{BIRTHDAY_VOICE_NOTE.duration}</span>
              </div>
            </div>

            {/* Audio Waveform */}
            <div className="flex items-center justify-center gap-1.5 h-16 w-full max-w-md px-4 overflow-hidden">
              {[...Array(30)].map((_, i) => (
                <div 
                  key={i} 
                  className={`w-1.5 rounded-full bg-blue-200 transition-all duration-500 ${isPlaying ? 'bg-blue-500' : ''}`}
                  style={{ 
                    height: isPlaying ? `${20 + Math.random() * 80}%` : '15%',
                    transitionDelay: `${i * 0.02}s`,
                    animation: isPlaying ? `waveform 1.2s ease-in-out infinite alternate` : 'none',
                    animationDelay: `${i * 0.05}s`
                  }}
                ></div>
              ))}
            </div>
          </div>

          <div className={`mt-10 overflow-hidden transition-all duration-1000 ease-in-out ${isPlaying ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="p-8 bg-blue-50/50 rounded-[2rem] border border-blue-100 italic font-serif text-gray-600 text-lg leading-relaxed text-center shadow-inner">
              "{BIRTHDAY_VOICE_NOTE.transcript}"
            </div>
          </div>
        </div>
      </div>

      {/* Uploadable Gallery Section */}
      <div className="space-y-16">
        <div className="flex items-center gap-6 px-4">
          <div className="h-px flex-grow bg-blue-100"></div>
          <h3 className="text-3xl font-serif-elegant font-bold text-gray-800">Sweeta's Cutest Moments 💙</h3>
          <div className="h-px flex-grow bg-blue-100"></div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
          {Array.from({ length: SLOT_COUNT }).map((_, idx) => {
            const photoUrl = specialPhotos[idx];
            return (
              <div 
                key={idx}
                className={`group relative aspect-square bg-white p-4 rounded-[2.5rem] shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-blue-50 ${!photoUrl ? 'bg-blue-50/30 border-dashed border-blue-200' : ''}`}
              >
                {/* Polaroid Tape Decor */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-14 h-7 bg-white/60 backdrop-blur-sm border border-white shadow-sm rotate-2 z-20"></div>

                <div className="w-full h-full overflow-hidden rounded-[1.8rem] relative bg-gray-50 flex items-center justify-center">
                  {photoUrl ? (
                    <>
                      <img 
                        src={photoUrl} 
                        alt={captions[idx]} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 cursor-pointer"
                        onClick={() => setPreviewPhoto({ url: photoUrl, caption: captions[idx] })}
                      />
                      {/* Overlay Controls */}
                      <div className="absolute inset-0 bg-blue-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-3">
                         <button 
                           onClick={() => setPreviewPhoto({ url: photoUrl, caption: captions[idx] })}
                           className="bg-white text-blue-600 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest shadow-lg hover:scale-105 transition-transform"
                         >
                           View Large
                         </button>
                         <button 
                           onClick={() => triggerUpload(idx)}
                           className="bg-white/20 text-white px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest shadow-lg hover:bg-white/40 transition-colors"
                         >
                           Change
                         </button>
                         <button 
                           onClick={() => removePhoto(idx)}
                           className="bg-rose-500 text-white px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest shadow-lg hover:bg-rose-600 transition-colors"
                         >
                           Remove
                         </button>
                      </div>
                      {/* Caption */}
                      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                        <p className="text-white text-[10px] font-black uppercase tracking-widest text-center truncate">{captions[idx]}</p>
                      </div>
                    </>
                  ) : (
                    <button 
                      onClick={() => triggerUpload(idx)}
                      className="flex flex-col items-center gap-3 text-blue-200 hover:text-blue-500 transition-colors"
                    >
                      <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-2xl shadow-sm border border-blue-50 group-hover:animate-pulse">
                        📸
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-[0.2em]">Add Slot {idx + 1}</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes waveform {
          from { height: 20%; }
          to { height: 100%; }
        }
      `}</style>
    </div>
  );
};

export default SpecialMoments;
