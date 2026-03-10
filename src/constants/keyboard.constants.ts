// Keyboard shortcut constants
export const SHORTCUTS = {
  GENERATE: { key: 'Enter', ctrlKey: true, description: 'Generate diagrams' },
  COPY_CODE: { key: 'c', ctrlKey: true, shiftKey: true, description: 'Copy Mermaid code' },
  EXPORT_PNG: { key: 'p', ctrlKey: true, shiftKey: true, description: 'Export as PNG' },
  EXPORT_SVG: { key: 's', ctrlKey: true, shiftKey: true, description: 'Export as SVG' },
  TOGGLE_CODE: { key: '', ctrlKey: true, description: 'Toggle code panel' },
  FULLSCREEN: { key: 'f', ctrlKey: true, description: 'Toggle fullscreen' },
  ZOOM_IN: { key: '=', ctrlKey: true, description: 'Zoom in' },
  ZOOM_OUT: { key: '-', ctrlKey: true, description: 'Zoom out' },
  ZOOM_RESET: { key: '0', ctrlKey: true, description: 'Reset zoom' },
  ESCAPE: { key: 'Escape', description: 'Close modal/panel' },
} as const;

export type ShortcutKey = keyof typeof SHORTCUTS;
