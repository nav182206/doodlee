
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
const STORAGE_KEY = 'sweeta_special_moments_v3';

interface SpecialMomentsProps {
  editMode: boolean;
  onSave: () => void;
}

const SpecialMoments: React.FC<SpecialMomentsProps> = ({ editMode, onSave }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [specialPhotos, setSpecialPhotos] = useState<Record<number, string>>({});
  const [uploadingIdx, setUploadingIdx] = useState<number | null>(null);
  const [previewPhoto, setPreviewPhoto] = useState<{url: string, caption: string} | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Persistence: Load on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setSpecialPhotos(JSON.parse(saved));
      } catch (e) {
        console.error("Persistence Load Error:", e);
      }
    }
  }, []);

  const compressImage = (base64Str: string): Promise<string> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = base64Str;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 1000;
        let width = img.width;
        let height = img.height;
        if (width > MAX_WIDTH) {
          height *= MAX_WIDTH / width;
          width = MAX_WIDTH;
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.fillStyle = "white";
          ctx.fillRect(0, 0, width, height);
          ctx.drawImage(img, 0, 0, width, height);
        }
        resolve(canvas.toDataURL('image/jpeg', 0.6));
      };
    });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && uploadingIdx !== null) {
      setIsProcessing(true);
      const reader = new FileReader();
      reader.onloadend = async () => {
        try {
          const base64String = reader.result as string;
          const compressed = await compressImage(base64String);
          
          setSpecialPhotos(prev => {
            const updated = { ...prev, [uploadingIdx]: compressed };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
            return updated;
          });
          onSave();
        } catch (err) {
          alert("Storage limit reached! Please use a smaller file.");
        } finally {
          setUploadingIdx(null);
          setIsProcessing(false);
          if (fileInputRef.current) fileInputRef.current.value = '';
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerUpload = (idx: number) => {
    if (!editMode) return;
    setUploadingIdx(idx);
    fileInputRef.current?.click();
  };

  const removePhoto = (idx: number) => {
    const updatedPhotos = { ...specialPhotos };
    delete updatedPhotos[idx];
    setSpecialPhotos(updatedPhotos);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPhotos));
    onSave();
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
      <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileUpload} />

      {isProcessing && (
        <div className="fixed inset-0 z-[250] bg-white/80 backdrop-blur-sm flex items-center justify-center flex-col gap-4">
          <div className="w-16 h-16 border-4 border-blue-100 border-t-blue-500 rounded-full animate-spin"></div>
          <p className="font-bold text-blue-600 animate-pulse">Locking in Memory...</p>
        </div>
      )}

      {/* Image Preview Modal */}
      {previewPhoto && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-in fade-in duration-300" onClick={() => setPreviewPhoto(null)}>
          <button className="absolute top-6 right-6 text-white/50 hover:text-white text-4xl z-[110]">✕</button>
          <div className="relative max-w-4xl w-full flex flex-col items-center animate-in zoom-in duration-300" onClick={e => e.stopPropagation()}>
            <img src={previewPhoto.url} alt={previewPhoto.caption} className="max-w-full max-h-[80vh] object-contain rounded-3xl shadow-2xl border-4 border-white" />
            <h3 className="mt-8 text-3xl font-serif-elegant font-bold text-white italic text-center">{previewPhoto.caption}</h3>
          </div>
        </div>
      )}

      <div className="flex flex-col items-center text-center gap-4">
        <div className="w-20 h-20 bg-gradient-to-tr from-blue-400 to-indigo-500 rounded-[2rem] flex items-center justify-center text-white text-4xl shadow-2xl shadow-blue-200 animate-bounce">🎙️</div>
        <div>
          <h2 className="text-5xl font-serif-elegant font-bold text-gray-900">Special Moments</h2>
          <p className="text-blue-400 font-medium tracking-widest uppercase text-sm mt-2 italic">Your memories are saved safely 💙</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto">
        <div className={`group bg-white/70 backdrop-blur-md rounded-[3rem] p-10 border-2 transition-all duration-700 ${isPlaying ? 'border-blue-400 shadow-[0_30px_60px_-15px_rgba(59,130,246,0.3)] scale-[1.03]' : 'border-white shadow-xl hover:shadow-2xl'}`}>
          <div className="flex flex-col items-center gap-8">
            <button onClick={() => setIsPlaying(!isPlaying)} className={`w-32 h-32 rounded-full flex items-center justify-center transition-all duration-500 shadow-2xl ${isPlaying ? 'bg-blue-500 text-white rotate-[360deg]' : 'bg-blue-50 text-blue-500 hover:bg-blue-100 hover:scale-105'}`}>
              {isPlaying ? <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg> : <svg className="w-16 h-16 ml-2" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>}
            </button>
            <div className="text-center space-y-3">
              <h3 className="text-3xl font-serif-elegant font-bold text-gray-800">{BIRTHDAY_VOICE_NOTE.title}</h3>
              <div className="flex items-center justify-center gap-4">
                <span className="text-blue-400 font-bold uppercase tracking-widest text-xs">{BIRTHDAY_VOICE_NOTE.date}</span>
                <span className="w-1 h-1 bg-blue-200 rounded-full"></span>
                <span className="text-blue-300 font-bold text-xs">{BIRTHDAY_VOICE_NOTE.duration}</span>
              </div>
            </div>
          </div>
          <div className={`mt-10 overflow-hidden transition-all duration-1000 ease-in-out ${isPlaying ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="p-8 bg-blue-50/50 rounded-[2rem] border border-blue-100 italic font-serif text-gray-600 text-lg text-center">"{BIRTHDAY_VOICE_NOTE.transcript}"</div>
          </div>
        </div>
      </div>

      <div className="space-y-16">
        <div className="flex items-center gap-6 px-4">
          <div className="h-px flex-grow bg-blue-100"></div>
          <h3 className="text-3xl font-serif-elegant font-bold text-gray-800">Sweeta's Cutest Moments 💙</h3>
          <div className="h-px flex-grow bg-blue-100"></div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
          {Array.from({ length: SLOT_COUNT }).map((_, idx) => {
            const photoUrl = specialPhotos[idx];
            if (!photoUrl && !editMode) return null;

            return (
              <div key={idx} className={`group relative aspect-square bg-white p-4 rounded-[2.5rem] shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-blue-50 ${!photoUrl ? 'bg-blue-50/30 border-dashed border-blue-200' : ''}`}>
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-14 h-7 bg-white/60 backdrop-blur-sm border border-white shadow-sm rotate-2 z-20"></div>
                <div className="w-full h-full overflow-hidden rounded-[1.8rem] relative bg-gray-50 flex items-center justify-center">
                  {photoUrl ? (
                    <>
                      <img src={photoUrl} alt={captions[idx]} className="w-full h-full object-cover cursor-pointer" onClick={() => setPreviewPhoto({ url: photoUrl, caption: captions[idx] })} />
                      <div className="absolute inset-0 bg-blue-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-3">
                         <button onClick={() => setPreviewPhoto({ url: photoUrl, caption: captions[idx] })} className="bg-white text-blue-600 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest shadow-lg">View Large</button>
                         {editMode && (
                           <>
                             <button onClick={() => triggerUpload(idx)} className="bg-white/20 text-white px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest shadow-lg">Change</button>
                             <button onClick={() => removePhoto(idx)} className="bg-rose-500 text-white px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest shadow-lg">Remove</button>
                           </>
                         )}
                      </div>
                    </>
                  ) : (
                    <button onClick={() => triggerUpload(idx)} className="flex flex-col items-center gap-3 text-blue-200 hover:text-blue-500">
                      <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-2xl shadow-sm border border-blue-50 group-hover:animate-pulse">📸</div>
                      <span className="text-[10px] font-black uppercase tracking-[0.2em]">Add Slot {idx + 1}</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SpecialMoments;
