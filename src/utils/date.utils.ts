// Date formatting utilities
export function formatTimestamp(ts: number): string {
  return new Date(ts).toLocaleString('vi-VN', {
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit',
  });
}

export function timeAgo(ts: number): string {
  const diff = Date.now() - ts;
  const seconds = Math.floor(diff / 1000);
  if (seconds < 60) return 'vua xong';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return minutes + ' phut truoc';
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return hours + ' gio truoc';
  const days = Math.floor(hours / 24);
  return days + ' ngay truoc';
}

export function formatDuration(ms: number): string {
  if (ms < 1000) return ms + 'ms';
  return (ms / 1000).toFixed(1) + 's';
}
