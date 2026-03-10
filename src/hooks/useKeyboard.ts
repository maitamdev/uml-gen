// Keyboard Shortcut Manager Hook
interface ShortcutHandler {
  key: string;
  ctrlKey?: boolean;
  shiftKey?: boolean;
  altKey?: boolean;
  handler: (e: KeyboardEvent) => void;
  description: string;
}

export function useKeyboard() {
  const shortcuts: ShortcutHandler[] = [];

  function register(shortcut: ShortcutHandler): void {
    shortcuts.push(shortcut);
  }

  function start(): void {
    document.addEventListener('keydown', handleKeyDown);
  }

  function stop(): void {
    document.removeEventListener('keydown', handleKeyDown);
  }

  function handleKeyDown(e: KeyboardEvent): void {
    for (const s of shortcuts) {
      if (e.key === s.key &&
          !!e.ctrlKey === !!s.ctrlKey &&
          !!e.shiftKey === !!s.shiftKey &&
          !!e.altKey === !!s.altKey) {
        e.preventDefault();
        s.handler(e);
        break;
      }
    }
  }

  function getRegistered(): ShortcutHandler[] {
    return [...shortcuts];
  }

  return { register, start, stop, getRegistered };
}
