// API Key security utilities
export function maskApiKey(key: string): string {
  if (key.length <= 8) return '****';
  return key.slice(0, 4) + '****' + key.slice(-4);
}

export function isKeyExposed(key: string, text: string): boolean {
  return text.includes(key);
}

export function validateKeyFormat(key: string, provider: string): { valid: boolean; error?: string } {
  if (!key || key.trim().length === 0) {
    return { valid: false, error: 'API key is required' };
  }
  if (provider === 'huggingface' && !key.startsWith('hf_')) {
    return { valid: false, error: 'Hugging Face key must start with hf_' };
  }
  if (provider === 'groq' && !key.startsWith('gsk_')) {
    return { valid: false, error: 'Groq key must start with gsk_' };
  }
  if (key.length < 10) {
    return { valid: false, error: 'API key is too short' };
  }
  return { valid: true };
}
