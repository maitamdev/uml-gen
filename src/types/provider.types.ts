// AI Provider type definitions
export type ProviderType = 'huggingface' | 'groq';

export interface ProviderConfig {
  name: string;
  apiUrl: string;
  model: string;
  modelsUrl: string;
  keyPlaceholder: string;
  keyLink: string;
  keyLinkText: string;
}

export interface ProviderStatus {
  provider: ProviderType;
  available: boolean;
  latency?: number;
  lastChecked: number;
}

export interface AIRequest {
  systemPrompt: string;
  userPrompt: string;
  provider: ProviderType;
  temperature?: number;
  maxTokens?: number;
}

export interface AIResponse {
  content: string;
  provider: ProviderType;
  tokensUsed?: number;
  duration: number;
}
