
import React, { useState } from 'react';
import { generateLoveLetter } from '../geminiService';

const EmotionalMessage: React.FC = () => {
  const [keyword, setKeyword] = useState('');
  const [letter, setLetter] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!keyword.trim()) return;
    setLoading(true);
    const result = await generateLoveLetter(keyword);
    setLetter(result);
    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto px-6 text-center">
      <div className="space-y-12">
        <div className="space-y-4">
          <h2 className="text-4xl font-serif-elegant font-bold text-gray-900">A Message Just For You</h2>
          <p className="text-gray-600 italic">Think of a favorite memory or a word that describes us, and I'll put my feelings into words.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <input 
            type="text" 
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="e.g., Beach trip, Sunshine, Kindness..."
            className="flex-grow max-w-md px-6 py-4 rounded-full border-2 border-rose-100 focus:border-rose-400 outline-none transition-all shadow-inner"
          />
          <button 
            onClick={handleGenerate}
            disabled={loading || !keyword}
            className={`px-8 py-4 rounded-full bg-rose-500 text-white font-bold transition-all shadow-lg hover:bg-rose-600 disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {loading ? 'Writing...' : 'Write Letter'}
          </button>
        </div>

        {letter && (
          <div className="mt-16 p-10 bg-white rounded-[2rem] shadow-2xl relative border-t-8 border-rose-400 animate-in slide-in-from-bottom duration-700">
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-rose-400 rounded-full flex items-center justify-center text-white shadow-lg">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
            </div>
            <div className="text-lg md:text-xl text-gray-700 font-serif-elegant leading-relaxed whitespace-pre-wrap italic">
              {letter}
            </div>
            <div className="mt-8 text-rose-500 font-cursive text-3xl font-bold">
              Forever Yours.
            </div>
          </div>
        )}
        
        {!letter && !loading && (
          <div className="py-20 flex flex-col items-center gap-6 text-gray-300">
             <div className="w-24 h-24 border-4 border-dashed border-gray-200 rounded-full flex items-center justify-center">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
             </div>
             <p className="font-serif">The page is waiting for your touch...</p>
          </div>
        )}
      </div>
      
      <div className="mt-32 pt-12 border-t border-rose-100 opacity-50">
        <p className="text-sm uppercase tracking-widest text-rose-400 font-bold">Happy Birthday 2024</p>
      </div>
    </div>
  );
};

export default EmotionalMessage;
