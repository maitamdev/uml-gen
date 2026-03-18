export class AppError extends Error {
  constructor(message: string, public code: string, public details?: any) {
    super(message);
    this.name = 'AppError';
  }
}
export class ApiError extends AppError {
  constructor(message: string, public statusCode: number, details?: any) {
    super(message, 'API_ERROR', details);
    this.name = 'ApiError';
  }
}
export class ValidationError extends AppError {
  constructor(message: string, public field?: string) {
    super(message, 'VALIDATION_ERROR');
    this.name = 'ValidationError';
  }
}
export class RenderError extends AppError {
  constructor(message: string, public diagramCode?: string) {
    super(message, 'RENDER_ERROR');
    this.name = 'RenderError';
  }
}
export function handleError(error: unknown): string {
  if (error instanceof AppError) return error.message;
  if (error instanceof Error) return error.message;
  return 'ÄÃ£ xáº£y ra lá»—i khÃ´ng xÃ¡c Ä‘á»‹nh';
}
