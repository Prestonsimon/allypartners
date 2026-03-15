import { INSIGHT_PROMPTS } from "../constants";

export class GeminiService {
  /**
   * Fetches market insight via Cloudflare Function (Backend).
   * Implements daily caching in localStorage to minimize API calls.
   */
  async getMarketInsight(id: string): Promise<string> {
    // 1. Validate ID against predefined prompts
    const promptConfig = INSIGHT_PROMPTS.find(p => p.id === id);
    if (!promptConfig) {
      console.error(`Unauthorized prompt ID: ${id}`);
      return "Invalid request. Please select a valid insight category.";
    }

    // 2. Check Daily Cache
    const today = new Date().toISOString().split('T')[0];
    const cacheKey = `ally_insight_${id}_${today}`;
    
    try {
      if (typeof localStorage !== 'undefined') {
        const cachedResponse = localStorage.getItem(cacheKey);
        if (cachedResponse) {
          return cachedResponse;
        }
        this.clearOldCaches(today);
      }
    } catch (e) {
      // Storage access can fail
    }

    // 3. Fetch from Backend (Cloudflare Function)
    try {
      const response = await fetch('/api/market-insights', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: promptConfig.prompt })
      });

      if (!response.ok) throw new Error('API request failed');

      const data = await response.json();
      const resultText = data.text || "Strategic operational roadmaps are currently being synthesized.";
      
      // Save to cache
      try {
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(cacheKey, resultText);
        }
      } catch (e) {}
      
      return resultText;
    } catch (error) {
      console.error("Fetch Error:", error);
      return "Operational efficiency is the primary differentiator for firms in 2026. Bridging the gap between legacy systems and modern automation is the core mission.";
    }
  } // <--- Added this missing closing brace

  private clearOldCaches(currentDate: string) {
    if (typeof localStorage === 'undefined') return;
    try {
      const keysToRemove: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key?.startsWith('ally_insight_') && !key.endsWith(currentDate)) {
          keysToRemove.push(key);
        }
      }
      keysToRemove.forEach(k => {
        try {
          localStorage.removeItem(k);
        } catch(e) {}
      });
    } catch (e) {}
  }
}

export const geminiService = new GeminiService();