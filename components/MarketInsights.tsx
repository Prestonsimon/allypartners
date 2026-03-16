import React, { useState, useEffect } from 'react';
import { INSIGHT_PROMPTS } from '../constants';
import { geminiService } from '../services/geminiApi';
import { Sparkles, BarChart3, ChevronRight, Loader2 } from 'lucide-react';

// 1. Define the interface OUTSIDE the component
interface InsightPrompt {
  id: string;
  title: string;
  prompt: string;
}

const MarketInsights: React.FC = () => {
  // 2. Use the "Double Cast" here to perfectly align with your constants
  const prompts = (INSIGHT_PROMPTS as unknown) as InsightPrompt[];
  
  // 3. Initialize state safely
  const [activeTab, setActiveTab] = useState(prompts.length > 0 ? prompts[0].id : '');
  const [insight, setInsight] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const fetchInsight = async (id: string) => {
    if (!id) return;
    setLoading(true);
    try {
      const result = await geminiService.getMarketInsight(id);
      setInsight(result);
    } catch (error) {
      setInsight("Strategic synthesis temporarily unavailable. Focus on core operational integrity remains paramount.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInsight(activeTab);
  }, [activeTab]);

  return (
    <section id="insights" className="py-24 bg-zinc-900/50 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-blue-500 mb-4">
              <Sparkles size={18} />
              <span className="text-xs font-bold uppercase tracking-widest">AI Market Intelligence</span>
            </div>
            <h2 className="text-4xl font-bold text-white mb-6">Operational Insights</h2>
            <p className="text-zinc-400 text-lg leading-relaxed">
              Real-time strategic synthesis for alternative asset managers. Select a focus area to generate an operational roadmap perspective.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-12">
          {/* Sidebar Tabs */}
          <div className="lg:col-span-4 space-y-3">
            {prompts.map((prompt) => (
              <button
                key={prompt.id}
                onClick={() => setActiveTab(prompt.id)}
                className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 flex items-center justify-between group ${
                  activeTab === prompt.id
                    ? 'bg-blue-600 border-blue-500 text-white shadow-xl shadow-blue-900/20'
                    : 'bg-zinc-900/50 border-white/5 text-zinc-400 hover:border-white/20 hover:bg-zinc-800'
                }`}
              >
                <span className="font-bold tracking-tight">{prompt.title}</span>
                <ChevronRight 
                  size={18} 
                  className={`transition-transform duration-300 ${
                    activeTab === prompt.id ? 'translate-x-1' : 'opacity-0 group-hover:opacity-100'
                  }`} 
                />
              </button>
            ))}
          </div>

          {/* Insight Display Area */}
          <div className="lg:col-span-8">
            <div className="bg-zinc-950 border border-white/10 rounded-[32px] p-8 md:p-12 min-h-[400px] relative overflow-hidden flex flex-col justify-center">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 blur-[100px] -z-10"></div>
              
              {loading ? (
                <div className="flex flex-col items-center justify-center text-zinc-500 gap-4 animate-in fade-in duration-500">
                  <Loader2 className="animate-spin text-blue-500" size={40} />
                  <p className="text-sm font-medium tracking-widest uppercase">Synthesizing Strategy...</p>
                </div>
              ) : (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 bg-blue-600/10 rounded-xl flex items-center justify-center text-blue-500">
                      <BarChart3 size={20} />
                    </div>
                    <span className="text-zinc-500 font-bold text-xs uppercase tracking-widest">
                      2026 Operational Perspective
                    </span>
                  </div>
                  <div className="text-zinc-300 text-xl md:text-2xl leading-relaxed font-light italic">
                    "{insight}"
                  </div>
                  <div className="mt-12 pt-8 border-t border-white/5">
                    <p className="text-zinc-600 text-xs leading-relaxed max-w-md italic">
                      Disclaimer: AI-generated insights are designed for strategic brainstorming and should be validated against specific regulatory and operational frameworks.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarketInsights;