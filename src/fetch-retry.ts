export async function fetchWithRetry(url: string, options: RequestInit, maxRetries: number = 3): Promise<Response> {
  let lastError: Error | null = null;
  for (let i = 0; i <= maxRetries; i++) {
    try {
      const res = await fetch(url, options);
      if (res.ok || res.status < 500) return res;
      lastError = new Error('HTTP ' + res.status);
    } catch (e) { lastError = e as Error; }
    if (i < maxRetries) await new Promise(r => setTimeout(r, 1000 * Math.pow(2, i)));
  }
  throw lastError || new Error('Fetch failed after retries');
}
