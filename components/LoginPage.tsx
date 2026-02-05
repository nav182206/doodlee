
import React, { useState, useEffect } from 'react';

interface LoginPageProps {
  onUnlock: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onUnlock }) => {
  const [key, setKey] = useState('');
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  // Quick auto-submit when 4 digits are entered
  useEffect(() => {
    if (key.length === 4) {
      if (key === '1999') {
        onUnlock();
      } else {
        setError(true);
        setShake(true);
        setTimeout(() => {
          setShake(false);
          setKey('');
        }, 500);
      }
    }
  }, [key, onUnlock]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (key === '1999') {
      onUnlock();
    } else {
      setError(true);
      setShake(true);
      setTimeout(() => setShake(false), 500);
      setKey('');
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[#020617]">
      {/* Immersive Tech Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 via-transparent to-transparent"></div>
        
        {/* Glowing Orbs */}
        <div className="absolute top-1/4 left-1/4 w-[30%] h-[30%] bg-blue-500/10 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[30%] h-[30%] bg-indigo-500/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className={`relative w-full max-w-[400px] mx-4 transition-all duration-300 ${shake ? 'animate-shake' : ''}`}>
        {/* Glow behind card */}
        <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-[3rem]"></div>

        <div className="relative bg-slate-950 border border-white/10 rounded-[3rem] p-10 md:p-12 shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden">
          
          {/* Scanning Line */}
          <div className="absolute inset-0 pointer-events-none z-20">
            <div className="w-full h-1 bg-blue-500/50 shadow-[0_0_15px_rgba(59,130,246,0.8)] absolute top-0 animate-scan"></div>
          </div>

          <div className="relative z-10 flex flex-col items-center gap-8">
            {/* The Vault Interface */}
            <div className="relative">
              <div className={`w-24 h-24 rounded-full bg-slate-900 border-2 flex items-center justify-center transition-all duration-300 ${error ? 'border-rose-500 shadow-[0_0_20px_rgba(244,63,94,0.4)]' : 'border-blue-500/50 shadow-[0_0_20px_rgba(59,130,246,0.3)]'}`}>
                <div className={`w-16 h-16 rounded-full border-2 border-dashed transition-all duration-700 ${key.length > 0 ? 'animate-spin-slow border-blue-400' : 'border-slate-800'}`}></div>
                <div className="absolute inset-0 flex items-center justify-center">
                   <svg className={`w-8 h-8 transition-colors ${error ? 'text-rose-500' : 'text-blue-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                   </svg>
                </div>
              </div>
            </div>

            <div className="text-center space-y-2">
              <h1 className="text-2xl font-serif-elegant font-bold text-white tracking-widest uppercase">Secret Vault</h1>
              <p className="text-slate-500 text-[9px] font-black tracking-[0.4em] uppercase">Private Encryption Active</p>
            </div>

            <form onSubmit={handleSubmit} className="w-full space-y-8">
              <div className="relative">
                <input
                  type="tel"
                  inputMode="numeric"
                  value={key}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, '').slice(0, 4);
                    setKey(val);
                    setError(false);
                  }}
                  placeholder="0000"
                  className={`w-full bg-slate-900/50 border-2 rounded-2xl py-5 text-center text-4xl font-mono tracking-[0.6em] text-blue-400 focus:outline-none transition-all ${
                    error ? 'border-rose-500/50 text-rose-500' : 'border-slate-800 focus:border-blue-500/50'
                  }`}
                  autoFocus
                />
                
                {/* Indicator Dots */}
                <div className="flex justify-center gap-3 mt-4">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className={`w-2 h-2 rounded-full transition-all duration-200 ${key.length > i ? 'bg-blue-500 scale-125' : 'bg-slate-800'}`}></div>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-lg shadow-blue-900/20 active:scale-95 transition-all"
              >
                Access Denied? No, Proceed
              </button>
            </form>
            
            <p className="text-[8px] text-slate-600 font-bold uppercase tracking-[0.3em] italic">System Security: Level 9 Protection</p>
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes scan {
          0% { top: -10%; }
          100% { top: 110%; }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
        .animate-scan { animation: scan 4s linear infinite; }
        .animate-spin-slow { animation: spin-slow 12s linear infinite; }
        .animate-shake { animation: shake 0.3s ease-in-out; }
      `}</style>
    </div>
  );
};

export default LoginPage;
