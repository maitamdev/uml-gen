// ============================================
// UML Diagram Generator - Main Application
// ============================================

import './style.css';
import { initMermaid, renderDiagram, getDiagramSvg } from './diagram-renderer';
import { checkProviderStatus, generateAllDiagrams, generateAnalysis, getApiKey, setApiKey, getProvider, setProvider, getProviderConfig } from './ai-generator';
import type { ProviderType } from './ai-generator';
import { templates, getTemplate } from './templates';
import { exportSvg, exportPng, copyToClipboard } from './export';
import { marked } from 'marked';
import type { DiagramSet } from './templates';

// ---- State ----
let currentDiagrams: Partial<DiagramSet> = {};
let currentAnalyses: Record<string, string> = {};
let currentType: keyof DiagramSet = 'usecase';
let currentMermaidCode: string = '';
let zoomLevel: number = 1;
let groqAvailable: boolean = false;

// ---- DOM Elements ----
const $ = (sel: string) => document.querySelector(sel) as HTMLElement;
const requirementInput = $('#requirementInput') as HTMLTextAreaElement;
const generateBtn = $('#generateBtn');
const templateBtn = $('#templateBtn');
const templateMenu = $('#templateMenu');
const outputSection = $('#outputSection');
const diagramContainer = $('#diagramContainer');
const diagramTitle = $('#diagramTitle');
const mermaidCodeEl = $('#mermaidCode');
const aiStatus = $('#aiStatus');
const toastContainer = $('#toastContainer');
const analysisContent = $('#analysisContent');
const analysisTitle = $('#analysisTitle');

// ---- Diagram Type Labels ----
const diagramLabels: Record<string, string> = {
  usecase: 'Use Case Diagram',
  activity: 'Activity Diagram',
  sequence: 'Sequence Diagram',
  class: 'Class Diagram',
  erd: 'Entity Relationship Diagram',
  state: 'State Diagram',
  component: 'Component Diagram',
  deployment: 'Deployment Diagram',
  dfd: 'Data Flow Diagram (DFD)',
  gantt: 'Gantt Chart',
};

