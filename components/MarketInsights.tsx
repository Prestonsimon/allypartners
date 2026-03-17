import React, { useState, useEffect } from 'react';
import { INSIGHT_PROMPTS } from '../constants';
import { InsightResult } from '../types';
import { geminiService } from '../services/geminiApi'; // Updated to use the new bridge service

interface MarketInsightsProps {
  onContactClick: (e: React.MouseEvent) => void;
}

// 1. Define the interface to ensure TypeScript knows the structure of your constants
interface InsightPrompt {
  id: string;
  label: string; // Using label as per your original code
  prompt: string;
}

const MarketInsights: React.FC<MarketInsightsProps> = ({ onContactClick }) => {
  // 2. Cast constants to the interface
  const prompts = (INSIGHT_PROMPTS as unknown) as InsightPrompt[];
  
  const [loading, setLoading] = useState(false);
  const [selectedPromptId, setSelectedPromptId] = useState<string | null>(null);
  const [result, setResult] = useState<InsightResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handlePromptClick = async (id: string) => {
    if (loading && selectedPromptId === id) return;
    
    setSelectedPromptId(id);
    setLoading(true);
    setError(null);
    
    try {
      const insightText = await geminiService.getMarketInsight(id);
      
      setResult({
        text: insightText,
        timestamp: new Date()
      });
    } catch (err) {
      console.error("Failed to fetch insight:", err);
      setError("Unable to refresh live insights. Using latest strategic brief.");
      setResult({
        text: "Efficiency in alternative asset management is no longer a luxury; it is the primary differentiator for 2026. Jersey-based firms are increasingly leading the shift toward fully automated middle-office operations.",
        timestamp: new Date()
      });
    } finally {
      setLoading(false);
    }
  };
useEffect(() => {
  // Give the mobile browser 1 second to breathe before hitting the API
  const timer = setTimeout(() => {
    const initialPrompt = prompts[0];
    if (initialPrompt) handlePromptClick(initialPrompt.id);
  }, 1000);
  
  return () => clearTimeout(timer);
}, []);
  return (
    <section id="insights" className="py-24 bg-zinc-950 text-white relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.05)_0%,transparent_100%)]"></div>
      
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-blue-500 font-bold text-[10px] uppercase tracking-[0.3em] mb-4">Intelligence Engine</h2>
          <h3 className="text-3xl font-bold tracking-tight">Real-time Strategic Summaries.</h3>
        </div>

        <div className="flex flex-col items-center">
          {/* Minimalist prompt selector */}
          <div className="flex flex-wrap justify-center gap-2 mb-12 p-1.5 bg-zinc-900 rounded-2xl border border-white/5">
            {prompts.map((item) => (
              <button
                key={item.id}
                onClick={() => handlePromptClick(item.id)}
                disabled={loading}
                className={`px-5 py-2.5 rounded-xl text-[11px] font-bold uppercase tracking-wider transition-all ${
                  selectedPromptId === item.id 
                    ? 'bg-blue-600 text-white shadow-lg' 
                    : 'text-zinc-500 hover:text-zinc-300 hover:bg-white/5'
                } disabled:opacity-50`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Insight Result - Original Quote Style */}
          <div className="w-full max-w-4xl min-h-[400px] relative flex flex-col items-center justify-center text-center px-6">
            {loading ? (
              <div className="flex flex-col items-center animate-pulse">
                <div className="flex gap-1.5 mb-6">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                </div>
                <p className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest">Synthesizing Brief...</p>
              </div>
            ) : result ? (
              <div className="flex flex-col items-center transition-all duration-700">
                {/* Large decorative quotation mark */}
                <div className="text-blue-500/10 text-9xl font-serif absolute top-0 left-1/2 -translate-x-1/2 -z-10 select-none">“</div>
                
                <blockquote className="text-2xl md:text-3xl font-medium text-zinc-100 leading-tight mb-8 max-w-2xl italic">
                  {result.text}
                </blockquote>
                
                {error && <p className="text-[10px] text-zinc-600 mb-6 font-bold uppercase tracking-widest">{error}</p>}
                
                <div className="flex items-center justify-center gap-3 mb-10">
                  <div className="h-px w-8 bg-zinc-800"></div>
                  <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">
                    Ally AI Consultant • {result.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                  <div className="h-px w-8 bg-zinc-800"></div>
                </div>

                <button 
                  onClick={onContactClick}
                  className="px-8 py-3 bg-zinc-100/5 hover:bg-zinc-100/10 border border-white/10 rounded-xl text-[10px] font-bold text-blue-400 uppercase tracking-widest transition-all group"
                >
                  Consult with an Ally 
                  <span className="inline-block ml-2 transition-transform group-hover:translate-x-1">→</span>
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarketInsights;