
import React, { useState, useEffect } from 'react';

interface LoginPageProps {
  onUnlock: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onUnlock }) => {
  const [key, setKey] = useState('');
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);
  const [isDecrypting, setIsDecrypting] = useState(false);

  // The Secret Code - Hidden from user
  const SECRET_CODE = '1999';

  useEffect(() => {
    if (key.length === 4) {
      if (key === SECRET_CODE) {
        setIsDecrypting(true);
        const timer = setTimeout(() => {
          onUnlock();
        }, 600);
        return () => clearTimeout(timer);
      } else {
        setError(true);
        setShake(true);
        const timer = setTimeout(() => {
          setShake(false);
          setKey('');
          setError(false);
        }, 500);
        return () => clearTimeout(timer);
      }
    }
  }, [key, onUnlock]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (key === SECRET_CODE) {
      onUnlock();
    } else {
      setError(true);
      setShake(true);
      setTimeout(() => {
        setShake(false);
        setError(false);
        setKey('');
      }, 500);
    }
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-[#020617] overflow-hidden">
      {/* Immersive Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-blue-600/5 rounded-full blur-[150px] animate-pulse"></div>
      </div>

      <div className={`relative w-full max-w-[450px] mx-6 transition-all duration-500 ${isDecrypting ? 'scale-90 opacity-0 blur-xl' : 'scale-100'} ${shake ? 'animate-shake' : ''}`}>
        {/* Glow Layer */}
        <div className="absolute inset-[-30px] bg-blue-500/10 blur-[80px] rounded-full"></div>

        <div className="relative bg-slate-950/80 backdrop-blur-3xl border border-white/10 rounded-[3.5rem] p-10 md:p-14 shadow-[0_0_100px_rgba(0,0,0,0.8)] overflow-hidden">
          
          {/* Scanning Effect */}
          <div className="absolute inset-0 pointer-events-none z-20">
            <div className="w-full h-1 bg-gradient-to-r from-transparent via-blue-500/40 to-transparent absolute top-0 animate-scan"></div>
          </div>

          <div className="relative z-10 flex flex-col items-center gap-10">
            {/* Archive Heart Icon */}
            <div className="relative">
              <div className={`w-24 h-24 rounded-[2rem] bg-slate-900 border-2 flex items-center justify-center transition-all duration-300 ${error ? 'border-rose-500 shadow-[0_0_30px_rgba(244,63,94,0.4)]' : 'border-blue-500/20 shadow-[0_0_30px_rgba(59,130,246,0.1)]'}`}>
                {isDecrypting ? (
                  <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <div className={`text-4xl transition-transform duration-500 ${key.length > 0 ? 'scale-110' : 'scale-100 opacity-60'}`}>
                    {error ? '🔒' : '💙'}
                  </div>
                )}
              </div>
            </div>

            <div className="text-center space-y-4">
              <h1 className="text-2xl md:text-3xl font-serif-elegant font-bold text-white tracking-[0.2em] italic">The Heart’s Archive</h1>
              <p className="text-slate-400 text-xs md:text-sm font-light italic leading-relaxed max-w-[280px] mx-auto opacity-80">
                "Every memory you made, tucked away in a place only we can go. Step inside and stay a while."
              </p>
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
                  placeholder="----"
                  className={`w-full bg-slate-900/40 border-2 rounded-2xl py-6 text-center text-5xl font-mono tracking-[0.4em] text-blue-400 focus:outline-none transition-all placeholder:text-slate-800 selection:bg-blue-500/20 ${
                    error ? 'border-rose-500/50 text-rose-500' : 'border-slate-800/50 focus:border-blue-500/40 shadow-inner'
                  }`}
                  autoFocus
                />
                
                {/* Auth Progress Indicators */}
                <div className="flex justify-center gap-4 mt-8">
                  {[...Array(4)].map((_, i) => (
                    <div 
                      key={i} 
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        key.length > i 
                          ? 'w-8 bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.8)]' 
                          : 'w-2 bg-slate-800'
                      }`}
                    ></div>
                  ))}
                </div>
              </div>

              <div className="pt-2 text-center">
                 <p className="text-slate-700 text-[8px] font-black uppercase tracking-[0.5em] italic">Encrypted Session Enabled</p>
              </div>
            </form>
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes scan {
          0% { top: -10%; opacity: 0; }
          10%, 90% { opacity: 1; }
          100% { top: 110%; opacity: 0; }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-12px); }
          75% { transform: translateX(12px); }
        }
        .animate-scan { animation: scan 4s ease-in-out infinite; }
        .animate-shake { animation: shake 0.35s cubic-bezier(.36,.07,.19,.97) both; }
      `}</style>
    </div>
  );
};

export default LoginPage;
