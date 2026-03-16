import React from 'react';
// 1. Import the specific Lucide icons
import { Lightbulb, PieChart, Construction, ArrowRight } from 'lucide-react';

interface AllyApproachProps {
  onContactClick: (e: React.MouseEvent) => void;
}

const AllyApproach: React.FC<AllyApproachProps> = ({ onContactClick }) => {
  // 2. Updated the pillar objects to use the Component names instead of strings
  const pillars = [
    {
      title: 'Innovation-First',
      description: 'We prioritize modern, scalable technology that works for your team, not against it.',
      icon: Lightbulb
    },
    {
      title: 'Data-Driven',
      description: 'Decisions are backed by clear operational metrics and market intelligence.',
      icon: PieChart
    },
    {
      title: 'Roll up our sleeves',
      description: 'We don\'t just deliver slide decks. We execute alongside you in the trenches.',
      icon: Construction
    }
  ];

  return (
    <section id="approach" className="py-24 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-16 items-center">
          <div className="w-full md:w-1/2">
            <h2 className="text-xs font-bold text-blue-500 uppercase tracking-widest mb-4">Our Philosophy</h2>
            <h3 className="text-4xl font-bold text-white mb-6">Our Approach</h3>
            <p className="text-lg text-zinc-400 leading-relaxed mb-10">
              True partnership requires more than external advice. We act as an extension of your internal team, sharing your goals and navigating complexity as one unit.
            </p>
            <div className="space-y-10 mb-12">
              {pillars.map((pillar) => {
                // 3. Extract the icon component
                const Icon = pillar.icon;
                return (
                  <div key={pillar.title} className="flex gap-5">
                    <div className="flex-shrink-0 w-14 h-14 bg-blue-600/10 border border-blue-500/20 rounded-xl flex items-center justify-center text-blue-500">
                      {/* 4. Render as a React Component */}
                      <Icon size={24} strokeWidth={1.5} />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-lg mb-1">{pillar.title}</h4>
                      <p className="text-zinc-500 text-sm leading-relaxed">{pillar.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <button 
              onClick={onContactClick}
              className="text-white font-bold text-sm uppercase tracking-widest flex items-center gap-3 group"
            >
              Partner with us 
              {/* 5. Fixed the CTA arrow */}
              <ArrowRight size={18} className="text-blue-500 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          <div className="w-full md:w-1/2 bg-zinc-900 border border-white/5 rounded-[40px] p-6 md:p-10 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/5 to-transparent"></div>
            <img 
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200" 
              alt="Modern structural architecture conveying precision and integrity" 
              className="rounded-3xl shadow-2xl w-full h-[500px] object-cover grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-700 relative z-10"
            />
            <div className="absolute top-10 right-10 md:top-14 md:right-14 bg-zinc-950/90 backdrop-blur border border-white/10 px-4 py-2 rounded-xl shadow-2xl z-20 inline-flex items-center">
              <span className="text-[11px] font-bold text-white tracking-widest uppercase">Operational Integrity</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AllyApproach;