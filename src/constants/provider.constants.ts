// Provider configuration constants
export const DEFAULT_PROVIDER = 'huggingface' as const;
export const PROVIDER_STORAGE_KEY = 'uml-gen-provider';
export const API_KEY_PREFIX = 'uml-gen-key-';

export const PROVIDER_NAMES: Record<string, string> = {
  huggingface: 'Hugging Face',
  groq: 'Groq',
};

export const PROVIDER_MODELS: Record<string, string> = {
  huggingface: 'Qwen/Qwen2.5-Coder-32B-Instruct',
  groq: 'llama-3.3-70b-versatile',
};

export const API_TIMEOUT_MS = 30000;
export const MAX_RETRIES = 2;
export const RETRY_DELAY_MS = 1000;
