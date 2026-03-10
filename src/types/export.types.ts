// Export type definitions
export type ExportFormat = 'svg' | 'png' | 'pdf' | 'mermaid';

export interface ExportOptions {
  format: ExportFormat;
  filename: string;
  scale: number;
  backgroundColor: string;
  includeWatermark: boolean;
}

export interface ExportResult {
  success: boolean;
  format: ExportFormat;
  fileSize?: number;
  error?: string;
}

export interface ClipboardResult {
  success: boolean;
  content: string;
  timestamp: number;
}
