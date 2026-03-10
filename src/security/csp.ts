// Content Security Policy helpers
export function generateCSPMeta(): string {
  return [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline'",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "connect-src 'self' https://router.huggingface.co https://api.groq.com",
    "img-src 'self' data: blob:",
  ].join('; ');
}

export function injectCSPMeta(): void {
  const meta = document.createElement('meta');
  meta.httpEquiv = 'Content-Security-Policy';
  meta.content = generateCSPMeta();
  document.head.prepend(meta);
}
