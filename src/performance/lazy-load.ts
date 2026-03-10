// Lazy loading utilities
export function lazyLoad<T>(factory: () => Promise<T>): () => Promise<T> {
  let cached: T | null = null;
  let loading: Promise<T> | null = null;

  return async () => {
    if (cached) return cached;
    if (loading) return loading;
    loading = factory().then(result => {
      cached = result;
      loading = null;
      return result;
    });
    return loading;
  };
}

export function preloadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}
