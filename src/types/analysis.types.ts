// Analysis data type definitions
export interface AnalysisResult {
  type: string;
  content: string;
  wordCount: number;
  generatedAt: number;
}

export interface AnalysisSection {
  title: string;
  content: string;
  order: number;
}

export interface AnalysisMetadata {
  requirement: string;
  diagramType: string;
  provider: string;
  duration: number;
  tokenCount?: number;
}

export type AnalysisStatus = 'pending' | 'generating' | 'complete' | 'error';
