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

  // Toggle settings panel
  settingsBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    settingsPanel.classList.toggle('open');
  });

  document.addEventListener('click', (e) => {
    if (!settingsPanel.contains(e.target as Node) && !settingsBtn.contains(e.target as Node)) {
      settingsPanel.classList.remove('open');
    }
  });

  // Save key
  saveKeyBtn.addEventListener('click', async () => {
    const key = apiKeyInput.value.trim();
    if (!key) {
      showToast('⚠️ Vui lòng nhập API Key', 'error');
      return;
    }
    setApiKey(key);
    showToast('🔑 Đang kiểm tra API Key...', 'info');
    await checkAIStatus();
    settingsPanel.classList.remove('open');
  });

  // Toggle visibility
  if (toggleKeyBtn) {
    toggleKeyBtn.addEventListener('click', () => {
      const isPassword = apiKeyInput.type === 'password';
      apiKeyInput.type = isPassword ? 'text' : 'password';
      toggleKeyBtn.textContent = isPassword ? '🙈' : '👁️';
    });
  }

  // Enter key
  apiKeyInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') saveKeyBtn.click();
  });
}

function updateInputPlaceholder(input: HTMLInputElement) {
  const config = getProviderConfig();
  input.placeholder = config.keyPlaceholder;
}

// ---- AI Status Check ----
async function checkAIStatus() {
  const statusDot = aiStatus.querySelector('.status-dot') as HTMLElement;
  const statusText = aiStatus.querySelector('.status-text') as HTMLElement;
  const config = getProviderConfig();

  const apiKey = getApiKey();
  if (!apiKey) {
    statusDot.className = 'status-dot offline';
    statusText.textContent = 'Chưa cấu hình API Key — Nhấn ⚙️';
