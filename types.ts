
export interface ServiceItem {
  title: string;
  description: string;
  icon: string;
  tags?: string[];
}

export interface InsightPrompt {
  id: string;
  label: string;
  prompt: string;
}

export interface InsightResult {
  text: string;
  timestamp: Date;
}
