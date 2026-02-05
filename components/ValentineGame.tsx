
import React, { useState, useEffect } from 'react';

const ValentineGame: React.FC = () => {
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [hasSaidYes, setHasSaidYes] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const moveNoButton = () => {
    // Generate a random position within a safe range
    const x = Math.random() * 200 - 100;
    const y = Math.random() * 200 - 100;
    setNoPosition({ x, y });
  };

  const handleYes = () => {
    setHasSaidYes(true);
    setShowConfetti(true);
  };

  // Reset confetti after a few seconds
  useEffect(() => {
    if (showConfetti) {
      const timer = setTimeout(() => setShowConfetti(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [showConfetti]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-6 relative">
      {/* Background Decor */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i} 
            className={`absolute transition-all duration-[3000ms] ${hasSaidYes ? 'animate-bounce' : 'animate-pulse'}`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 30 + 10}px`,
              opacity: 0.1,
              transform: `rotate(${Math.random() * 360}deg)`
            }}
          >
            {['🐼', '🏀', '🍕', '🍼', '💖'][Math.floor(Math.random() * 5)]}
          </div>
        ))}
      </div>

      <div className={`w-full max-w-2xl bg-white/70 backdrop-blur-2xl rounded-[4rem] p-12 md:p-20 shadow-2xl border-4 border-white text-center transition-all duration-1000 ${hasSaidYes ? 'scale-105 border-rose-300' : ''}`}>
        {!hasSaidYes ? (
          <div className="space-y-12">
            <div className="space-y-4">
              <div className="text-7xl md:text-9xl animate-float">🧸</div>
              <h2 className="text-4xl md:text-6xl font-serif-elegant font-bold text-gray-900 leading-tight">
                Will you be my <br />
                <span className="text-rose-500 italic">Valentine?</span>
              </h2>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 pt-6">
              <button
                onClick={handleYes}
                className="px-16 py-6 bg-rose-500 text-white rounded-full font-black uppercase tracking-widest text-lg shadow-[0_20px_40px_-10px_rgba(225,29,72,0.4)] hover:bg-rose-600 hover:scale-110 active:scale-95 transition-all"
              >
                Yes! 💙
              </button>

              <button
                onMouseEnter={moveNoButton}
                onClick={() => {}} // User said no reaction for "No" click
                style={{
                  transform: `translate(${noPosition.x}px, ${noPosition.y}px)`,
                  transition: 'transform 0.2s ease-out'
                }}
                className="px-12 py-5 bg-gray-100 text-gray-400 rounded-full font-bold uppercase tracking-widest text-sm border border-gray-200 cursor-default"
              >
                No
              </button>
            </div>
            
            <p className="text-gray-400 text-xs font-medium uppercase tracking-[0.3em] pt-4 italic">
              (Choose wisely, Sweeta...)
            </p>
          </div>
        ) : (
          <div className="space-y-10 animate-in zoom-in duration-700">
            <div className="relative inline-block">
              <div className="text-9xl animate-bounce">💖</div>
              <div className="absolute -top-4 -right-4 text-4xl">✨</div>
            </div>
            
            <div className="space-y-6">
              <h2 className="text-5xl md:text-7xl font-serif-elegant font-bold text-gray-900">
                Yay! I knew it! 💙
              </h2>
              <p className="text-gray-500 text-xl md:text-2xl italic leading-relaxed font-serif max-w-lg mx-auto">
                "You make my heart skip a beat every single day. I'm the luckiest guy to have you."
              </p>
            </div>

            <div className="flex justify-center gap-6 text-4xl">
               <span>🐼</span>
               <span>🏀</span>
               <span>🍕</span>
               <span>🧸</span>
            </div>

            <button 
              onClick={() => setHasSaidYes(false)}
              className="text-rose-300 text-xs font-black uppercase tracking-[0.4em] hover:text-rose-500 transition-colors"
            >
              Ask me again?
            </button>
          </div>
        )}
      </div>

      {/* Confetti Explosion (Simple CSS Hearts) */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-[100]">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute text-rose-500 animate-fall"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-20px`,
                fontSize: `${Math.random() * 20 + 10}px`,
                animationDuration: `${Math.random() * 3 + 2}s`,
                animationDelay: `${Math.random() * 2}s`
              }}
            >
              ❤️
            </div>
          ))}
        </div>
      )}

      <style>{`
        @keyframes fall {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
        }
        .animate-fall {
          animation: fall linear forwards;
        }
      `}</style>
    </div>
  );
};

export default ValentineGame;
