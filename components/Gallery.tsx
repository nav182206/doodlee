
import React, { useState, useEffect, useRef } from 'react';
import { PHOTOS } from '../photosData';
import { PhotoCategory } from '../types';

interface GalleryProps {
  editMode: boolean;
  onSave: () => void;
}

const Gallery: React.FC<GalleryProps> = ({ editMode, onSave }) => {
  const categories: { label: string; value: PhotoCategory }[] = [
    { label: 'Childhood', value: 'Childhood' },
    { label: 'Growing Years', value: 'Growing Years' },
    { label: 'Present Her', value: 'Present Her' },
    { label: 'Our Pictures', value: 'Our Journey' }
  ];

  const [activeTab, setActiveTab] = useState<PhotoCategory>('Childhood');
  const [selectedPhoto, setSelectedPhoto] = useState<{url: string, caption: string, secret?: string} | null>(null);
  const [localImages, setLocalImages] = useState<Record<string, string>>({});
  const [albumLinks, setAlbumLinks] = useState<Record<string, string>>({
    'Childhood': 'https://photos.app.goo.gl/aYEYYcGjPgEwFi1i9'
  });
  const [tempLink, setTempLink] = useState('');
  const [showLinkEditor, setShowLinkEditor] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadingId, setUploadingId] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const savedPics = localStorage.getItem('sweeta_birthday_pics_v3');
    const savedLinks = localStorage.getItem('sweeta_album_links_v1');
    
    if (savedPics) {
      try { setLocalImages(JSON.parse(savedPics)); } catch (e) { console.error(e); }
    }
    if (savedLinks) {
      try { 
        const parsedLinks = JSON.parse(savedLinks);
        setAlbumLinks(prev => ({ ...prev, ...parsedLinks })); 
      } catch (e) { console.error(e); }
    }
  }, []);

  useEffect(() => {
    setTempLink(albumLinks[activeTab] || '');
  }, [activeTab, albumLinks]);

  const saveAlbumLink = () => {
    const updatedLinks = { ...albumLinks, [activeTab]: tempLink };
    setAlbumLinks(updatedLinks);
    localStorage.setItem('sweeta_album_links_v1', JSON.stringify(updatedLinks));
    setShowLinkEditor(false);
    onSave();
  };

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
    if (file && uploadingId) {
      setIsProcessing(true);
      const reader = new FileReader();
      reader.onloadend = async () => {
        try {
          const base64String = reader.result as string;
          const compressed = await compressImage(base64String);
          setLocalImages(prev => {
            const updated = { ...prev, [uploadingId]: compressed };
            localStorage.setItem('sweeta_birthday_pics_v3', JSON.stringify(updated));
            return updated;
          });
          onSave();
        } catch (error) {
          console.error("Save error:", error);
          alert("Could not save photo. Try a smaller file.");
        } finally {
          setUploadingId(null);
          setIsProcessing(false);
          if (fileInputRef.current) fileInputRef.current.value = '';
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerUpload = (id: string) => {
    if (!editMode) return;
    setUploadingId(id);
    fileInputRef.current?.click();
  };

  const filteredPhotos = PHOTOS.filter(p => p.category === activeTab);
  const currentAlbumLink = albumLinks[activeTab];

  return (
    <div className="max-w-7xl mx-auto px-6 relative pb-20">
      <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileUpload} />

      {isProcessing && (
        <div className="fixed inset-0 z-[250] bg-white/80 backdrop-blur-sm flex items-center justify-center flex-col gap-4">
          <div className="w-16 h-16 border-4 border-blue-100 border-t-blue-500 rounded-full animate-spin"></div>
          <p className="font-bold text-blue-600 animate-pulse">Safely Storing Memory...</p>
        </div>
      )}

      {selectedPhoto && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 bg-black/95 backdrop-blur-xl animate-in fade-in duration-300" onClick={() => setSelectedPhoto(null)}>
          <button className="absolute top-6 right-6 text-white/50 hover:text-white text-4xl z-[110]">✕</button>
          <div className="relative max-w-5xl w-full h-full flex flex-col items-center justify-center gap-6" onClick={e => e.stopPropagation()}>
            <img src={selectedPhoto.url} alt={selectedPhoto.caption} className="max-w-full max-h-[70vh] object-contain rounded-2xl shadow-2xl border-4 border-white/10" />
            <div className="text-center space-y-4 max-w-2xl px-4">
              <h3 className="text-3xl md:text-4xl font-serif-elegant font-bold text-white italic">"{selectedPhoto.caption}"</h3>
              {selectedPhoto.secret && (
                <div className="p-6 bg-blue-500/20 border border-blue-400/30 rounded-3xl backdrop-blur-md">
                   <p className="text-blue-200 text-xl font-cursive">{selectedPhoto.secret}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="text-center mb-16 space-y-8">
        <div className="space-y-4">
          <h2 className="text-5xl md:text-7xl font-serif-elegant font-bold text-gray-900 italic tracking-tight">Our Story Gallery</h2>
          <p className="text-gray-500 font-light max-w-xl mx-auto italic text-lg">
            {activeTab === 'Childhood' 
              ? "One precious highlight, plus a link to see your whole beautiful childhood... 💙"
              : "A collection of our most beautiful chapters."}
          </p>
        </div>
        
        <div className="flex flex-col items-center gap-8">
          <div className="flex flex-wrap justify-center gap-3">
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

          <div className="flex flex-col items-center gap-4">
            {currentAlbumLink && !showLinkEditor && (
              <a 
                href={currentAlbumLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex items-center gap-3 px-10 py-4 bg-white border-2 border-blue-100 rounded-full text-blue-500 font-bold hover:bg-blue-500 hover:text-white hover:border-blue-500 transition-all shadow-lg hover:shadow-blue-200 animate-bounce"
              >
                <span className="text-xl">🔗</span>
                <span className="uppercase tracking-widest text-xs">View Full {activeTab} Album</span>
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            )}

            {editMode && (
              <button onClick={() => setShowLinkEditor(!showLinkEditor)} className="text-xs font-black uppercase tracking-[0.2em] text-blue-300 hover:text-blue-500 transition-colors underline underline-offset-4">
                {currentAlbumLink ? 'Change Album Link' : 'Add Album Link'}
              </button>
            )}

            {editMode && showLinkEditor && (
              <div className="flex w-full max-w-md gap-2 animate-in slide-in-from-top-2 duration-300">
                <input 
                  type="text" 
                  value={tempLink} 
                  onChange={(e) => setTempLink(e.target.value)}
                  placeholder="Paste Google Photos Link..."
                  className="flex-grow px-6 py-3 rounded-2xl bg-white border-2 border-blue-100 focus:border-blue-400 outline-none text-sm"
                />
                <button onClick={saveAlbumLink} className="px-6 py-3 bg-blue-500 text-white rounded-2xl font-bold text-xs">Save</button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 ${filteredPhotos.length === 1 ? 'flex justify-center' : ''}`}>
        {filteredPhotos.map((photo, index) => {
          const displayUrl = localImages[photo.url];
          const needsUpload = !displayUrl;
          if (needsUpload && !editMode) return null;

          return (
            <div 
              key={photo.url}
              className={`relative overflow-hidden rounded-[3rem] bg-white border-4 border-white shadow-xl hover:shadow-2xl transition-all duration-500 group aspect-[4/5] ${needsUpload ? 'bg-blue-50/50 border-dashed border-blue-200' : ''} ${filteredPhotos.length === 1 ? 'max-w-sm mx-auto' : ''}`}
            >
              {needsUpload ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center space-y-6">
                  <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center text-blue-500 animate-pulse text-3xl">📸</div>
                  <div className="space-y-2">
                    <h4 className="font-bold text-gray-800 text-xl">{photo.caption}</h4>
                    <p className="text-blue-300 text-sm italic">Featured Photo</p>
                  </div>
                  <button onClick={() => triggerUpload(photo.url)} className="px-8 py-3 bg-blue-500 text-white rounded-full font-bold text-sm shadow-lg hover:bg-blue-600 transition-all">
                    Choose Photo
                  </button>
                </div>
              ) : (
                <div className="h-full cursor-pointer relative" onClick={() => setSelectedPhoto({ url: displayUrl, caption: photo.caption, secret: photo.secretMessage })}>
                  <img src={displayUrl} alt={photo.caption} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                  {editMode && (
                    <button onClick={(e) => { e.stopPropagation(); triggerUpload(photo.url); }} className="absolute top-6 right-6 z-10 w-12 h-12 bg-white/40 hover:bg-white/90 backdrop-blur-md rounded-full text-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-lg">
                      🔄
                    </button>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-10">
                    <p className="text-white text-2xl font-serif-elegant italic">"{photo.caption}"</p>
                    <div className="flex items-center gap-2 mt-4">
                      <div className="w-10 h-1 bg-blue-400 rounded-full"></div>
                      <span className="text-blue-200 text-xs font-bold uppercase tracking-widest">Saved & Secure</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Gallery;
