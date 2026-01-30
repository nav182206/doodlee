
import React, { useState, useEffect } from 'react';
import { Dream } from '../types';

const DreamBoard: React.FC = () => {
  // Initialize state directly from localStorage
  const [dreams, setDreams] = useState<Dream[]>(() => {
    const saved = localStorage.getItem('sweeta_dreams');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse saved dreams", e);
        return [];
      }
    }
    return [];
  });

  const [inputValue, setInputValue] = useState('');
  const [showSavedToast, setShowSavedToast] = useState(false);
  const ALBUM_LINK = "https://photos.app.goo.gl/RH4qNG3npM8SfC8K9";

  // Save whenever the dreams array changes
  useEffect(() => {
    localStorage.setItem('sweeta_dreams', JSON.stringify(dreams));
  }, [dreams]);

  const addDream = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newDream: Dream = {
      id: Date.now().toString(),
      text: inputValue.trim(),
      isAchieved: false,
      createdAt: Date.now()
    };

    setDreams([newDream, ...dreams]);
    setInputValue('');
    
    setShowSavedToast(true);
    setTimeout(() => setShowSavedToast(false), 2000);
  };

  const toggleAchieved = (id: string) => {
    setDreams(prev => prev.map(d => 
      d.id === id ? { ...d, isAchieved: !d.isAchieved } : d
    ));
  };

  const deleteDream = (id: string) => {
    // Single delete doesn't strictly need a confirm if the button is clear, 
    // but we'll use a soft fade or just filter for speed.
    setDreams(prev => prev.filter(d => d.id !== id));
  };

  const clearAchieved = () => {
    if (window.confirm("Remove all achieved dreams to tidy up?")) {
      setDreams(prev => prev.filter(d => !d.isAchieved));
    }
  };

  const resetBoard = () => {
    if (window.confirm("Are you sure you want to clear your entire Dream Board? This cannot be undone!")) {
      setDreams([]);
    }
  };

  const achievedCount = dreams.filter(d => d.isAchieved).length;

  return (
    <div className="max-w-6xl mx-auto px-6 space-y-16 pb-40">
      {/* Header */}
      <div className="flex flex-col items-center text-center gap-6">
        <div className="w-20 h-20 bg-gradient-to-tr from-blue-400 to-indigo-500 rounded-[2.5rem] flex items-center justify-center text-white text-4xl shadow-2xl shadow-blue-200 animate-float">✨</div>
        <div className="space-y-2">
          <h2 className="text-5xl md:text-7xl font-serif-elegant font-bold text-gray-900 tracking-tight italic">Sweeta's Dream Board</h2>
          <p className="text-blue-500 font-bold tracking-[0.3em] uppercase text-xs">A place for everything you wish for 💙</p>
        </div>
        <p className="max-w-xl text-gray-500 italic text-lg leading-relaxed">
          "Write down your dreams, your goals, or even just what you want for dinner tonight. This board is yours to fill with whatever makes you happy."
        </p>
      </div>

      {/* Input Section */}
      <form onSubmit={addDream} className="max-w-2xl mx-auto w-full group relative">
        <div className="absolute inset-0 bg-blue-400/10 blur-2xl -z-10 rounded-full group-focus-within:bg-blue-400/20 transition-all"></div>
        <div className="flex gap-4 p-4 bg-white/70 backdrop-blur-xl border-4 border-white rounded-[2.5rem] shadow-xl">
          <input 
            type="text" 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="I want to visit Paris... I want to try that cake..."
            className="flex-grow bg-transparent px-6 py-4 outline-none text-gray-700 font-serif text-lg italic"
          />
          <button 
            type="submit"
            className="px-8 py-4 bg-blue-600 text-white rounded-[1.5rem] font-bold uppercase tracking-widest text-xs shadow-lg hover:bg-blue-700 active:scale-95 transition-all flex items-center gap-2"
          >
            <span>Pin It</span>
            {showSavedToast && <span className="animate-in fade-in zoom-in">✓</span>}
          </button>
        </div>
      </form>

      {/* Action Bar */}
      {dreams.length > 0 && (
        <div className="flex justify-center gap-4 animate-in fade-in slide-in-from-top-2 duration-500">
          {achievedCount > 0 && (
            <button 
              onClick={clearAchieved}
              className="px-6 py-2 rounded-full border border-blue-100 text-blue-400 text-[10px] font-black uppercase tracking-widest hover:bg-blue-50 hover:text-blue-600 transition-all"
            >
              Clear Completed ({achievedCount})
            </button>
          )}
          <button 
            onClick={resetBoard}
            className="px-6 py-2 rounded-full border border-rose-100 text-rose-300 text-[10px] font-black uppercase tracking-widest hover:bg-rose-50 hover:text-rose-500 transition-all"
          >
            Reset Board
          </button>
        </div>
      )}

      {/* Dream Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[400px]">
        {dreams.length === 0 ? (
          <div className="col-span-full flex flex-col items-center justify-center py-20 text-gray-300 gap-4 opacity-50">
            <div className="w-20 h-20 border-4 border-dashed border-gray-200 rounded-full flex items-center justify-center text-4xl">💭</div>
            <p className="font-serif italic text-xl">The board is waiting for your dreams...</p>
          </div>
        ) : (
          dreams.map((dream, index) => (
            <div 
              key={dream.id}
              className={`group relative animate-in fade-in zoom-in duration-500`}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className={`relative h-full bg-white rounded-[2.5rem] p-8 border-2 transition-all duration-500 shadow-xl overflow-hidden flex flex-col justify-between ${dream.isAchieved ? 'border-blue-100 bg-blue-50/20' : 'border-white hover:border-blue-50 hover:-translate-y-2'}`}>
                
                {/* Achievement Glow */}
                {dream.isAchieved && (
                  <div className="absolute inset-0 bg-gradient-to-tr from-blue-400/10 to-indigo-500/10 animate-pulse pointer-events-none"></div>
                )}

                <div className="space-y-6">
                  <div className="flex justify-between items-start">
                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-xl shadow-inner">
                      {dream.isAchieved ? '💙' : '📌'}
                    </div>
                    <button 
                      onClick={() => deleteDream(dream.id)}
                      className="text-gray-400 hover:text-rose-500 transition-all p-2 hover:bg-rose-50 rounded-full active:scale-90"
                      aria-label="Delete dream"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  <p className={`text-xl md:text-2xl font-serif-elegant font-bold leading-relaxed ${dream.isAchieved ? 'text-blue-600 italic line-through decoration-blue-200 decoration-4' : 'text-gray-800'}`}>
                    {dream.text}
                  </p>
                </div>

                <div className="mt-8 flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-300">
                    {new Date(dream.createdAt).toLocaleDateString()}
                  </span>
                  <button 
                    onClick={() => toggleAchieved(dream.id)}
                    className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                      dream.isAchieved 
                      ? 'bg-blue-500 text-white shadow-lg' 
                      : 'bg-gray-50 text-blue-300 hover:bg-blue-100 hover:text-blue-500'
                    }`}
                  >
                    {dream.isAchieved ? 'Achieved!' : 'Mark Done'}
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* The Ultimate Collection Section */}
      <div className="pt-20 border-t border-blue-50">
        <div className="flex flex-col items-center gap-10">
          <div className="flex items-center gap-6 w-full">
            <div className="h-px flex-grow bg-blue-50"></div>
            <h3 className="text-3xl font-serif-elegant font-bold text-gray-800 italic">Sweeta's Cutest Moments 💙</h3>
            <div className="h-px flex-grow bg-blue-50"></div>
          </div>

          <div className="w-full max-w-3xl group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-indigo-500/10 blur-3xl -z-10 rounded-full group-hover:scale-110 transition-transform duration-1000"></div>
              
              <div className="bg-white/80 backdrop-blur-xl border-4 border-white rounded-[4rem] p-16 shadow-2xl text-center space-y-8 transition-all duration-500 hover:shadow-blue-200/50 hover:-translate-y-2">
                  <div className="text-8xl animate-float">🧸</div>
                  <div className="space-y-4">
                      <h4 className="text-4xl font-serif-elegant font-bold text-gray-800">The Ultimate Collection</h4>
                      <p className="text-gray-500 text-lg italic max-w-lg mx-auto leading-relaxed">
                          "From baby steps to your favorite food and everything that makes you smile. I've put all those pictures in this one special place."
                      </p>
                  </div>

                  <div className="pt-6">
                      <a 
                        href={ALBUM_LINK} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-4 px-12 py-6 bg-blue-600 text-white rounded-full font-black uppercase tracking-widest text-sm shadow-[0_20px_40px_-10px_rgba(37,99,235,0.4)] hover:bg-blue-700 hover:shadow-[0_25px_50px_-12px_rgba(37,99,235,0.5)] transition-all transform hover:scale-105 active:scale-95"
                      >
                          <span>View All Pictures</span>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                      </a>
                  </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DreamBoard;
