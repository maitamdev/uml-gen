export function isOnline(): boolean { return navigator.onLine; }
export function onConnectionChange(callback: (online: boolean) => void): () => void {
  const onlineHandler = () => callback(true);
  const offlineHandler = () => callback(false);
  window.addEventListener('online', onlineHandler);
  window.addEventListener('offline', offlineHandler);
  return () => {
    window.removeEventListener('online', onlineHandler);
    window.removeEventListener('offline', offlineHandler);
  };
}
export function requireConnection(): boolean {
  if (!isOnline()) { console.warn('No internet connection'); return false; }
  return true;
}
