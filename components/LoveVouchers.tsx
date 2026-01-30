
import React, { useState } from 'react';
import { Voucher } from '../types';

const VOUCHERS: Voucher[] = [
  { id: '1', title: 'One Fancy Dinner', description: 'Any restaurant of your choice. My treat, always.', emoji: '🕯️', color: 'from-amber-400 to-orange-500' },
  { id: '2', title: 'A Big Bear Hug', description: 'Redeemable anytime, anywhere. Valid for 10 minutes.', emoji: '🧸', color: 'from-blue-400 to-indigo-500' },
  { id: '3', title: 'Netflix & Chill Night', description: 'You pick the show, I buy the snacks. No complaints.', emoji: '🍿', color: 'from-red-400 to-rose-500' },
  { id: '4', title: 'One "Yes" Day', description: 'I have to say yes to anything you want for 24 hours.', emoji: '✨', color: 'from-purple-400 to-fuchsia-500' },
  { id: '5', title: 'Personal Foot Massage', description: 'Relax after a long day. 30 minutes of pure bliss.', emoji: '💆‍♀️', color: 'from-teal-400 to-emerald-500' },
  { id: '6', title: 'Adventure Trip', description: 'One weekend getaway to a place we haven\'t been yet.', emoji: '✈️', color: 'from-sky-400 to-blue-500' },
];

const LoveVouchers: React.FC = () => {
  const [redeemed, setRedeemed] = useState<Set<string>>(new Set());
  const ALBUM_LINK = "https://photos.app.goo.gl/RH4qNG3npM8SfC8K9";

  const handleRedeem = (id: string) => {
    const newRedeemed = new Set(redeemed);
    newRedeemed.add(id);
    setRedeemed(newRedeemed);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 space-y-24 pb-40">
      {/* Header */}
      <div className="flex flex-col items-center text-center gap-6">
        <div className="w-24 h-24 bg-gradient-to-tr from-rose-400 to-pink-500 rounded-[2.5rem] flex items-center justify-center text-white text-5xl shadow-2xl shadow-rose-200 animate-bounce">🎁</div>
        <div className="space-y-2">
          <h2 className="text-5xl md:text-7xl font-serif-elegant font-bold text-gray-900 tracking-tight italic">Love Vouchers</h2>
          <p className="text-rose-500 font-bold tracking-[0.3em] uppercase text-xs">Redeemable for one lifetime of happiness 💙</p>
        </div>
        <p className="max-w-xl text-gray-500 italic text-lg">
          "Since I can't give you everything at once, here are some promises for the future. Click to redeem your birthday gifts!"
        </p>
      </div>

      {/* Grid of Vouchers */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {VOUCHERS.map((voucher) => {
          const isRedeemed = redeemed.has(voucher.id);
          return (
            <div 
              key={voucher.id}
              className={`group relative perspective-1000 transition-all duration-700 ${isRedeemed ? 'scale-95 grayscale-[0.5]' : 'hover:-translate-y-2'}`}
            >
              <div className={`relative bg-white rounded-[3rem] p-8 border-2 shadow-xl overflow-hidden transition-all duration-500 ${isRedeemed ? 'border-green-100 bg-green-50/30' : 'border-white hover:shadow-rose-100'}`}>
                
                {/* Voucher Header */}
                <div className="flex justify-between items-start mb-6">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${voucher.color} flex items-center justify-center text-3xl shadow-lg`}>
                    {voucher.emoji}
                  </div>
                  <div className="text-[10px] font-black tracking-widest text-gray-300 uppercase rotate-90 origin-right translate-y-4">
                    VCH-2024
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-2xl font-serif-elegant font-bold text-gray-800">{voucher.title}</h3>
                  <p className="text-gray-500 text-sm italic min-h-[40px]">"{voucher.description}"</p>
                  
                  <button 
                    onClick={() => handleRedeem(voucher.id)}
                    disabled={isRedeemed}
                    className={`w-full py-4 rounded-2xl font-bold uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-2 ${
                      isRedeemed 
                        ? 'bg-green-100 text-green-600 cursor-default' 
                        : 'bg-gray-900 text-white hover:bg-black active:scale-95 shadow-lg'
                    }`}
                  >
                    {isRedeemed ? (
                      <>
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                        Redeemed
                      </>
                    ) : (
                      'Redeem Gift'
                    )}
                  </button>
                </div>

                {/* Decorative perforation dots */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-8 bg-gradient-soft rounded-r-full border-y border-r border-gray-100"></div>
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-8 bg-gradient-soft rounded-l-full border-y border-l border-gray-100"></div>
              </div>

              {/* Redeem Stamp Overlay */}
              {isRedeemed && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none animate-in zoom-in duration-300">
                  <div className="border-4 border-green-500/30 text-green-600/30 font-black text-4xl uppercase tracking-tighter rotate-[-20deg] px-4 py-2 rounded-xl">
                    Confirmed
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* The Ultimate Collection Section (Moved here from previous Voices tab) */}
      <div className="pt-20 border-t border-rose-100">
        <div className="flex flex-col items-center gap-10">
          <div className="flex items-center gap-6 w-full">
            <div className="h-px flex-grow bg-blue-100"></div>
            <h3 className="text-3xl font-serif-elegant font-bold text-gray-800 italic">Sweeta's Cutest Moments 💙</h3>
            <div className="h-px flex-grow bg-blue-100"></div>
          </div>

          <div className="w-full max-w-3xl group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-indigo-500/10 blur-3xl -z-10 rounded-full group-hover:scale-110 transition-transform duration-1000"></div>
              
              <div className="bg-white/80 backdrop-blur-xl border-4 border-white rounded-[4rem] p-16 shadow-2xl text-center space-y-8 transition-all duration-500 hover:shadow-blue-200/50 hover:-translate-y-2">
                  <div className="text-8xl animate-float">🧸</div>
                  <div className="space-y-4">
                      <h4 className="text-4xl font-serif-elegant font-bold text-gray-800">The Ultimate Collection</h4>
                      <p className="text-gray-500 text-lg italic max-w-lg mx-auto leading-relaxed">
                          "From little infant baby steps to your favorite food and everything that makes you smile. I've put all those pictures in this one special place."
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
                      
                      <div className="mt-8 flex justify-center gap-6 text-2xl grayscale group-hover:grayscale-0 transition-all duration-700 opacity-40 group-hover:opacity-100">
                          <span>👶</span>
                          <span>🐧</span>
                          <span>🥣</span>
                          <span>🏀</span>
                          <span>🍫</span>
                      </div>
                  </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoveVouchers;
