
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
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // The code remains '1999' as the secret key
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
    <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden">
      {/* Immersive Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-rose-100 via-white to-blue-100 animate-pulse transition-all duration-[10000ms]"></div>
      
      {/* Decorative Floating Elements */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute top-[10%] left-[15%] w-64 h-64 bg-rose-300/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-[15%] right-[20%] w-72 h-72 bg-blue-300/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className={`relative max-w-md w-full p-12 bg-white/40 backdrop-blur-2xl rounded-[3.5rem] shadow-[0_32px_64px_-12px_rgba(225,29,72,0.15)] border border-white/60 text-center space-y-10 transition-all duration-500 ${shake ? 'animate-shake' : ''}`}>
        
        <div className="space-y-4">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-blue-500 text-white shadow-[0_0_30px_rgba(59,130,246,0.4)] animate-pulse mb-4">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-4xl font-serif-elegant font-bold text-gray-900 tracking-tight">Secret Access</h1>
          <p className="text-gray-500 font-light text-sm italic">Enter the hidden key — FIND ME{dots}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="relative group">
            <input
              type="password"
              value={key}
              onChange={(e) => {
                setKey(e.target.value);
                setError(false);
              }}
              placeholder="FIND ME"
              className={`w-full px-8 py-6 rounded-3xl bg-black border-2 text-center text-3xl font-mono tracking-[0.5em] text-white transition-all duration-300 focus:outline-none placeholder:text-gray-600 placeholder:tracking-normal placeholder:text-lg ${
                error ? 'border-rose-500 ring-4 ring-rose-900/20' : 'border-gray-900 focus:border-blue-500 focus:shadow-[0_0_40px_rgba(59,130,246,0.4)]'
              }`}
              maxLength={4}
            />
            {error && (
              <p className="absolute -bottom-6 left-0 right-0 text-blue-500 text-xs font-bold tracking-widest uppercase animate-bounce">
                Try again, Sweeta 💙
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-5 bg-blue-500 text-white rounded-3xl font-bold text-lg shadow-[0_20px_40px_-10px_rgba(59,130,246,0.3)] hover:bg-blue-600 hover:shadow-[0_25px_50px_-12px_rgba(59,130,246,0.4)] active:scale-[0.98] transition-all flex items-center justify-center gap-3 group overflow-hidden relative"
          >
            <span className="relative z-10">Unlock Memories</span>
            <svg className="w-6 h-6 z-10 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </form>

        <div className="pt-6 border-t border-rose-100/50">
          <p className="text-[10px] uppercase tracking-[0.5em] text-blue-300 font-black">Private Anniversary Edition</p>
        </div>
      </div>
      
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-8px); }
          75% { transform: translateX(8px); }
        }
        .animate-shake {
          animation: shake 0.4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default LoginPage;
