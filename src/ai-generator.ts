// ============================================
// AI Diagram Generator - Multi-Provider (Groq / Hugging Face)
// ============================================

// ---- Provider Configuration ----
export type ProviderType = 'groq' | 'huggingface';

interface ProviderConfig {
  name: string;
  apiUrl: string;
  model: string;
  modelsUrl: string;
  keyPlaceholder: string;
  keyLink: string;
  keyLinkText: string;
}

const PROVIDERS: Record<ProviderType, ProviderConfig> = {
  groq: {
    name: 'Groq',
    apiUrl: 'https://api.groq.com/openai/v1/chat/completions',
    model: 'llama-3.3-70b-versatile',
    modelsUrl: 'https://api.groq.com/openai/v1/models',
    keyPlaceholder: 'gsk_xxxxxxxxxxxx',
    keyLink: 'https://console.groq.com/keys',
    keyLinkText: 'console.groq.com',
  },
  huggingface: {
    name: 'Hugging Face',
    apiUrl: 'https://router.huggingface.co/v1/chat/completions',
    model: 'Qwen/Qwen2.5-72B-Instruct',
    modelsUrl: 'https://router.huggingface.co/v1/models',
    keyPlaceholder: 'hf_xxxxxxxxxxxx',
    keyLink: 'https://huggingface.co/settings/tokens',
    keyLinkText: 'huggingface.co/settings/tokens',
  },
};

// ---- API Key & Provider Management ----
const STORAGE_KEY = 'uml-gen-api-key';
const PROVIDER_STORAGE_KEY = 'uml-gen-provider';

export function getApiKey(): string {
  return localStorage.getItem(STORAGE_KEY) || '';
}
