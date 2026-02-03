
import React, { useState, useEffect } from 'react';

const EmotionalMessage: React.FC = () => {
  const [personalLetter, setPersonalLetter] = useState(() => {
    return localStorage.getItem('sweeta_personal_letter') || 
      "My Dearest Sweeta,\n\n(Click the edit button to write your heart out here...)\n\nHappy Birthday to the most beautiful person I know. You make every day feel like a dream, and I am so lucky to have you in my life.\n\nForever yours.";
  });
  
  const [isEditing, setIsEditing] = useState(false);

  // Save the personal letter whenever it changes
  useEffect(() => {
    localStorage.setItem('sweeta_personal_letter', personalLetter);
  }, [personalLetter]);

  return (
    <div className="max-w-4xl mx-auto px-6 space-y-20 pb-40">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-block p-3 px-6 rounded-full bg-rose-50 border border-rose-100 mb-2">
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-rose-500">From My Heart to Yours</span>
        </div>
        <h2 className="text-5xl md:text-7xl font-serif-elegant font-bold text-gray-900 italic tracking-tight">The Love Letter</h2>
      </div>

      {/* Main Letter Content */}
      <div className="relative group">
        {/* Background Decor */}
        <div className="absolute inset-0 bg-gradient-to-br from-rose-100/30 to-blue-100/30 blur-3xl -z-10 rounded-[4rem]"></div>
        
        <div className="bg-white rounded-[2rem] md:rounded-[4rem] shadow-2xl border-t-[12px] border-rose-400 overflow-hidden relative">
          
          {/* Letter Toolbar */}
          <div className="absolute top-8 right-8 z-10">
            <button 
              onClick={() => setIsEditing(!isEditing)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold text-xs uppercase tracking-widest transition-all ${
                isEditing ? 'bg-rose-500 text-white shadow-lg' : 'bg-gray-50 text-gray-400 hover:bg-rose-50 hover:text-rose-500'
              }`}
            >
              <span>{isEditing ? 'Save Letter' : 'Edit My Letter'}</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </button>
          </div>

          {/* Letter Body */}
          <div className="p-12 md:p-24 pt-28">
            <div className="absolute top-12 left-12 opacity-10 pointer-events-none">
                <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
            </div>

            {isEditing ? (
              <textarea
                value={personalLetter}
                onChange={(e) => setPersonalLetter(e.target.value)}
                className="w-full min-h-[400px] bg-transparent font-serif text-xl md:text-2xl leading-relaxed text-gray-800 outline-none resize-none border-b-2 border-dashed border-rose-100 focus:border-rose-300 transition-colors"
                placeholder="Write your heart out here..."
              />
            ) : (
              <div className="space-y-12">
                <div className="font-serif-elegant italic text-xl md:text-3xl leading-relaxed text-gray-800 whitespace-pre-wrap">
                  {personalLetter}
                </div>
                <div className="pt-12 border-t border-rose-50">
                  <p className="font-cursive text-4xl text-rose-500 font-bold">Forever Yours,</p>
                  <p className="text-gray-400 font-bold uppercase tracking-[0.4em] text-[10px] mt-4">Written with Love 💙</p>
                </div>
              </div>
            )}
          </div>

          {/* Decorative Wax Seal */}
          <div className="absolute bottom-12 right-12 w-20 h-20 bg-rose-600 rounded-full flex items-center justify-center text-white shadow-xl rotate-12 border-4 border-rose-700/50">
            <span className="text-2xl">❦</span>
          </div>
        </div>
      </div>

      <div className="text-center opacity-30 pt-10">
        <p className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-400">Birthday Blossom Special Edition 💙</p>
      </div>
    </div>
  );
};

export default EmotionalMessage;
