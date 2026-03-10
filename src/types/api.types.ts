// API request/response type definitions
export interface APIRequestConfig {
  url: string;
  method: 'GET' | 'POST';
  headers: Record<string, string>;
  body?: string;
  timeout: number;
  retries: number;
}

export interface APIError {
  status: number;
  statusText: string;
  message: string;
  provider: string;
  retryable: boolean;
}

export interface RateLimitInfo {
  remaining: number;
  limit: number;
  resetAt: number;
}

export interface HealthCheckResult {
  provider: string;
  healthy: boolean;
  responseTime: number;
  timestamp: number;
}
