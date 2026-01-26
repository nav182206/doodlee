
import React from 'react';
import { MOMENTS } from '../constants';

const Moments: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4">
      <h2 className="text-4xl font-serif-elegant font-bold text-center mb-20">Our Core Moments</h2>
      
      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-rose-200"></div>

        <div className="space-y-24">
          {MOMENTS.map((moment, index) => (
            <div key={moment.id} className={`relative flex items-center ${index % 2 === 0 ? 'flex-row-reverse' : 'flex-row'}`}>
              {/* Content Card */}
              <div className="w-1/2 px-8">
                <div className={`p-6 rounded-2xl bg-white shadow-lg border border-rose-50 hover:border-rose-200 transition-all ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                  <span className="text-rose-400 font-bold text-sm tracking-widest uppercase">{moment.date}</span>
                  <h3 className="text-2xl font-serif-elegant font-bold mt-2 mb-3">{moment.title}</h3>
                  <p className="text-gray-600 leading-relaxed font-light">{moment.description}</p>
                </div>
              </div>

              {/* Icon / Dot */}
              <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center w-12 h-12 bg-rose-500 rounded-full text-2xl shadow-xl z-10 border-4 border-white">
                {moment.icon}
              </div>

              {/* Empty Space for layout */}
              <div className="w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Moments;
