
import { ServiceItem, InsightPrompt } from './types';

export const SERVICES: ServiceItem[] = [
  {
    title: 'Operating Model Design',
    description: 'Bespoke architectural roadmaps that align your technology stack with complex investment strategies and growth targets.',
    icon: 'fa-layer-group',
    tags: ['Scale', 'Strategy']
  },
  {
    title: 'Systemic Implementation',
    description: 'Precision deployment of industry-standard platforms (Investran, eFront) and bespoke CRM integrations for the modern back-office.',
    icon: 'fa-microchip',
    tags: ['Investran', 'eFront', 'Tech-Stack']
  },
  {
    title: 'Process Optimization',
    description: 'Transforming manual friction into automated flow. We evolve legacy operations into high-performance digital engines.',
    icon: 'fa-wand-magic-sparkles',
    tags: ['Automation', 'ROI']
  },
  {
    title: 'Pro bono & Advisory',
    description: 'Guiding and supporting startups with through the initial phases between seed-funding and operational maturity.',
    icon: 'fa-gem',
    tags: ['Startups', 'Advisory']
  }
];

export const INSIGHT_PROMPTS: InsightPrompt[] = [
  {
    id: 'executive-brief',
    label: '2026 Executive Outlook',
    prompt: 'Provide a strategic quote on the future of alternative asset management in Jersey for 2026. Focus on the shift to AI-enabled workflows. Keep it under 500 characters.'
  },
  {
    id: 'ai-efficiency',
    label: 'The AI Alpha',
    prompt: 'Describe the "AI Alpha" for boutique firms in 2026. How do small teams use automation to compete? Limit to 500 characters.'
  },
  {
    id: 'jersey-edge',
    label: 'The Jersey Edge',
    prompt: 'Explain why Jersey is the ideal hub for the next wave of fintech. Provide a sharp market insight under 500 characters.'
  }
];
