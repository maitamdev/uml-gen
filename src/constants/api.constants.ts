// API endpoint and configuration constants
export const HF_API_URL = 'https://router.huggingface.co/novita/v3/openai/chat/completions';
export const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

export const HF_MODELS_URL = 'https://router.huggingface.co/novita/v3/openai/models';
export const GROQ_MODELS_URL = 'https://api.groq.com/openai/v1/models';

export const HTTP_STATUS = {
  OK: 200,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  PAYMENT_REQUIRED: 402,
  TOO_MANY_REQUESTS: 429,
  SERVER_ERROR: 500,
} as const;

export const AI_TEMPERATURE = 0.3;
export const AI_MAX_TOKENS = 2048;
