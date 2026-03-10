// LocalStorage Hook - reactive storage wrapper
export function useLocalStorage<T>(key: string, defaultValue: T) {
  const storageKey = 'uml-gen-' + key;

  function get(): T {
    try {
      const item = localStorage.getItem(storageKey);
      return item ? JSON.parse(item) : defaultValue;
    } catch {
      return defaultValue;
    }
  }

  function set(value: T): void {
    localStorage.setItem(storageKey, JSON.stringify(value));
  }

  function remove(): void {
    localStorage.removeItem(storageKey);
  }

  return { get, set, remove };
}
