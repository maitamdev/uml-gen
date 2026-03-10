// Zoom control type definitions
export interface ZoomConfig {
  min: number;
  max: number;
  step: number;
  defaultLevel: number;
}

export interface ZoomState {
  level: number;
  isFullscreen: boolean;
  isPanning: boolean;
  panOffset: { x: number; y: number };
}

export interface ZoomEvent {
  type: 'zoom-in' | 'zoom-out' | 'reset' | 'fit';
  previousLevel: number;
  newLevel: number;
  source: 'button' | 'slider' | 'keyboard' | 'pinch';
}
