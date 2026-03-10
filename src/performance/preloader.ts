// Resource preloader - preconnect and prefetch
export function addPreconnect(url: string): void {
  if (document.querySelector('link[href="' + url + '"]')) return;
  const link = document.createElement('link');
  link.rel = 'preconnect';
  link.href = url;
  document.head.appendChild(link);
}

export function addPrefetch(url: string): void {
  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.href = url;
  document.head.appendChild(link);
}

export function preconnectAPIs(): void {
  addPreconnect('https://router.huggingface.co');
  addPreconnect('https://api.groq.com');
  addPreconnect('https://fonts.googleapis.com');
  addPreconnect('https://fonts.gstatic.com');
}
