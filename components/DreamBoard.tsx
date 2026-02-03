
import React from 'react';

const DreamBoard: React.FC = () => {
  const ALBUM_LINK = "https://photos.app.goo.gl/RH4qNG3npM8SfC8K9";

  return (
    <div className="max-w-6xl mx-auto px-6 space-y-16 pb-40">
      {/* Header */}
      <div className="flex flex-col items-center text-center gap-6">
        <div className="w-24 h-24 bg-gradient-to-tr from-blue-400 to-indigo-500 rounded-[2.5rem] flex items-center justify-center text-white text-5xl shadow-2xl shadow-blue-200 animate-float">🐼</div>
        <div className="space-y-2">
          <h2 className="text-5xl md:text-8xl font-serif-elegant font-bold text-gray-900 tracking-tight italic">The Ultimate Collection</h2>
          <p className="text-blue-500 font-bold tracking-[0.4em] uppercase text-xs">Everything you love in one place 💙</p>
        </div>
        <p className="max-w-2xl text-gray-500 italic text-xl leading-relaxed">
          "From cute pandas and adorable babies to your love for basketball and every delicious meal we've shared. This is your world, Sweeta."
        </p>
      </div>

      {/* The Main Action Area */}
      <div className="flex flex-col items-center gap-10">
        <div className="w-full max-w-4xl group relative">
            {/* Background Glows */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-indigo-500/20 blur-[120px] -z-10 rounded-full group-hover:scale-110 transition-transform duration-1000"></div>
            
            <div className="bg-white/70 backdrop-blur-2xl border-4 border-white rounded-[4rem] p-12 md:p-24 shadow-2xl text-center space-y-12 transition-all duration-500 hover:shadow-blue-200/50 hover:-translate-y-2">
                <div className="relative inline-block">
                    <div className="text-9xl animate-float">🏀</div>
                    <div className="absolute -bottom-4 -right-4 bg-rose-500 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl shadow-lg border-4 border-white">🐼</div>
                </div>

                <div className="space-y-6">
                    <h4 className="text-4xl md:text-5xl font-serif-elegant font-bold text-gray-800">Your Favorite Things</h4>
                    <p className="text-gray-500 text-xl italic max-w-lg mx-auto leading-relaxed">
                        I've curated this album with all the things that make your eyes light up. Pandas, basketball highlights, cute babies, and of course, food!
                    </p>
                </div>

                <div className="pt-10 flex flex-col items-center gap-8">
                    <a 
                      href={ALBUM_LINK} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-6 px-16 py-8 bg-blue-600 text-white rounded-full font-black uppercase tracking-widest text-lg shadow-[0_30px_60px_-15px_rgba(37,99,235,0.4)] hover:bg-blue-700 hover:shadow-[0_40px_80px_-20px_rgba(37,99,235,0.5)] transition-all transform hover:scale-105 active:scale-95"
                    >
                        <span>Explore the Collection</span>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </a>
                    
                    <div className="flex justify-center gap-8 text-4xl grayscale group-hover:grayscale-0 transition-all duration-1000 opacity-30 group-hover:opacity-100">
                        <span className="hover:scale-150 transition-transform cursor-default" title="Pandas">🐼</span>
                        <span className="hover:scale-150 transition-transform cursor-default" title="Babies">👶</span>
                        <span className="hover:scale-150 transition-transform cursor-default" title="Basketball">🏀</span>
                        <span className="hover:scale-150 transition-transform cursor-default" title="Food">🍕</span>
                        <span className="hover:scale-150 transition-transform cursor-default" title="Love">💙</span>
                    </div>
                </div>
            </div>
        </div>
      </div>

      <div className="pt-20 text-center">
        <p className="text-blue-300 font-serif italic text-lg leading-relaxed">
          "Seeing you happy with the things you love is my favorite view."
        </p>
        <div className="mt-6 flex justify-center gap-2">
            {[...Array(3)].map((_, i) => (
                <div key={i} className="w-1.5 h-1.5 bg-blue-100 rounded-full"></div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default DreamBoard;
