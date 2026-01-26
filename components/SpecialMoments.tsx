
import React, { useState } from 'react';
import { VoiceNote } from '../types';

const BIRTHDAY_VOICE_NOTE: VoiceNote = {
  id: 'special-wish',
  title: 'Your Birthday Wish from Me',
  date: 'Today',
  duration: '2:30',
  transcript: "Happy Birthday Sweeta! I recorded this to let you know that you are the light of my life. Every second with you is a gift, and I hope this year brings you as much joy as you've brought me. I love you more than words can say. 💙"
};

const CUTE_SCREENSHOTS = [
  { url: "https://picsum.photos/seed/cute1/800/800", caption: "The way you look at me" },
  { url: "https://picsum.photos/seed/cute2/800/800", caption: "Late night video calls" },
  { url: "https://picsum.photos/seed/cute3/800/800", caption: "That goofy face you make" },
  { url: "https://picsum.photos/seed/cute4/800/800", caption: "Pure happiness" },
  { url: "https://picsum.photos/seed/cute5/800/800", caption: "My favorite screenshot" },
  { url: "https://picsum.photos/seed/cute6/800/800", caption: "Waking up to your texts" },
];

const SpecialMoments: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="max-w-5xl mx-auto px-6 space-y-20 pb-20">
      {/* Header */}
      <div className="flex flex-col items-center text-center gap-4">
        <div className="w-20 h-20 bg-gradient-to-tr from-blue-400 to-rose-400 rounded-[2rem] flex items-center justify-center text-white text-4xl shadow-2xl shadow-rose-200 animate-bounce">🎙️</div>
        <div>
          <h2 className="text-5xl font-serif-elegant font-bold text-gray-900">Special Moments</h2>
          <p className="text-blue-400 font-medium tracking-widest uppercase text-sm mt-2 italic">A whisper and a glance for Sweeta</p>
        </div>
      </div>

      {/* Single Voice Note Player */}
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

            {/* Audio Waveform Animation */}
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

      {/* Cute Screenshots Gallery */}
      <div className="space-y-12">
        <div className="flex items-center gap-6 px-4">
          <div className="h-px flex-grow bg-blue-100"></div>
          <h3 className="text-3xl font-serif-elegant font-bold text-gray-800">Sweeta's Cutest Moments</h3>
          <div className="h-px flex-grow bg-blue-100"></div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {CUTE_SCREENSHOTS.map((pic, idx) => (
            <div 
              key={idx}
              className="group relative aspect-square bg-white p-3 rounded-[2rem] shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-blue-50"
            >
              <div className="w-full h-full overflow-hidden rounded-[1.5rem] relative">
                <img 
                  src={pic.url} 
                  alt={pic.caption} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <p className="text-white text-xs font-bold uppercase tracking-widest">{pic.caption}</p>
                </div>
              </div>
              {/* Polaroid-style tape decor */}
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-12 h-6 bg-white/40 backdrop-blur-sm border border-white/50 rotate-3 z-10"></div>
            </div>
          ))}
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
