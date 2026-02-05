
import React, { useState, useEffect } from 'react';

interface LoginPageProps {
  onUnlock: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onUnlock }) => {
  const [key, setKey] = useState('');
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(d => d.length >= 3 ? '' : d + '.');
    }, 600);
    return () => clearInterval(interval);
  }, []);

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
      {/* Dynamic Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20"></div>
        
        {/* Glowing Orbs */}
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-500/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-500/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className={`relative w-[90%] max-w-md p-1 bg-gradient-to-b from-slate-700/50 to-slate-900/50 rounded-[3rem] shadow-2xl backdrop-blur-xl transition-all duration-500 ${shake ? 'animate-shake' : ''}`}>
        {/* Inner Card */}
        <div className="bg-slate-950/80 rounded-[2.9rem] p-10 md:p-14 space-y-10 relative overflow-hidden">
          
          {/* Laser Scan Effect */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[2.9rem]">
            <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent absolute top-0 animate-scan shadow-[0_0_15px_rgba(59,130,246,0.8)] opacity-30"></div>
          </div>

          <div className="space-y-6 text-center relative z-10">
            {/* The Vault Core */}
            <div className="relative inline-block group">
              <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-2xl group-hover:bg-blue-500/40 transition-all duration-700"></div>
              <div className={`w-28 h-28 rounded-full bg-slate-900 border-4 border-slate-800 flex items-center justify-center text-white shadow-inner relative transition-transform duration-500 ${key.length > 0 ? 'scale-110 border-blue-500/50' : ''}`}>
                <svg className={`w-12 h-12 transition-all duration-500 ${error ? 'text-rose-500' : 'text-blue-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                
                {/* Orbital Ring */}
                <div className="absolute inset-[-10px] border border-blue-500/20 rounded-full animate-spin-slow"></div>
              </div>
            </div>

            <div className="space-y-2">
              <h1 className="text-3xl font-serif-elegant font-bold text-white tracking-tight">Secret Access</h1>
              <p className="text-slate-500 font-bold text-[10px] uppercase tracking-[0.5em]">Identity Verification{dots}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-10 relative z-10">
            <div className="relative group">
              <input
                type="tel"
                pattern="[0-9]*"
                inputMode="numeric"
                value={key}
                onChange={(e) => {
                  setKey(e.target.value);
                  setError(false);
                }}
                placeholder="••••"
                className={`w-full bg-slate-900/50 border-2 rounded-3xl py-6 px-4 text-center text-4xl font-mono tracking-[0.8em] text-blue-400 transition-all duration-300 focus:outline-none placeholder:text-slate-800 ${
                  error ? 'border-rose-500 bg-rose-500/5' : 'border-slate-800 focus:border-blue-500/50 focus:bg-slate-900'
                }`}
                maxLength={4}
              />
              
              {/* Input Status Label */}
              <div className="absolute -bottom-6 left-0 right-0 text-center">
                <p className={`text-[9px] font-black uppercase tracking-widest transition-all duration-300 ${error ? 'text-rose-500 opacity-100 animate-bounce' : 'text-slate-600 opacity-50'}`}>
                  {error ? 'Access Denied: Try Again' : 'Enter 4-Digit Key'}
                </p>
              </div>
            </div>

            <button
              type="submit"
              className="w-full group relative py-5 bg-blue-600 text-white rounded-[2rem] font-black uppercase tracking-[0.3em] text-xs shadow-2xl transition-all active:scale-95 overflow-hidden"
            >
              <div className="relative z-10 flex items-center justify-center gap-3">
                <span>Decrypt Memories</span>
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </form>

          {/* Footer Info */}
          <div className="pt-4 border-t border-slate-900 text-center relative z-10">
            <div className="flex items-center justify-center gap-2 mb-1">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
              <p className="text-[8px] uppercase tracking-[0.5em] text-slate-500 font-bold">Secure Connection Established</p>
            </div>
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
        @keyframes scan {
          0% { top: -10%; }
          100% { top: 110%; }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-shake { animation: shake 0.4s ease-in-out; }
        .animate-scan { animation: scan 3s linear infinite; }
        .animate-spin-slow { animation: spin-slow 8s linear infinite; }
      `}</style>
    </div>
  );
};

export default LoginPage;
