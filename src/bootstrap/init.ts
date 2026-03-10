// App bootstrapper - centralized startup
export function bootstrapApp(): void {
  registerServiceWorker();
  applyStoredPreferences();
}
function registerServiceWorker(): void {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').catch(() => {});
  }
}
function applyStoredPreferences(): void {
  const theme = localStorage.getItem('uml-gen-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', theme);
}
