export const SHORTCUT_HELP = [
  { keys: ['Ctrl', 'Enter'], action: 'Generate diagrams' },
  { keys: ['Ctrl', 'Shift', 'C'], action: 'Copy code' },
  { keys: ['Ctrl', 'Shift', 'P'], action: 'Export PNG' },
  { keys: ['Ctrl', 'Shift', 'S'], action: 'Export SVG' },
  { keys: ['Esc'], action: 'Close / Exit fullscreen' },
];
export const formatShortcut = (keys: string[]) => keys.join(' + ');
