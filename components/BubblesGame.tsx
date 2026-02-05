
import React, { useState, useEffect } from 'react';

type Stage = 'locked' | 'intro' | 'question' | 'accepted';

const BubblesGame: React.FC = () => {
  const [stage, setStage] = useState<Stage>('locked');
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [noLabel, setNoLabel] = useState('No');
  const [showConfetti, setShowConfetti] = useState(false);
  const [bubbleCount, setBubbleCount] = useState(0);
  const [unlockKey, setUnlockKey] = useState('');
  const [poppedBubbles, setPoppedBubbles] = useState<number[]>([]);

  const noLabels = [
    'No', 'Nope', 'Try again!', 'Missed me!', 
    'Not today', 'Hehe', 'Catch me!', 'Nope 😋', 
    'Wrong way!', 'Still no', 'Error 404', 'Oops!'
  ];

  useEffect(() => {
    const today = new Date();
    const isValentineDay = today.getMonth() === 1 && today.getDate() >= 14;
    if (isValentineDay) {
      setStage('intro');
    }
  }, []);

  const handleKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.toLowerCase();
    setUnlockKey(val);
    if (val === 'bow') {
      setStage('intro');
    }
  };

  const moveNoButton = () => {
    const x = Math.random() * 300 - 150;
    const y = Math.random() * 300 - 150;
    setNoPosition({ x, y });
    setNoLabel(noLabels[Math.floor(Math.random() * noLabels.length)]);
  };

  const handleYes = () => {
    setStage('accepted');
    setShowConfetti(true);
  };

  const handleIntroBubbleClick = (id: number) => {
    if (poppedBubbles.includes(id)) return;
    
    const newPopped = [...poppedBubbles, id];
    setPoppedBubbles(newPopped);
    setBubbleCount(newPopped.length);
    
    if (newPopped.length >= 3) {
      setStage('question');
    }
  };

  useEffect(() => {
    if (showConfetti) {
      const timer = setTimeout(() => setShowConfetti(false), 8000);
      return () => clearTimeout(timer);
    }
  }, [showConfetti]);

  const renderLocked = () => (
    <div className="space-y-10 animate-in fade-in zoom-in duration-700">
      <div className="relative inline-block">
        <div className="text-9xl animate-float">🎁</div>
        <div className="absolute -top-4 -right-4 bg-rose-500 text-white p-2 rounded-full shadow-lg">
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 17a2 2 0 0 0 2-2 2 2 0 0 0-2-2 2 2 0 0 0-2 2 2 2 0 0 0 2 2m6-9h-1V6a5 5 0 0 0-10 0v2H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2M9 6a3 3 0 0 1 6 0v2H9V6z"/>
          </svg>
        </div>
      </div>
      <div className="space-y-4">
        <h2 className="text-4xl md:text-5xl font-serif-elegant font-bold text-gray-900 tracking-tight italic">Coming Soon...</h2>
        <p className="text-gray-500 font-serif italic text-lg max-w-sm mx-auto">
          "This special portal opens on Feb 14th. <br/> Unless you have the secret bow..."
        </p>
      </div>
      <div className="max-w-xs mx-auto relative group">
        <input 
          type="text" 
          value={unlockKey}
          onChange={handleKeyChange}
          placeholder="Enter Secret Key"
          className="w-full px-8 py-4 bg-rose-50 border-2 border-rose-100 rounded-2xl text-center font-bold tracking-[0.2em] text-rose-500 outline-none focus:border-rose-300 transition-all placeholder:text-rose-200"
        />
        <div className="mt-4 text-[10px] text-rose-300 font-black uppercase tracking-widest animate-pulse">
          Hint: 🎀
        </div>
      </div>
    </div>
  );

  const renderIntro = () => (
    <div className="space-y-12 animate-in fade-in zoom-in duration-500">
      <div className="space-y-6">
        <div className="relative inline-block">
          <div className="text-8xl md:text-9xl animate-float">🫧</div>
          <div className="absolute -top-4 -right-4 bg-blue-500 text-white w-10 h-10 rounded-full flex items-center justify-center text-xl animate-ping opacity-20"></div>
        </div>
        <h2 className="text-4xl md:text-6xl font-serif-elegant font-bold text-gray-900 italic">
          The <span className="text-blue-500">Portal</span> is Open
        </h2>
        <p className="text-gray-500 text-xl font-serif italic max-w-md mx-auto leading-relaxed">
          "Pop the bubbles quickly to see the secret..."
        </p>
      </div>
      
      <div className="flex justify-center gap-8 relative h-40">
        {[0, 1, 2].map((id) => (
          <button
            key={id}
            onClick={() => handleIntroBubbleClick(id)}
            className={`w-24 h-24 rounded-full bg-blue-100/40 backdrop-blur-sm border-2 border-white shadow-xl flex items-center justify-center text-4xl transition-all duration-300 ${
              poppedBubbles.includes(id) 
                ? 'scale-0 opacity-0 pointer-events-none' 
                : 'hover:scale-125 active:scale-90 animate-bounce'
            }`}
            style={{ animationDelay: `${id * 0.15}s` }}
          >
            🫧
          </button>
        ))}
      </div>
      
      <p className="text-blue-300 text-[10px] font-black uppercase tracking-[0.5em] animate-pulse">
        {bubbleCount === 0 ? 'Tap to start' : `${3 - bubbleCount} remaining`}
      </p>
    </div>
  );

  const renderQuestion = () => (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-10 duration-500">
      <div className="space-y-4">
        <div className="text-7xl md:text-9xl animate-float">🧸</div>
        <h2 className="text-4xl md:text-6xl font-serif-elegant font-bold text-gray-900 leading-tight tracking-tight">
          Will u be my <br />
          <span className="text-rose-500 block mt-2 tracking-wider">JANU?</span>
        </h2>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-12 pt-6 min-h-[250px] relative">
        <div className="relative group">
          <div className="absolute inset-[-20px] bg-gradient-to-r from-rose-400 via-blue-400 to-purple-400 blur-3xl opacity-40 group-hover:opacity-100 animate-[spin_4s_linear_infinite] rounded-full"></div>
          
          <button
            onClick={handleYes}
            className="relative px-20 py-8 bg-rose-500 text-white rounded-full font-black uppercase tracking-widest text-2xl shadow-[0_20px_60px_-10px_rgba(225,29,72,0.6)] hover:bg-rose-600 transition-all animate-crazy-pulse overflow-hidden group/btn"
          >
            <span className="relative z-10 flex items-center gap-3">
              YES! 💙
              <span className="animate-bounce inline-block text-3xl">✨</span>
            </span>
            <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700"></div>
          </button>

          <div className="absolute -top-6 -left-6 text-3xl animate-[spin_5s_linear_infinite] pointer-events-none">❤️</div>
          <div className="absolute -bottom-6 -right-6 text-3xl animate-[spin_5s_linear_infinite] pointer-events-none" style={{ animationDirection: 'reverse' }}>💖</div>
        </div>

        <button
          onMouseEnter={moveNoButton}
          style={{
            transform: `translate(${noPosition.x}px, ${noPosition.y}px)`,
            transition: 'transform 0.1s cubic-bezier(0.34, 1.56, 0.64, 1)'
          }}
          className="px-12 py-5 bg-white/30 backdrop-blur-md text-gray-400 rounded-full font-bold uppercase tracking-widest text-sm border-2 border-white/50 shadow-sm hover:border-blue-200 hover:text-blue-400 transition-all cursor-default flex items-center gap-2 group whitespace-nowrap"
        >
          <span>{noLabel}</span>
          <span className="group-hover:rotate-12 transition-transform">😅</span>
        </button>
      </div>
    </div>
  );

  const renderAccepted = () => (
    <div className="space-y-10 animate-in zoom-in-50 duration-700">
      <div className="relative inline-block">
        <div className="text-[10rem] md:text-[14rem] animate-crazy-bounce drop-shadow-2xl">💖</div>
        <div className="absolute top-0 right-0 text-6xl animate-pulse">✨</div>
      </div>
      
      <div className="space-y-6">
        <h2 className="text-6xl md:text-8xl font-serif-elegant font-bold text-gray-900 leading-tight tracking-tighter">
          SHE SAID YES! 💙
        </h2>
        <p className="text-gray-500 text-2xl md:text-3xl italic leading-relaxed font-serif max-w-2xl mx-auto">
          "I promise to make you the happiest person on earth. Thank you for being my everything, Sweeta!"
        </p>
      </div>

      <div className="flex justify-center gap-10 text-6xl animate-bounce pt-8">
         <span>🐼</span>
         <span>🏀</span>
         <span>🍕</span>
         <span>🧸</span>
      </div>

      <div className="pt-12">
        <button 
          onClick={() => { setStage('intro'); setBubbleCount(0); setPoppedBubbles([]); setUnlockKey(''); }}
          className="px-8 py-3 bg-white border border-rose-100 text-rose-300 text-[10px] font-black uppercase tracking-[0.4em] rounded-full hover:bg-rose-50 hover:text-rose-500 transition-all"
        >
          Restart the Magic
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-6 relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div 
            key={i} 
            className={`absolute transition-all duration-[3000ms] ${stage === 'accepted' ? 'animate-crazy-float' : 'animate-pulse'}`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 40 + 15}px`,
              opacity: 0.15,
              animationDelay: `${Math.random() * 2}s`
            }}
          >
            {['🫧', '💖', '✨', '💙', '🧸', '🍕', '🐼'][Math.floor(Math.random() * 7)]}
          </div>
        ))}
      </div>

      <div className={`w-full max-w-3xl bg-white/80 backdrop-blur-3xl rounded-[5rem] p-12 md:p-24 shadow-2xl border-4 border-white text-center transition-all duration-700 ${stage === 'accepted' ? 'scale-105 border-rose-200 shadow-rose-200/50' : 'shadow-blue-100/30'}`}>
        {stage === 'locked' && renderLocked()}
        {stage === 'intro' && renderIntro()}
        {stage === 'question' && renderQuestion()}
        {stage === 'accepted' && renderAccepted()}
      </div>

      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-[100]">
          {[...Array(120)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-crazy-fall"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-50px`,
                fontSize: `${Math.random() * 30 + 10}px`,
                animationDuration: `${Math.random() * 4 + 2}s`,
                animationDelay: `${Math.random() * 3}s`,
                color: ['#f43f5e', '#3b82f6', '#fbbf24', '#a855f7', '#ec4899', '#10b981'][Math.floor(Math.random() * 6)]
              }}
            >
              {['❤️', '💙', '✨', '🫧', '🎉', '💖', '🍬', '🎈'][Math.floor(Math.random() * 8)]}
            </div>
          ))}
        </div>
      )}

      <style>{`
        @keyframes crazy-fall {
          0% { transform: translateY(0) rotate(0deg) scale(0); opacity: 0; }
          10% { opacity: 1; transform: scale(1.2); }
          100% { transform: translateY(110vh) rotate(720deg) scale(0.5); opacity: 0; }
        }
        @keyframes crazy-pulse {
          0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(225, 29, 72, 0.4); }
          50% { transform: scale(1.15); box-shadow: 0 0 70px 30px rgba(225, 29, 72, 0.2); }
          100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(225, 29, 72, 0.4); }
        }
        @keyframes crazy-bounce {
          0%, 100% { transform: translateY(0) scale(1) rotate(0); }
          25% { transform: translateY(-40px) scale(1.1) rotate(5deg); }
          75% { transform: translateY(-10px) scale(1.05) rotate(-5deg); }
        }
        @keyframes crazy-float {
          0%, 100% { transform: translate(0, 0) rotate(0); }
          25% { transform: translate(25px, -25px) rotate(15deg); }
          50% { transform: translate(-15px, 30px) rotate(-15deg); }
          75% { transform: translate(-30px, -10px) rotate(10deg); }
        }
        .animate-crazy-fall { animation: crazy-fall linear forwards; }
        .animate-crazy-pulse { animation: crazy-pulse 1s infinite ease-in-out; }
        .animate-crazy-bounce { animation: crazy-bounce 1s infinite cubic-bezier(0.175, 0.885, 0.32, 1.275); }
        .animate-crazy-float { animation: crazy-float 6s infinite ease-in-out; }
      `}</style>
    </div>
  );
};

export default BubblesGame;
