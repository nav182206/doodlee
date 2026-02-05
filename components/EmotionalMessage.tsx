
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
    <div className="max-w-5xl mx-auto px-6 space-y-20 pb-40">
      {/* Aurora Header */}
      <div className="text-center space-y-8 animate-in fade-in slide-in-from-top-10 duration-1000">
        <div className="relative inline-block">
          <div className="absolute -inset-4 bg-gradient-to-r from-teal-500/20 via-purple-500/20 to-pink-500/20 blur-xl animate-pulse"></div>
          <div className="relative inline-block p-3 px-8 rounded-full bg-slate-900/80 backdrop-blur-md border border-teal-500/30">
            <span className="text-[11px] font-black uppercase tracking-[0.6em] text-teal-300">Written in the Aurora</span>
          </div>
        </div>
        <h2 className="text-6xl md:text-9xl font-serif-elegant font-bold text-slate-900 italic tracking-tighter">
          My <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-indigo-600 not-italic">JANU</span> ⭐
        </h2>
      </div>

      {/* Midnight Letter Container */}
      <div className="relative group">
        {/* Glow Layer */}
        <div className="absolute -inset-1 bg-gradient-to-r from-teal-500/30 to-purple-600/30 rounded-[4rem] blur-2xl opacity-50 group-hover:opacity-100 transition duration-1000"></div>
        
        {/* Main Body */}
        <div className="relative z-10 bg-slate-950 rounded-[4rem] overflow-hidden shadow-2xl border border-white/10">
          {/* Paper Texture Overlay */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]"></div>
          
          {/* Animated Stars */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(50)].map((_, i) => (
              <div 
                key={i}
                className="absolute bg-white rounded-full animate-twinkle"
                style={{
                  width: `${Math.random() * 2 + 1}px`,
                  height: `${Math.random() * 2 + 1}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  opacity: Math.random() * 0.5 + 0.2
                }}
              />
            ))}
          </div>

          <div className="relative p-12 md:p-24 space-y-12">
             {/* Floating Dino Decor */}
             <div className="absolute top-10 right-10 text-8xl md:text-9xl opacity-10 animate-float select-none pointer-events-none">🦖</div>
             
             {/* Message Content */}
             <div className="font-serif text-indigo-50 text-xl md:text-3xl leading-relaxed whitespace-pre-wrap selection:bg-teal-500/30 relative z-20">
               {personalLetter}
             </div>

             {/* Closing Section */}
             <div className="pt-20 border-t border-white/10 flex flex-col md:flex-row items-center md:items-end justify-between gap-12">
                <div className="text-center md:text-left space-y-4">
                  <p className="font-cursive text-6xl md:text-7xl text-teal-400 drop-shadow-[0_0_15px_rgba(45,212,191,0.4)]">
                    With all my heart,
                  </p>
                  <p className="text-white/30 font-black uppercase tracking-[0.8em] text-xs">Naveen & Sweeta 🧿</p>
                </div>

                {/* Cyber Seal */}
                <div className="relative group/seal">
                   <div className="absolute -inset-4 bg-teal-500/20 rounded-full blur-xl group-hover/seal:animate-ping"></div>
                   <div className="w-28 h-28 bg-gradient-to-br from-teal-500 to-indigo-600 rounded-full flex items-center justify-center text-5xl shadow-2xl border-4 border-white/20 rotate-12 transition-transform group-hover/seal:scale-110 group-hover/seal:rotate-0 duration-500 cursor-pointer">
                      ✨
                   </div>
                   <div className="absolute -top-2 -right-2 bg-rose-500 text-white text-[10px] font-black p-1 px-3 rounded-full border-2 border-slate-950 uppercase tracking-tighter">
                      Soulbound
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* Footer Quote */}
      <div className="text-center space-y-4 pt-10">
        <div className="flex items-center justify-center gap-4 text-teal-500/20">
          <div className="h-px w-16 bg-current"></div>
          <span className="text-2xl">🧿</span>
          <div className="h-px w-16 bg-current"></div>
        </div>
        <p className="text-[11px] font-black uppercase tracking-[1em] text-slate-400">Till the world disappears</p>
      </div>

      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.3); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        .animate-twinkle { animation: twinkle 3s ease-in-out infinite; }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .font-cursive { font-family: 'Dancing Script', cursive; }
      `}</style>
    </div>
  );
};

export default EmotionalMessage;
