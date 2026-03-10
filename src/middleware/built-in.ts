// Built-in middleware: logging, retry, timeout
import type { Middleware, RequestContext } from './pipeline';

export const loggingMiddleware: Middleware = async (ctx: RequestContext, next) => {
  console.debug('[API]', ctx.method, ctx.url);
  await next();
  const duration = performance.now() - ctx.startTime;
  console.debug('[API] Response:', duration.toFixed(0) + 'ms');
};

export const retryMiddleware = (maxRetries: number): Middleware => {
  return async (ctx: RequestContext, next) => {
    let lastError: Error | null = null;
    for (let i = 0; i <= maxRetries; i++) {
      try {
        await next();
        return;
      } catch (err) {
        lastError = err instanceof Error ? err : new Error(String(err));
        if (i < maxRetries) await new Promise(r => setTimeout(r, 1000 * (i + 1)));
      }
    }
    throw lastError;
  };
};

export const timeoutMiddleware = (ms: number): Middleware => {
  return async (ctx: RequestContext, next) => {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), ms);
    ctx.metadata.signal = controller.signal;
    try { await next(); } finally { clearTimeout(timer); }
  };
};
