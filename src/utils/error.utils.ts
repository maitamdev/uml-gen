// Error handling utilities
export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  if (typeof error === 'string') return error;
  return 'An unknown error occurred';
}

export function isNetworkError(error: unknown): boolean {
  if (error instanceof TypeError && error.message.includes('fetch')) return true;
  if (error instanceof Error && error.message.includes('network')) return true;
  return false;
}

export function isRateLimitError(status: number): boolean {
  return status === 429 || status === 402;
}

export function createAppError(message: string, code: string, recoverable = true) {
  return { message, code, recoverable, timestamp: Date.now() };
}

export function formatApiError(status: number, provider: string): string {
  if (status === 401) return 'API Key invalid for ' + provider;
  if (status === 429) return 'Rate limit exceeded for ' + provider;
  if (status === 402) return 'Free quota exhausted for ' + provider;
  if (status >= 500) return 'Server error from ' + provider;
  return 'Unknown error (' + status + ')';
}
