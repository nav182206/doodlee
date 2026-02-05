
import React, { useState, useEffect } from 'react';

const EmotionalMessage: React.FC = () => {
  const DEFAULT_MESSAGE = `Happiest birthday, Janu ⭐
I hope this year brings you endless laughter, pure love, and... a little bit of Naveen in it too 🦖

I honestly don't know where to begin or end. So just listen.

You're one of the sweetest humans I've ever known..
The girl who understood me, who stood by me when no one else did.
I'm emotionally very connected to you.
You're like a daughter to me.

No matter what happens, I'll always take care of you.
You're worth a lifetime 🫀

I'll always support you, cheer for you, and want you to win-just like a true friend should.

You'll never see me against you, no matter what.
I love you from the core chala chalaa chalaaa chalaa
And never think you're alone.
I'm here for you-24×7 Always. 🫀

Once again happiest birthday 🫧🦖🥹
Stay happiest smile hard till world disappears 🧿

Hope you liked my small app, if you did not like no issue, 
I'll make new one

Signing off
Naveen
Truly connected soul of Sweeta 😘`;

  const [personalLetter] = useState(() => {
    return localStorage.getItem('sweeta_personal_letter') || DEFAULT_MESSAGE;
  });

  useEffect(() => {
    localStorage.setItem('sweeta_personal_letter', personalLetter);
  }, [personalLetter]);

  return (
    <div className="max-w-3xl mx-auto px-4 space-y-12 pb-24 md:pb-40">
      {/* Royal Header */}
      <div className="text-center space-y-4 animate-in fade-in slide-in-from-top-10 duration-1000">
        <div className="inline-block p-2 px-6 rounded-full bg-slate-900 border border-amber-500/30">
          <span className="text-[9px] font-black uppercase tracking-[0.4em] text-amber-400">Personal Letter</span>
        </div>
        <h2 className="text-4xl md:text-8xl font-serif-elegant font-bold text-slate-900 italic tracking-tighter">
          My <span className="text-amber-600 not-italic">JANU</span> ⭐
        </h2>
      </div>

      {/* Royal Velvet Container */}
      <div className="relative group">
        {/* Glow Layer */}
        <div className="absolute -inset-1 bg-gradient-to-r from-amber-500/20 via-rose-500/20 to-amber-500/20 rounded-[2.5rem] blur-xl opacity-50 transition duration-1000"></div>
        
        {/* Main Body */}
        <div className="relative z-10 bg-[#0f172a] rounded-[2.5rem] overflow-hidden shadow-2xl border border-amber-500/20">
          {/* Subtle Golden Dust */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
            {[...Array(30)].map((_, i) => (
              <div 
                key={i}
                className="absolute bg-amber-400 rounded-full animate-twinkle"
                style={{
                  width: `${Math.random() * 2 + 1}px`,
                  height: `${Math.random() * 2 + 1}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                }}
              />
            ))}
          </div>

          <div className="relative p-8 md:p-20 space-y-10">
             {/* Floating Icon Decor */}
             <div className="absolute top-6 right-6 text-6xl opacity-10 animate-float select-none pointer-events-none">🦖</div>
             
             {/* Message Content */}
             <div className="font-serif text-amber-50 text-lg md:text-2xl leading-relaxed whitespace-pre-wrap selection:bg-amber-500/30 relative z-20">
               {personalLetter}
             </div>

             {/* Closing Section */}
             <div className="pt-12 border-t border-amber-500/10 flex flex-col items-center text-center gap-8">
                <div className="space-y-2">
                  <p className="font-cursive text-4xl md:text-6xl text-amber-400 drop-shadow-[0_0_10px_rgba(245,158,11,0.3)]">
                    Always Yours,
                  </p>
                  <p className="text-white/20 font-black uppercase tracking-[0.6em] text-[8px] md:text-[10px]">Soul of Sweeta 🧿</p>
                </div>

                {/* Wax Seal Stamp */}
                <div className="relative group/seal">
                   <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-amber-600 to-amber-800 rounded-full flex items-center justify-center text-3xl md:text-4xl shadow-2xl border-2 border-amber-400/50 rotate-12 transition-transform duration-500">
                      🧿
                   </div>
                   <div className="absolute -top-1 -right-1 bg-rose-600 text-white text-[8px] font-black p-1 px-2 rounded-full border border-slate-950 uppercase">
                      Pure
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* Footer Quote */}
      <div className="text-center pt-4">
        <p className="text-[9px] font-black uppercase tracking-[0.8em] text-slate-400">Stay happiest smile hard 🧿</p>
      </div>

      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.1; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.4); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(3deg); }
        }
        .animate-twinkle { animation: twinkle 4s ease-in-out infinite; }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .font-cursive { font-family: 'Dancing Script', cursive; }
      `}</style>
    </div>
  );
};

export default EmotionalMessage;
