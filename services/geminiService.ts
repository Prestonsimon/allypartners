
import { GoogleGenAI } from "@google/genai";
import { INSIGHT_PROMPTS } from "../constants";

export class GeminiService {
  /**
   * Fetches market insight for a specific predefined prompt ID.
   * Implements daily caching in localStorage to minimize API calls.
   * strictly enforces that only suggested prompts can be run.
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
      // Storage access can fail in some environments
    }

    // 3. Fetch from Gemini
    try {
      // The API client must be initialized with the exact syntax below
      // Assume process.env.API_KEY is pre-configured and valid
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: promptConfig.prompt,
        config: {
          systemInstruction: "You are a senior consultant at Ally Partners, a boutique firm in Jersey. Your tone is professional, human-centric, minimalist, and authoritative. Avoid corporate jargon. Provide high-impact insights for alternative asset managers and startups. Always relate back to the Jersey market. Your response must be extremely brief and fit within 500 characters.",
          temperature: 0.7,
        },
      });

      const resultText = response.text || "Strategic operational roadmaps are currently being synthesized. Please check back shortly.";
      
      try {
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(cacheKey, resultText);
        }
      } catch (e) {
        // Silently ignore storage issues
      }
      
      return resultText;
    } catch (error) {
      console.error("Gemini API Error:", error);
      // Return a professional fallback to maintain a high-quality UI experience if the API fails
      return "Operational efficiency is the primary differentiator for Jersey-based firms in 2025. Bridging the gap between legacy systems and modern automation is the core mission of successful asset management.";
    }
  }

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
