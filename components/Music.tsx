
import React, { useState } from 'react';
import { SONGS } from '../songsData';

const Music: React.FC = () => {
  const [activeSong, setActiveSong] = useState(0);

  return (
    <div className="w-full">
      <div className="flex items-center gap-4 mb-10">
        <div className="w-12 h-12 bg-rose-500 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg">🎵</div>
        <div>
          <h2 className="text-3xl font-serif-elegant font-bold text-gray-900">Our Soundtrack</h2>
          <p className="text-rose-400 font-medium">Melodies that hold our history</p>
        </div>
      </div>

      <div className="flex flex-col xl:flex-row gap-10 bg-white/40 backdrop-blur-2xl p-8 lg:p-12 rounded-[3.5rem] shadow-2xl border border-white/60">
        {/* Left: Current Song Display */}
        <div className="xl:w-5/12 flex flex-col items-center justify-center space-y-10 xl:border-r border-rose-100/50 xl:pr-12">
          <div className="relative w-full max-w-sm aspect-square group">
            <div className="absolute inset-0 bg-rose-400 rounded-[3rem] rotate-3 group-hover:rotate-6 transition-transform duration-700 shadow-2xl opacity-10"></div>
            <img 
              src={SONGS[activeSong].cover} 
              alt="Cover" 
              className="relative w-full h-full object-cover rounded-[3rem] shadow-2xl border-8 border-white"
            />
            <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-rose-500 text-white rounded-full flex items-center justify-center shadow-2xl animate-pulse">
              <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
            </div>
          </div>

          <div className="text-center w-full space-y-8">
            <div>
              <h3 className="text-4xl font-serif-elegant font-bold text-gray-900 leading-tight">{SONGS[activeSong].title}</h3>
              <p className="text-rose-500 font-bold text-xl uppercase tracking-widest mt-2">{SONGS[activeSong].artist}</p>
            </div>

            <div className="space-y-4">
              <div className="h-2 bg-rose-50 rounded-full overflow-hidden">
                <div className="h-full bg-rose-500 w-2/3 rounded-full shadow-[0_0_15px_rgba(225,29,72,0.4)]"></div>
              </div>
              <div className="flex justify-between text-xs font-black text-rose-300 uppercase tracking-widest">
                <span>02:45</span>
                <span>04:12</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-10">
              <button className="text-rose-200 hover:text-rose-500 transition-colors p-2">
                <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24"><path d="M6 18V6h2v12H6zm3.5-6L18 18V6l-8.5 6z"/></svg>
              </button>
              <button className="w-24 h-24 bg-rose-500 text-white rounded-full flex items-center justify-center shadow-[0_20px_40px_-10px_rgba(225,29,72,0.5)] hover:scale-110 active:scale-95 transition-all">
                <svg className="w-12 h-12 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
              </button>
              <button className="text-rose-200 hover:text-rose-500 transition-colors p-2">
                <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24"><path d="M16 18h2V6h-2v12zM6 18l8.5-6L6 6v12z"/></svg>
              </button>
            </div>
          </div>
        </div>

        {/* Right: Playlist Scroll */}
        <div className="xl:w-7/12 flex flex-col">
          <div className="flex items-center justify-between mb-8 px-4">
            <h4 className="text-sm font-black uppercase tracking-[0.2em] text-gray-400">Song Library</h4>
            <div className="h-px flex-grow mx-6 bg-rose-100/50"></div>
            <span className="text-xs font-bold text-rose-500 bg-rose-50 px-4 py-2 rounded-full ring-1 ring-rose-100">{SONGS.length} Items</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-1 gap-4 overflow-y-auto max-h-[600px] pr-4 custom-scrollbar">
            {SONGS.map((song, idx) => (
              <button 
                key={idx}
                onClick={() => setActiveSong(idx)}
                className={`w-full group flex items-center gap-6 p-5 rounded-3xl transition-all duration-300 ${
                  activeSong === idx 
                  ? 'bg-rose-500 text-white shadow-2xl scale-[1.02] z-10' 
                  : 'bg-white/60 hover:bg-white text-gray-600 hover:shadow-xl hover:-translate-y-1'
                }`}
              >
                <div className="relative flex-shrink-0">
                   <img src={song.cover} className={`w-16 h-16 rounded-2xl object-cover ${activeSong === idx ? 'ring-4 ring-white/30' : 'grayscale group-hover:grayscale-0'} transition-all duration-500`} />
                   {activeSong === idx && (
                     <div className="absolute inset-0 bg-rose-500/20 rounded-2xl flex items-center justify-center">
                       <div className="flex gap-1 h-3">
                        <div className="w-1 bg-white animate-bounce"></div>
                        <div className="w-1 bg-white animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-1 bg-white animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                       </div>
                     </div>
                   )}
                </div>
                <div className="text-left flex-grow truncate">
                  <div className={`font-bold text-lg ${activeSong === idx ? 'text-white' : 'text-gray-900'} truncate`}>{song.title}</div>
                  <div className={`text-xs font-bold ${activeSong === idx ? 'text-rose-100/80' : 'text-rose-400'} uppercase tracking-widest mt-1`}>{song.artist}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Music;
