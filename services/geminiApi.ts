// src/services/geminiApi.ts
import { INSIGHT_PROMPTS } from "../constants";

export const geminiService = {
  getMarketInsight: async (id: string): Promise<string> => {
    const promptConfig = INSIGHT_PROMPTS.find(p => p.id === id);
    if (!promptConfig) return "Invalid request.";

    const today = new Date().toISOString().split('T')[0];
    const cacheKey = `ally_insight_${id}_${today}`;
    
    if (typeof localStorage !== 'undefined') {
      const cached = localStorage.getItem(cacheKey);
      if (cached) return cached;
    }

    try {
      const response = await fetch('/api/market-insights', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: promptConfig.prompt })
      });

      if (!response.ok) throw new Error('API Error');

      const data = await response.json();
      const result = data.text || "Synthesis complete.";
      
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(cacheKey, result);
      }
      
      return result;
    } catch (error) {
      console.error("Gemini Service Error:", error);
      return "Operational efficiency remains the primary differentiator in 2026.";
    }
  }
};