// Diagram type definitions
export type DiagramType = 'usecase' | 'activity' | 'sequence' | 'class';

export interface DiagramResult {
  type: DiagramType;
  code: string;
  svg?: string;
  timestamp: number;
}

export interface DiagramSet {
  usecase: string;
  activity: string;
  sequence: string;
  class: string;
  erd?: string;
  state?: string;
  component?: string;
  deployment?: string;
  dfd?: string;
  gantt?: string;
}

export interface DiagramRenderOptions {
  theme: 'dark' | 'light';
  scale: number;
  maxWidth: number;
  backgroundColor: string;
}

export interface DiagramError {
  type: DiagramType;
  message: string;
  code?: string;
  recoverable: boolean;
}
