// ============================================
// Type Definitions for UML Generator
// ============================================

export type DiagramType = 'usecase' | 'activity' | 'sequence' | 'class' | 'erd' | 'state';

export interface DiagramConfig {
  type: DiagramType;
  label: string;
  icon: string;
  description: string;
}

export interface GenerationResult {
  type: DiagramType;
  code: string;
  timestamp: number;
  provider: string;
}

export interface GenerationError {
  type: DiagramType;
  message: string;
  code: number;
}

export interface AppState {
  currentType: DiagramType;
  zoomLevel: number;
  isGenerating: boolean;
  isFullscreen: boolean;
}

export interface ToastOptions {
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
}

export interface ExportOptions {
  format: 'svg' | 'png' | 'pdf';
  scale?: number;
  background?: string;
  filename?: string;
}

export interface ZoomConfig {
  min: number;
  max: number;
  step: number;
  default: number;
}
