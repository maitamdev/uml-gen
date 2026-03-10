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

// ---- Initialize ----
async function init() {
  initMermaid();
  setupApiKeyUI();
  setupEventListeners();
  setupScrollAnimations();
  await checkAIStatus();
}

// ---- API Key & Provider UI ----
function setupApiKeyUI() {
  const settingsBtn = document.getElementById('settingsBtn');
  const settingsPanel = document.getElementById('settingsPanel');
  const apiKeyInput = document.getElementById('apiKeyInput') as HTMLInputElement;
  const saveKeyBtn = document.getElementById('saveKeyBtn');
  const toggleKeyBtn = document.getElementById('toggleKeyBtn');
  const providerSelect = document.getElementById('providerSelect') as HTMLSelectElement;

  if (!settingsBtn || !settingsPanel || !apiKeyInput || !saveKeyBtn) return;

  // Load saved key & provider
  const savedKey = getApiKey();
  if (savedKey) {
    apiKeyInput.value = savedKey;
  }

  // Setup provider selector
  if (providerSelect) {
    providerSelect.value = getProvider();
    updateInputPlaceholder(apiKeyInput);

    providerSelect.addEventListener('change', () => {
      setProvider(providerSelect.value as ProviderType);
      updateInputPlaceholder(apiKeyInput);
      // Update settings panel link
      const linkEl = settingsPanel.querySelector('.settings-desc a') as HTMLAnchorElement;
      const config = getProviderConfig();
      if (linkEl) {
        linkEl.href = config.keyLink;
        linkEl.textContent = config.keyLinkText;
      }
      // Update header badge
      const badgeEl = document.querySelector('.header-badge');
      if (badgeEl) {
        const textNode = Array.from(badgeEl.childNodes).find(n => n.nodeType === Node.TEXT_NODE);
        if (textNode) textNode.textContent = ` ${config.name}`;
      }
    });
  }

