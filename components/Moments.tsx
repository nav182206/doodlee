
import React, { useState, useEffect, useRef } from 'react';
import { Moment } from '../types';

interface MomentsProps {
  editMode: boolean;
  onSave: () => void;
}

const Moments: React.FC<MomentsProps> = ({ editMode, onSave }) => {
  const [localMoments, setLocalMoments] = useState<Moment[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [tempMoment, setTempMoment] = useState<Moment | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem('sweeta_birthday_moments');
    if (saved) {
      try {
        setLocalMoments(JSON.parse(saved));
      } catch (e) {
        setLocalMoments(DEFAULT_MOMENTS);
      }
    } else {
      setLocalMoments(DEFAULT_MOMENTS);
    }
  }, []);

  const saveAll = (updated: Moment[]) => {
    setLocalMoments(updated);
    localStorage.setItem('sweeta_birthday_moments', JSON.stringify(updated));
    onSave();
  };

  const handleIconUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && tempMoment) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempMoment({ ...tempMoment, icon: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const startEdit = (m: Moment) => {
    setTempMoment({ ...m });
    setEditingId(m.id);
  };

  const submitEdit = () => {
    if (!tempMoment) return;
    const updated = localMoments.map(m => m.id === tempMoment.id ? tempMoment : m);
    saveAll(updated);
    setEditingId(null);
  };

  return (
    <div className="max-w-5xl mx-auto px-6 pb-40">
      <div className="text-center mb-24 space-y-4">
        <h2 className="text-5xl md:text-7xl font-serif-elegant font-bold text-gray-900 tracking-tight">Our Core Moments</h2>
        <p className="text-gray-500 italic text-xl">The small steps that led to us. 💙</p>
      </div>

      <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleIconUpload} />
      
      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-rose-100 via-rose-300 to-rose-100"></div>

        <div className="space-y-32">
          {localMoments.map((moment, index) => (
            <div key={moment.id} className={`relative flex items-center ${index % 2 === 0 ? 'flex-row-reverse' : 'flex-row'}`}>
              
              {/* Content Card */}
              <div className="w-1/2 px-12 group">
                <div className={`relative p-10 rounded-[3rem] bg-white shadow-2xl border-2 transition-all duration-500 hover:-translate-y-2 ${
                  index % 2 === 0 ? 'text-right border-rose-50 hover:border-rose-200' : 'text-left border-blue-50 hover:border-blue-200'
                }`}>
                  {editMode && (
                    <button 
                      onClick={() => startEdit(moment)}
                      className="absolute top-6 right-6 w-10 h-10 bg-gray-50 text-gray-400 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      ✏️
                    </button>
                  )}
                  <span className="text-rose-400 font-black text-xs tracking-[0.3em] uppercase">{moment.date}</span>
                  <h3 className="text-3xl font-serif-elegant font-bold mt-3 mb-4 text-gray-800">{moment.title}</h3>
                  <p className="text-gray-500 leading-relaxed font-light text-lg italic">"{moment.description}"</p>
                </div>
              </div>

              {/* Icon / Photo Circle */}
              <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center w-24 h-24 bg-white rounded-full shadow-[0_20px_40px_rgba(0,0,0,0.1)] z-10 border-8 border-white group overflow-hidden">
                 {moment.icon.startsWith('data:') || moment.icon.startsWith('http') ? (
                   <img src={moment.icon} alt="moment" className="w-full h-full object-cover" />
                 ) : (
                   <span className="text-4xl animate-float">{moment.icon}</span>
                 )}
              </div>

              {/* Empty Space for layout */}
              <div className="w-1/2"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Modal */}
      {editingId && tempMoment && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-rose-900/20 backdrop-blur-md animate-in fade-in duration-300">
           <div className="w-full max-w-lg bg-white rounded-[3.5rem] p-12 shadow-2xl border border-rose-100" onClick={e => e.stopPropagation()}>
             <h3 className="text-3xl font-serif-elegant font-bold text-center mb-8">Edit Moment</h3>
             <div className="space-y-6">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-24 h-24 bg-rose-50 rounded-full overflow-hidden border-4 border-white shadow-lg cursor-pointer hover:opacity-80 transition-opacity" onClick={() => fileInputRef.current?.click()}>
                    {tempMoment.icon.startsWith('data:') ? <img src={tempMoment.icon} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-3xl">{tempMoment.icon}</div>}
                  </div>
                  <p className="text-[10px] font-black uppercase text-rose-300">Tap icon to change</p>
                </div>
                <input value={tempMoment.date} onChange={e => setTempMoment({...tempMoment, date: e.target.value})} className="w-full px-6 py-4 rounded-2xl bg-gray-50 focus:bg-white border-2 border-transparent focus:border-rose-200 outline-none" placeholder="Date/Period" />
                <input value={tempMoment.title} onChange={e => setTempMoment({...tempMoment, title: e.target.value})} className="w-full px-6 py-4 rounded-2xl bg-gray-50 focus:bg-white border-2 border-transparent focus:border-rose-200 outline-none" placeholder="Title" />
                <textarea value={tempMoment.description} onChange={e => setTempMoment({...tempMoment, description: e.target.value})} className="w-full px-6 py-4 rounded-2xl bg-gray-50 focus:bg-white border-2 border-transparent focus:border-rose-200 outline-none h-32" placeholder="Description" />
                <div className="grid grid-cols-2 gap-4">
                  <button onClick={() => setEditingId(null)} className="py-5 font-bold text-gray-400">Cancel</button>
                  <button onClick={submitEdit} className="py-5 bg-rose-500 text-white rounded-2xl font-bold shadow-lg shadow-rose-100 hover:bg-rose-600">Save Memory</button>
                </div>
             </div>
           </div>
        </div>
      )}
    </div>
  );
};

const DEFAULT_MOMENTS: Moment[] = [
  { id: '1', date: 'The First Hello', title: 'Where it Began', description: 'The moment my world changed forever.', icon: '✨' },
  { id: '2', date: 'Our First Date', title: 'Coffee & Conversations', description: 'I knew then that you were someone truly special.', icon: '☕' },
  { id: '3', date: 'First Trip', title: 'Adventures Together', description: 'Exploring new places while falling deeper in love.', icon: '✈️' },
  { id: '4', date: 'Today', title: 'Celebrating You', description: 'Happy Birthday to my everything.', icon: '🎂' }
];

export default Moments;
