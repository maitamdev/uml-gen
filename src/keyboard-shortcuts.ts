// ============================================
// Keyboard Shortcuts Manager
// ============================================

interface ShortcutHandler {
  key: string;
  ctrl?: boolean;
  shift?: boolean;
  alt?: boolean;
  handler: (e: KeyboardEvent) => void;
  description: string;
}

const shortcuts: ShortcutHandler[] = [];

export function registerShortcut(config: ShortcutHandler): void {
  shortcuts.push(config);
}

export function unregisterShortcut(key: string): void {
  const idx = shortcuts.findIndex(s => s.key === key);
  if (idx >= 0) shortcuts.splice(idx, 1);
}

export function initKeyboardShortcuts(): void {
  document.addEventListener('keydown', (e: KeyboardEvent) => {
    for (const shortcut of shortcuts) {
      const ctrlMatch = shortcut.ctrl ? (e.ctrlKey || e.metaKey) : !e.ctrlKey;
      const shiftMatch = shortcut.shift ? e.shiftKey : !e.shiftKey;
      const altMatch = shortcut.alt ? e.altKey : !e.altKey;
      
      if (e.key === shortcut.key && ctrlMatch && shiftMatch && altMatch) {
        e.preventDefault();
        shortcut.handler(e);
        return;
      }
    }
  });
}

export function getShortcutsList(): { key: string; description: string }[] {
  return shortcuts.map(s => ({
    key: [
      s.ctrl ? 'Ctrl' : '',
      s.shift ? 'Shift' : '',
      s.alt ? 'Alt' : '',
      s.key.toUpperCase(),
    ].filter(Boolean).join('+'),
    description: s.description,
  }));
}
