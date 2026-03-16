import React from 'react';
// 1. Import the missing icons
import { ArrowRight, Check } from 'lucide-react';

interface HeroProps {
  onContactClick: (e: React.MouseEvent) => void;
}

const Hero: React.FC<HeroProps> = ({ onContactClick }) => {
  const roadmapSteps = [
    { label: 'Discovery', status: 'completed' },
    { label: 'Architecture', status: 'completed' },
    { label: 'Integration', status: 'active' },
    { label: 'Scale', status: 'pending' },
  ];

  return (
    <section className="relative min-h-[95vh] flex items-center pt-24 overflow-hidden bg-zinc-950">
      {/* Subtle Background Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-zinc-900/50 -z-10 translate-x-1/4 skew-x-12"></div>
      <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[120px] -z-10"></div>
      
      <div className="max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-12 items-center">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-zinc-900 border border-white/5 text-zinc-400 rounded-full text-[10px] font-bold uppercase tracking-widest mb-8">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
            Strategic Consultants
          </div>
          
          <h1 className="text-6xl md:text-[80px] font-extrabold text-white leading-[0.95] tracking-tighter mb-8">
            Execution <br/>
            <span className="text-blue-500">is the new</span> <br/>
            <span className="text-zinc-700">strategy.</span>
          </h1>
          
          <p className="text-xl text-zinc-400 leading-relaxed mb-12 max-w-xl">
            We help bridge the gap between technology and business teams to build the operational engines that drive alternative asset managers. No friction. No fluff. Just focus on whats required.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={onContactClick}
              className="bg-zinc-100 text-zinc-950 px-12 py-5 rounded-2xl font-bold hover:bg-blue-600 hover:text-white transition-all shadow-xl shadow-zinc-900 flex items-center gap-3 group"
            >
              Get In Touch 
              {/* 2. Fixed Arrow Icon */}
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        <div className="hidden lg:flex justify-end">
          <div className="relative w-full max-w-md">
            <div className="bg-zinc-900 border border-white/5 p-10 rounded-[48px] shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_30%,#3b82f610,transparent)]"></div>
              <div className="relative z-10">
                <div className="text-blue-500 mb-6 flex items-center gap-2">
                  <div className="h-[2px] w-8 bg-blue-500"></div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Implementation Roadmap</span>
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">Systemic Go-Live.</h3>
                <p className="text-zinc-400 text-sm leading-relaxed mb-8">
                  From initial assessment to deployment, we manage the critical milestones of your technical evolution.
                </p>
                
                {/* Roadmap Visualization */}
                <div className="space-y-6">
                  {roadmapSteps.map((step, idx) => (
                    <div key={step.label} className="flex items-center gap-4 group/step">
                      <div className="relative flex flex-col items-center">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                          step.status === 'completed' ? 'bg-blue-500 border-blue-500 text-[10px] text-zinc-950' : 
                          step.status === 'active' ? 'bg-zinc-950 border-blue-500 animate-pulse' : 
                          'bg-zinc-950 border-white/10'
                        }`}>
                          {/* 3. Fixed Check Icon */}
                          {step.status === 'completed' && <Check size={12} strokeWidth={3} />}
                          {step.status === 'active' && <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>}
                        </div>
                        {idx !== roadmapSteps.length - 1 && (
                          <div className={`w-[2px] h-6 mt-1 rounded-full ${
                            step.status === 'completed' ? 'bg-blue-500/30' : 'bg-white/5'
                          }`}></div>
                        )}
                      </div>
                      <div className="flex flex-col">
                        <span className={`text-[11px] font-bold uppercase tracking-wider ${
                          step.status === 'pending' ? 'text-zinc-600' : 'text-zinc-300'
                        }`}>
                          {step.label}
                        </span>
                        {step.status === 'active' && (
                          <span className="text-[9px] text-blue-500 font-bold uppercase tracking-widest mt-0.5">Integration Phase</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-blue-600/10 rounded-full blur-3xl animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;