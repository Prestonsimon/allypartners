
import React from 'react';
import { SERVICES } from '../constants';

interface ServicesProps {
  onContactClick: (e: React.MouseEvent) => void;
}

const Services: React.FC<ServicesProps> = ({ onContactClick }) => {
  return (
    <section id="services" className="py-24 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-xl">
            <h2 className="text-blue-500 font-bold text-[10px] uppercase tracking-[0.3em] mb-4">Our Expertise</h2>
            <h3 className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-none">Specialized solutions for modern finance.</h3>
          </div>
          <p className="text-zinc-500 max-w-xs text-sm leading-relaxed">
            Generic consulting doesn't work for alternative assets. We offer surgical precision for firms that demand excellence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
          {SERVICES.map((service, index) => (
            <div 
              key={service.title} 
              className="group bg-zinc-900/50 p-8 rounded-[32px] border border-white/5 hover:border-blue-500/30 hover:bg-zinc-900 transition-all duration-500 flex flex-col h-full"
            >
              <div className="w-14 h-14 bg-zinc-900 border border-white/10 rounded-2xl flex items-center justify-center text-white shadow-sm mb-8 group-hover:bg-blue-600 group-hover:border-blue-600 transition-all duration-300">
                <i className={`fa-solid ${service.icon} text-xl`}></i>
              </div>
              <h4 className="text-lg font-bold text-white mb-3 tracking-tight group-hover:text-blue-400 transition-colors">
                {service.title}
              </h4>
              <p className="text-zinc-500 text-sm leading-relaxed mb-8 flex-grow">
                {service.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {service.tags?.map(tag => (
                  <span key={tag} className="text-[9px] font-bold uppercase tracking-wider px-2 py-1 bg-white/5 border border-white/5 text-zinc-500 rounded-md group-hover:text-blue-500/80 transition-colors">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <button 
            onClick={onContactClick}
            className="group flex flex-col items-center gap-4 text-center"
          >
            <span className="text-xs font-bold uppercase tracking-[0.4em] text-zinc-600 group-hover:text-blue-500 transition-colors">Request a Consultation</span>
            <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-zinc-100 group-hover:text-zinc-950 transition-all">
              <i className="fa-solid fa-arrow-down animate-bounce"></i>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Services;
