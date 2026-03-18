// ============================================
// Input Validation Utilities
// ============================================

import { MIN_INPUT_LENGTH, MIN_WORD_COUNT } from './constants';

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export function validateRequirement(text: string): ValidationResult {
  const trimmed = text.trim();
  
  if (!trimmed) {
    return { isValid: false, error: 'Vui lÃ²ng nháº­p mÃ´ táº£ Ä‘á» tÃ i' };
  }

  if (trimmed.length < MIN_INPUT_LENGTH) {
    return { isValid: false, error: 'MÃ´ táº£ quÃ¡ ngáº¯n! Cáº§n Ã­t nháº¥t 15 kÃ½ tá»±.' };
  }

  const wordCount = trimmed.split(/\s+/).filter(w => w.length > 1).length;
  if (wordCount < MIN_WORD_COUNT) {
    return { isValid: false, error: 'Cáº§n Ã­t nháº¥t 3 tá»« mÃ´ táº£ há»‡ thá»‘ng.' };
  }

  return { isValid: true };
}

export function validateApiKey(key: string, provider: string): ValidationResult {
  const trimmed = key.trim();
  
  if (!trimmed) {
    return { isValid: false, error: 'Vui lÃ²ng nháº­p API Key' };
  }

  if (provider === 'huggingface' && !trimmed.startsWith('hf_')) {
    return { isValid: false, error: 'API Key Hugging Face pháº£i báº¯t Ä‘áº§u báº±ng hf_' };
  }

  if (provider === 'groq' && !trimmed.startsWith('gsk_')) {
    return { isValid: false, error: 'API Key Groq pháº£i báº¯t Ä‘áº§u báº±ng gsk_' };
  }

  if (trimmed.length < 10) {
    return { isValid: false, error: 'API Key quÃ¡ ngáº¯n' };
  }

  return { isValid: true };
}

export function sanitizeInput(text: string): string {
  return text
    .replace(/<[^>]*>/g, '')
    .replace(/[<>]/g, '')
    .trim();
}
