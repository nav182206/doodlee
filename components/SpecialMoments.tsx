
import React, { useState } from 'react';
import { VoiceNote } from '../types';

const BIRTHDAY_VOICE_NOTE: VoiceNote = {
  id: 'special-wish',
  title: 'Your Birthday Wish from Me',
  date: 'Today',
  duration: '2:30',
  transcript: "Happy Birthday Sweeta! I recorded this to let you know that you are the light of my life. Every second with you is a gift, and I hope this year brings you as much joy as you've brought me. I love you more than words can say. 💙"
};

const SpecialMoments: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Updated with the new link provided by the user
  const ALBUM_LINK = "https://photos.app.goo.gl/RH4qNG3npM8SfC8K9";

  return (
    <div className="max-w-5xl mx-auto px-6 space-y-20 pb-32">
      {/* Header */}
      <div className="flex flex-col items-center text-center gap-4">
        <div className="w-20 h-20 bg-gradient-to-tr from-blue-400 to-indigo-500 rounded-[2rem] flex items-center justify-center text-white text-4xl shadow-2xl shadow-blue-200 animate-bounce">🎙️</div>
        <div>
          <h2 className="text-5xl font-serif-elegant font-bold text-gray-900">Sweet Moments</h2>
          <p className="text-blue-400 font-medium tracking-widest uppercase text-sm mt-2 italic">A special space for our voices and memories 💙</p>
        </div>
      </div>

      {/* Voice Message Section */}
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

      {/* The Album Link Section */}
      <div className="space-y-16 animate-in fade-in duration-1000 delay-300">
        <div className="flex items-center gap-6 px-4">
          <div className="h-px flex-grow bg-blue-100"></div>
          <h3 className="text-3xl font-serif-elegant font-bold text-gray-800 italic">Everything You Love 💙</h3>
          <div className="h-px flex-grow bg-blue-100"></div>
        </div>

        <div className="max-w-3xl mx-auto group relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-indigo-500/10 blur-3xl -z-10 rounded-full group-hover:scale-110 transition-transform duration-1000"></div>
            
            <div className="bg-white/80 backdrop-blur-xl border-4 border-white rounded-[4rem] p-16 shadow-2xl text-center space-y-8 transition-all duration-500 hover:shadow-blue-200/50 hover:-translate-y-2">
                <div className="text-8xl animate-float">🐼</div>
                <div className="space-y-4">
                    <h4 className="text-4xl font-serif-elegant font-bold text-gray-800">The Ultimate Collection</h4>
                    <p className="text-gray-500 text-lg italic max-w-lg mx-auto leading-relaxed">
                        "From pandas and basketball to cute babies and your favorite foods. I've put every picture that makes you happy in this one special place."
                    </p>
                </div>

                <div className="pt-6">
                    <a 
                      href={ALBUM_LINK} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-4 px-12 py-6 bg-blue-600 text-white rounded-full font-black uppercase tracking-widest text-sm shadow-[0_20px_40px_-10px_rgba(37,99,235,0.4)] hover:bg-blue-700 hover:shadow-[0_25px_50px_-12px_rgba(37,99,235,0.5)] transition-all transform hover:scale-105 active:scale-95"
                    >
                        <span>View the Collection</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </a>
                    
                    <div className="mt-8 flex justify-center gap-6 text-2xl grayscale group-hover:grayscale-0 transition-all duration-700 opacity-40 group-hover:opacity-100">
                        <span>🐼</span>
                        <span>👶</span>
                        <span>🏀</span>
                        <span>🍜</span>
                        <span>🍫</span>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default SpecialMoments;
