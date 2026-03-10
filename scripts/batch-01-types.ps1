$ErrorActionPreference = "Stop"
Set-Location "c:\Users\Asus\.gemini\antigravity\scratch\uml-generator"

# ---- Commit 1: diagram.types.ts ----
New-Item -ItemType Directory -Force -Path "src/types" | Out-Null
@"
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
"@ | Set-Content -Path "src/types/diagram.types.ts" -Encoding UTF8
git add -A; git commit -m "feat(types): add diagram type definitions and interfaces"

# ---- Commit 2: provider.types.ts ----
@"
// AI Provider type definitions
export type ProviderType = 'huggingface' | 'groq';

export interface ProviderConfig {
  name: string;
  apiUrl: string;
  model: string;
  modelsUrl: string;
  keyPlaceholder: string;
  keyLink: string;
  keyLinkText: string;
}

export interface ProviderStatus {
  provider: ProviderType;
  available: boolean;
  latency?: number;
  lastChecked: number;
}

export interface AIRequest {
  systemPrompt: string;
  userPrompt: string;
  provider: ProviderType;
  temperature?: number;
  maxTokens?: number;
}

export interface AIResponse {
  content: string;
  provider: ProviderType;
  tokensUsed?: number;
  duration: number;
}
"@ | Set-Content -Path "src/types/provider.types.ts" -Encoding UTF8
git add -A; git commit -m "feat(types): add AI provider type definitions"

# ---- Commit 3: template.types.ts ----
@"
// Template type definitions
export interface Template {
  name: string;
  description: string;
  category: TemplateCategory;
  icon: string;
  diagrams: Record<string, string>;
  analyses?: Record<string, string>;
}

export type TemplateCategory = 'education' | 'business' | 'healthcare' | 'entertainment';

export interface TemplateListItem {
  key: string;
  name: string;
  description: string;
  icon: string;
  category: TemplateCategory;
}

export interface TemplateFilter {
  category?: TemplateCategory;
  searchQuery?: string;
}
"@ | Set-Content -Path "src/types/template.types.ts" -Encoding UTF8
git add -A; git commit -m "feat(types): add template type definitions"

# ---- Commit 4: export.types.ts ----
@"
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
"@ | Set-Content -Path "src/types/export.types.ts" -Encoding UTF8
git add -A; git commit -m "feat(types): add export format type definitions"

# ---- Commit 5: ui.types.ts ----
@"
// UI Component type definitions
export interface TabItem {
  type: string;
  label: string;
  icon: string;
  active: boolean;
}

export interface DropdownOption {
  value: string;
  label: string;
  icon?: string;
  description?: string;
  disabled?: boolean;
}

export interface ModalConfig {
  title: string;
  content: string;
  confirmText?: string;
  cancelText?: string;
  type: 'info' | 'warning' | 'error' | 'success';
}

export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

export interface ScrollPosition {
  x: number;
  y: number;
  direction: 'up' | 'down';
}
"@ | Set-Content -Path "src/types/ui.types.ts" -Encoding UTF8
git add -A; git commit -m "feat(types): add UI component type definitions"

# ---- Commit 6: toast.types.ts ----
@"
// Toast notification type definitions
export type ToastType = 'success' | 'error' | 'info' | 'warning';
export type ToastPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';

export interface ToastConfig {
  message: string;
  type: ToastType;
  duration?: number;
  position?: ToastPosition;
  dismissible?: boolean;
  icon?: string;
  action?: ToastAction;
}

export interface ToastAction {
  label: string;
  onClick: () => void;
}

export interface ToastState {
  id: string;
  config: ToastConfig;
  visible: boolean;
  progress: number;
  createdAt: number;
}
"@ | Set-Content -Path "src/types/toast.types.ts" -Encoding UTF8
git add -A; git commit -m "feat(types): add toast notification type definitions"

# ---- Commit 7: zoom.types.ts ----
@"
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
"@ | Set-Content -Path "src/types/zoom.types.ts" -Encoding UTF8
git add -A; git commit -m "feat(types): add zoom control type definitions"

# ---- Commit 8: api.types.ts ----
@"
// API request/response type definitions
export interface APIRequestConfig {
  url: string;
  method: 'GET' | 'POST';
  headers: Record<string, string>;
  body?: string;
  timeout: number;
  retries: number;
}

export interface APIError {
  status: number;
  statusText: string;
  message: string;
  provider: string;
  retryable: boolean;
}

export interface RateLimitInfo {
  remaining: number;
  limit: number;
  resetAt: number;
}

export interface HealthCheckResult {
  provider: string;
  healthy: boolean;
  responseTime: number;
  timestamp: number;
}
"@ | Set-Content -Path "src/types/api.types.ts" -Encoding UTF8
git add -A; git commit -m "feat(types): add API request/response type definitions"

# ---- Commit 9: analysis.types.ts ----
@"
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
"@ | Set-Content -Path "src/types/analysis.types.ts" -Encoding UTF8
git add -A; git commit -m "feat(types): add analysis data type definitions"

# ---- Commit 10: types/index.ts ----
@"
// Barrel exports for all type definitions
export type { DiagramType, DiagramResult, DiagramSet, DiagramRenderOptions, DiagramError } from './diagram.types';
export type { ProviderType, ProviderConfig, ProviderStatus, AIRequest, AIResponse } from './provider.types';
export type { Template, TemplateCategory, TemplateListItem, TemplateFilter } from './template.types';
export type { ExportFormat, ExportOptions, ExportResult, ClipboardResult } from './export.types';
export type { TabItem, DropdownOption, ModalConfig, LoadingState, ScrollPosition } from './ui.types';
export type { ToastType, ToastPosition, ToastConfig, ToastAction, ToastState } from './toast.types';
export type { ZoomConfig, ZoomState, ZoomEvent } from './zoom.types';
export type { APIRequestConfig, APIError, RateLimitInfo, HealthCheckResult } from './api.types';
export type { AnalysisResult, AnalysisSection, AnalysisMetadata, AnalysisStatus } from './analysis.types';
"@ | Set-Content -Path "src/types/index.ts" -Encoding UTF8
git add -A; git commit -m "feat(types): add barrel exports for all type modules"

Write-Host "Batch 1 done: 10 commits (Types)" -ForegroundColor Green
