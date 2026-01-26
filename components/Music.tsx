
import React, { useState, useEffect } from 'react';
import { Song } from '../types';

const SLOT_COUNT = 18;

const Music: React.FC = () => {
  // Initialize 18 empty slots
  const [songs, setSongs] = useState<(Song | null)[]>(Array(SLOT_COUNT).fill(null));
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [editingIdx, setEditingIdx] = useState<number | null>(null);
  const [tempUrl, setTempUrl] = useState('');
  const [error, setError] = useState('');

  // Sync with Local Storage
  useEffect(() => {
    const saved = localStorage.getItem('sweeta_birthday_18_tracks');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const validated = Array(SLOT_COUNT).fill(null).map((_, i) => parsed[i] || null);
        setSongs(validated);
        
        // Find first available song to set as active initially
        const firstFilled = validated.findIndex(s => s !== null);
        if (firstFilled !== -1) setActiveIdx(firstFilled);
      } catch (e) {
        console.error("Storage error", e);
      }
    }
  }, []);

  const saveTracks = (updated: (Song | null)[]) => {
    setSongs(updated);
    localStorage.setItem('sweeta_birthday_18_tracks', JSON.stringify(updated));
  };

  const getEmbedUrl = (url: string) => {
    if (!url) return null;
    // Handle already embedded links
    if (url.includes('spotify.com/embed')) return url;
    
    // Extract ID from various Spotify URL formats (track, playlist, album)
    const match = url.match(/spotify\.com\/(track|playlist|album|artist)\/([a-zA-Z0-9]+)/);
    if (match) {
      const type = match[1];
      const id = match[2];
      return `https://open.spotify.com/embed/${type}/${id}?utm_source=generator&theme=0`;
    }
    return null;
  };

  const handleAddSong = () => {
    const embed = getEmbedUrl(tempUrl);
    if (!embed || editingIdx === null) {
      setError('Please enter a valid Spotify Link');
      setTimeout(() => setError(''), 3000);
      return;
    }

    const newSong: Song = {
      id: `track-${editingIdx}-${Date.now()}`,
      title: `Track #${editingIdx + 1}`,
      artist: "Selected for You",
      cover: `https://picsum.photos/seed/${editingIdx}/400/400`, // Placeholder cover
      spotifyUrl: embed
    };

    const updated = [...songs];
    updated[editingIdx] = newSong;
    saveTracks(updated);
    
    setTempUrl('');
    setEditingIdx(null);
    setActiveIdx(editingIdx);
  };

  const removeTrack = (idx: number) => {
    const updated = [...songs];
    updated[idx] = null;
    saveTracks(updated);
  };

  const activeSong = songs[activeIdx];

  return (
    <div className="w-full max-w-7xl mx-auto space-y-12 pb-32 px-4 md:px-0">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 border-b border-green-100 pb-12">
        <div className="flex items-center gap-6">
          <div className="relative">
            <div className="w-20 h-20 bg-green-500 rounded-[2.5rem] flex items-center justify-center text-white text-4xl shadow-2xl shadow-green-200">
              <span className="animate-pulse">📻</span>
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center text-xs font-black text-green-600 shadow-lg border border-green-50">
              18
            </div>
          </div>
          <div>
            <h2 className="text-5xl font-serif-elegant font-bold text-gray-900 tracking-tight">The Soundtrack of Us</h2>
            <p className="text-green-600 font-medium italic mt-1">18 songs, 18 memories, one love 💙</p>
          </div>
        </div>
        
        <div className="hidden lg:flex items-center gap-2">
          <div className="px-6 py-3 bg-white border border-green-100 rounded-full text-xs font-bold uppercase tracking-widest text-green-400">
            {songs.filter(s => s !== null).length} / 18 Slots Filled
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Main Stage: The Active Player */}
        <div className="lg:w-2/3 space-y-8">
          <div className="relative group">
            {/* Glossy Backdrop */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-100/50 to-blue-100/50 blur-[100px] opacity-40 -z-10 rounded-full"></div>
            
            <div className="bg-white rounded-[4rem] p-6 shadow-2xl border-4 border-white overflow-hidden transition-all duration-500 hover:shadow-green-100/50">
              {activeSong ? (
                <div className="space-y-6">
                  <iframe 
                    src={activeSong.spotifyUrl} 
                    width="100%" 
                    height="380" 
                    frameBorder="0" 
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                    loading="lazy"
                    className="rounded-[3rem] shadow-sm"
                  ></iframe>
                </div>
              ) : (
                <div className="h-[380px] flex flex-col items-center justify-center bg-gray-50 rounded-[3rem] border-4 border-dashed border-gray-100 group-hover:border-green-200 transition-colors">
                  <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-4xl shadow-lg mb-6 group-hover:scale-110 transition-transform">🎧</div>
                  <p className="font-serif-elegant italic text-2xl text-gray-400">Select a memory from your 18 slots</p>
                </div>
              )}
            </div>
          </div>

          {/* Player Info bar */}
          <div className="flex items-center justify-between p-8 bg-white/60 backdrop-blur-xl rounded-[3rem] border border-white shadow-xl">
             <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-green-50 rounded-[1.5rem] flex items-center justify-center text-green-500 font-black text-2xl">
                  {activeIdx + 1}
                </div>
                <div>
                   <h3 className="text-2xl font-serif-elegant font-bold text-gray-800">
                     {activeSong ? activeSong.title : "Ready for your pick..."}
                   </h3>
                   <p className="text-green-500 font-bold uppercase tracking-[0.2em] text-[10px] mt-1">
                     {activeSong ? "Now Streaming Your Vibe" : "Pick a slot on the right to start"}
                   </p>
                </div>
             </div>
             
             {activeSong && (
               <div className="flex items-end gap-1.5 h-10">
                  {[0.4, 0.7, 0.5, 0.9, 0.6, 0.8].map((h, i) => (
                    <div 
                      key={i} 
                      className="w-1.5 bg-green-400 rounded-full animate-bounce"
                      style={{ height: `${h * 100}%`, animationDelay: `${i * 0.1}s`, animationDuration: '0.8s' }}
                    ></div>
                  ))}
               </div>
             )}
          </div>
        </div>

        {/* The 18 Grid: Track Selection */}
        <div className="lg:w-1/3">
          <div className="bg-white/40 backdrop-blur-2xl rounded-[4rem] p-8 border border-white shadow-2xl sticky top-8">
            <div className="flex items-center justify-between mb-8 px-2">
               <h4 className="text-xs font-black uppercase tracking-[0.4em] text-gray-400">Your 18 Selections</h4>
               <div className="w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
            </div>

            <div className="grid grid-cols-1 gap-3 max-h-[600px] overflow-y-auto pr-4 custom-scrollbar">
              {songs.map((song, idx) => (
                <div key={idx} className="relative group">
                  <button
                    onClick={() => song ? setActiveIdx(idx) : setEditingIdx(idx)}
                    className={`w-full flex items-center gap-4 p-4 rounded-[2rem] transition-all duration-300 border-2 ${
                      activeIdx === idx 
                        ? 'bg-green-500 border-green-400 text-white shadow-lg scale-[1.03] z-10' 
                        : song 
                          ? 'bg-white/80 border-transparent hover:border-green-100 text-gray-600 hover:shadow-xl'
                          : 'bg-white/30 border-dashed border-gray-200 text-gray-300 hover:border-green-200'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-sm transition-all ${
                      activeIdx === idx ? 'bg-white/20' : song ? 'bg-green-50 text-green-500' : 'bg-gray-100 text-gray-200'
                    }`}>
                      {song ? "🎵" : idx + 1}
                    </div>

                    <div className="text-left flex-grow truncate">
                      <div className={`font-bold text-sm ${activeIdx === idx ? 'text-white' : song ? 'text-gray-900' : 'text-gray-300'} truncate`}>
                        {song ? `Track #${idx + 1}` : "Empty Slot"}
                      </div>
                      <div className={`text-[9px] font-black uppercase tracking-widest ${activeIdx === idx ? 'text-green-100' : 'text-green-400'}`}>
                        {song ? "PLAY NOW" : "Click to Add Link"}
                      </div>
                    </div>

                    {!song && (
                      <div className="w-8 h-8 bg-white/50 rounded-full flex items-center justify-center text-green-500 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
                        +
                      </div>
                    )}
                  </button>

                  {/* Actions for filled slots */}
                  {song && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1 opacity-0 group-hover:opacity-100 transition-all">
                       <button 
                        onClick={(e) => { e.stopPropagation(); setEditingIdx(idx); }}
                        className="w-8 h-8 bg-white text-blue-500 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-50"
                        title="Edit Link"
                       >
                         ✏️
                       </button>
                       <button 
                        onClick={(e) => { e.stopPropagation(); removeTrack(idx); }}
                        className="w-8 h-8 bg-white text-rose-500 rounded-full flex items-center justify-center shadow-lg hover:bg-rose-50"
                        title="Remove"
                       >
                         🗑️
                       </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {editingIdx !== null && (
        <div 
          className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-green-900/20 backdrop-blur-md animate-in fade-in duration-300"
          onClick={() => setEditingIdx(null)}
        >
          <div 
            className="w-full max-w-md bg-white rounded-[3.5rem] p-12 shadow-2xl border border-green-50 animate-in zoom-in duration-300"
            onClick={e => e.stopPropagation()}
          >
            <div className="text-center space-y-4 mb-8">
               <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center text-4xl mx-auto shadow-inner">✨</div>
               <h3 className="text-3xl font-serif-elegant font-bold text-gray-900">Add Track #{editingIdx + 1}</h3>
               <p className="text-gray-400 italic text-sm">Paste any Spotify track, playlist, or album link</p>
            </div>
            
            <div className="space-y-6">
              <input 
                autoFocus
                type="text" 
                value={tempUrl}
                onChange={(e) => setTempUrl(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddSong()}
                placeholder="https://open.spotify.com/track/..."
                className="w-full px-8 py-5 rounded-[2rem] bg-gray-50 border-2 border-transparent focus:border-green-400 focus:bg-white outline-none transition-all font-medium text-gray-600"
              />
              
              {error && <p className="text-rose-500 text-xs font-bold text-center animate-bounce">{error}</p>}
              
              <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={() => setEditingIdx(null)}
                  className="py-5 rounded-[2rem] font-bold text-gray-400 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleAddSong}
                  className="py-5 bg-green-500 text-white rounded-[2rem] font-bold shadow-xl shadow-green-100 hover:bg-green-600 active:scale-95 transition-all"
                >
                  Save to Playlist
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #dcfce7; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
      `}</style>
    </div>
  );
};

export default Music;
