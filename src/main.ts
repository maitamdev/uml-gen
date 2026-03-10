// ============================================
// UML Diagram Generator - Main Application
// ============================================

import './style.css';
import { initMermaid, renderDiagram, getDiagramSvg } from './diagram-renderer';
import { checkProviderStatus, generateAllDiagrams, generateAnalysis, getApiKey, setApiKey, getProvider, setProvider, getProviderConfig, setFallbackCallback } from './ai-generator';
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
};

// ---- Initialize ----
async function init() {
  initMermaid();
  setupApiKeyUI();
  setupEventListeners();
  setupScrollAnimations();

  // Wire up auto-failover notification
  setFallbackCallback((from, to) => {
    showToast(`⚠️ ${from} hết quota, tự động chuyển sang ${to}`, 'info');
  });

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
    groqAvailable = false;
    return;
  }

  statusDot.className = 'status-dot';
  statusText.textContent = `Đang kiểm tra ${config.name}...`;

  groqAvailable = await checkProviderStatus();

  if (groqAvailable) {
    statusDot.className = 'status-dot online';
    statusText.textContent = `${config.name} sẵn sàng ⚡`;
    showToast(`✅ ${config.name} API Key hợp lệ!`, 'success');
  } else {
    statusDot.className = 'status-dot offline';
    statusText.textContent = 'API Key không hợp lệ — Nhấn ⚙️';
    showToast('❌ API Key không hợp lệ. Kiểm tra lại.', 'error');
  }
}

// ---- Scroll Animations ----
function setupScrollAnimations() {
  const featureCards = document.querySelectorAll('.feature-card');
  const featureObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -20px 0px' }
  );
  featureCards.forEach((card) => featureObserver.observe(card));

  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    },
    { threshold: 0.1 }
  );
  revealElements.forEach((el) => revealObserver.observe(el));
}

// ---- Event Listeners ----
function setupEventListeners() {
  generateBtn.addEventListener('click', handleGenerate);

  templateBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    templateMenu.classList.toggle('open');
  });

  document.addEventListener('click', () => {
    templateMenu.classList.remove('open');
  });

  templateMenu.querySelectorAll('.dropdown-item').forEach((item) => {
    item.addEventListener('click', (e) => {
      const key = (e.currentTarget as HTMLElement).dataset.template!;
      handleTemplateSelect(key);
      templateMenu.classList.remove('open');
    });
  });

  $('#diagramTabs').addEventListener('click', (e) => {
    const tab = (e.target as HTMLElement).closest('.tab') as HTMLElement;
    if (!tab) return;
    const type = tab.dataset.type as keyof DiagramSet;
    if (type) switchTab(type);
  });

  $('#copyCodeBtn').addEventListener('click', handleCopyCode);
  $('#exportSvgBtn').addEventListener('click', handleExportSvg);
  $('#exportPngBtn').addEventListener('click', handleExportPng);
  $('#copyAnalysisBtn').addEventListener('click', handleCopyAnalysis);

  // Guide toggle
  const guideToggle = document.getElementById('guideToggle');
  const guideContent = document.getElementById('guideContent');
  const guideChevron = document.getElementById('guideChevron');
  if (guideToggle && guideContent && guideChevron) {
    guideToggle.addEventListener('click', () => {
      guideContent.classList.toggle('open');
      guideChevron.classList.toggle('open');
    });
  }

  $('#zoomInBtn').addEventListener('click', () => adjustZoom(0.2));
  $('#zoomOutBtn').addEventListener('click', () => adjustZoom(-0.2));
  $('#resetZoomBtn').addEventListener('click', () => {
    zoomLevel = 1;
    diagramContainer.style.transform = `scale(1)`;
  });

  // Fullscreen toggle
  $('#fullscreenBtn').addEventListener('click', toggleFullscreen);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const panel = document.querySelector('.diagram-panel');
      if (panel?.classList.contains('fullscreen')) {
        toggleFullscreen();
      }
    }
  });

  $('#toggleCodeBtn').addEventListener('click', toggleCodePanel);

  requirementInput.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'Enter') handleGenerate();
  });
}

// ---- Template Selection ----
function handleTemplateSelect(key: string) {
  const template = getTemplate(key);
  if (!template) return;

  requirementInput.value = template.description;
  currentDiagrams = { ...template.diagrams };
  currentAnalyses = template.analyses ? { ...template.analyses } : {};

  showOutput();
  switchTab('usecase');

  // If no pre-built analyses, auto-generate analysis for current tab
  if (!currentAnalyses['usecase'] && groqAvailable) {
    generateAnalysisForTab('usecase', template.description);
  }

  showToast(`📋 Đã tải đề mẫu: ${template.name}`, 'success');
}

// ---- Generate Diagrams ----
async function handleGenerate() {
  const requirement = requirementInput.value.trim();
  if (!requirement) {
    showToast('⚠️ Vui lòng nhập mô tả đề tài', 'error');
    requirementInput.focus();
    return;
  }

  // Check template match first
  const matchedTemplate = findMatchingTemplate(requirement);
  if (matchedTemplate) {
    currentDiagrams = { ...matchedTemplate.diagrams };
    showOutput();
    switchTab('usecase');
    showToast(`✅ Đã tạo sơ đồ từ template: ${matchedTemplate.name}`, 'success');
    return;
  }

  if (!groqAvailable) {
    const apiKey = getApiKey();
    if (!apiKey) {
      showToast('⚠️ Chưa cấu hình API Key. Nhấn ⚙️ để nhập.', 'error');
    } else {
      showToast('⚠️ API Key không hợp lệ. Kiểm tra lại hoặc chọn đề mẫu.', 'error');
    }
    return;
  }

  // AI Generation
  setLoading(true);
  const providerName = getProviderConfig().name;
  showToast(`🤖 ${providerName} đang tạo sơ đồ và phân tích... ⚡`, 'info');
  showAnalysisLoading();

  try {
    // Show output immediately so user sees the loading state
    showOutput();
    switchTab('usecase');

    // Also start generating analysis for the first tab immediately
    generateAnalysisForTab('usecase', requirement);

    const results = await generateAllDiagrams(
      requirement,
      (type, status) => {
        if (status === 'done') {
          updateTabStatus(type, 'done');
        } else if (status === 'generating') {
          updateTabStatus(type, 'generating');
        }
      }
    );

    currentDiagrams = results as Partial<DiagramSet>;
    // Re-render current tab to make sure it's up to date
    switchTab(currentType);

    showToast(`✅ Đã tạo xong tất cả sơ đồ!`, 'success');
  } catch (error) {
    console.error('Generation error:', error);
    showToast(`❌ ${error instanceof Error ? error.message : 'Lỗi khi tạo sơ đồ'}`, 'error');
  } finally {
    setLoading(false);
  }
}

function findMatchingTemplate(text: string): typeof templates[string] | null {
  const lower = text.toLowerCase();
  const keywords: Record<string, string[]> = {
    library: ['thư viện', 'thu vien', 'library', 'mượn sách', 'muon sach'],
    student: ['sinh viên', 'sinh vien', 'student', 'môn học', 'mon hoc', 'điểm'],
    ecommerce: ['bán hàng', 'ban hang', 'ecommerce', 'shop', 'mua hàng', 'mua hang', 'sản phẩm', 'san pham'],
    cinema: ['phim', 'cinema', 'movie', 'vé xem', 've xem', 'rạp', 'rap'],
    hotel: ['khách sạn', 'khach san', 'hotel', 'check-in', 'checkin'],
  };

  // For longer descriptions, require at least 2 keyword matches to avoid false positives
  const minMatches = lower.length > 50 ? 2 : 1;

  for (const [key, words] of Object.entries(keywords)) {
    const matchCount = words.filter(word => lower.includes(word)).length;
    if (matchCount >= minMatches) return templates[key];
  }
  return null;
}

// ---- Tab Management ----
function switchTab(type: keyof DiagramSet) {
  currentType = type;

  document.querySelectorAll('.tab').forEach((tab) => {
    tab.classList.toggle('active', (tab as HTMLElement).dataset.type === type);
  });

  diagramTitle.textContent = diagramLabels[type] || type;

  // Update analysis title
  const analysisTypeLabels: Record<string, string> = {
    usecase: 'Phân tích Use Case',
    activity: 'Phân tích Activity Diagram',
    sequence: 'Phân tích Sequence Diagram',
    class: 'Phân tích Class Diagram',
    erd: 'Phân tích ERD',
    state: 'Phân tích State Diagram',
    component: 'Phân tích Component Diagram',
    deployment: 'Phân tích Deployment Diagram',
    dfd: 'Phân tích DFD',
    gantt: 'Phân tích Gantt Chart',
  };
  analysisTitle.textContent = analysisTypeLabels[type] || 'Phân tích';

  // Update diagram
  const code = currentDiagrams[type];
  if (code) {
    currentMermaidCode = code;
    mermaidCodeEl.textContent = code;
    zoomLevel = 1;
    diagramContainer.style.transform = 'scale(1)';
    renderDiagram(code, diagramContainer);
  } else {
    currentMermaidCode = '';
    mermaidCodeEl.textContent = '// Chưa có dữ liệu';
    diagramContainer.innerHTML = `
      <div style="padding: 3rem; text-align: center; color: var(--text-muted);">
        <div style="font-size: 3rem; margin-bottom: 1rem;">📭</div>
        <div>Chưa có sơ đồ cho loại này</div>
      </div>
    `;
  }

  // Update analysis
  const analysis = currentAnalyses[type];
  if (analysis) {
    renderAnalysis(analysis);
  } else {
    // Try to generate on-the-fly if we have requirement text and Groq is available
    const requirement = requirementInput.value.trim();
    if (requirement && groqAvailable) {
      generateAnalysisForTab(type, requirement);
    } else {
      analysisContent.innerHTML = `
        <div class="analysis-placeholder">
          <div class="placeholder-icon">📄</div>
          <div>Bài phân tích sẽ hiển thị ở đây</div>
        </div>
      `;
    }
  }
}

function updateTabStatus(type: string, status: 'generating' | 'done') {
  const tab = document.querySelector(`.tab[data-type="${type}"]`) as HTMLElement;
  if (!tab) return;
  tab.style.opacity = status === 'generating' ? '0.6' : '1';
}

// ---- UI Helpers ----
function showOutput() {
  outputSection.style.display = 'flex';
  outputSection.style.flexDirection = 'column';
  outputSection.style.gap = '1rem';

  const featuresSection = document.getElementById('featuresSection');
  if (featuresSection) featuresSection.style.display = 'none';

  setTimeout(() => {
    outputSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 100);
}

function setLoading(loading: boolean) {
  generateBtn.classList.toggle('loading', loading);
  (generateBtn as HTMLButtonElement).disabled = loading;
}

function adjustZoom(delta: number) {
  zoomLevel = Math.max(0.3, Math.min(3, zoomLevel + delta));
  diagramContainer.style.transform = `scale(${zoomLevel})`;
}

function toggleCodePanel() {
  const content = $('#codeContent');
  const icon = $('#toggleCodeIcon');
  const isHidden = content.style.display === 'none';
  content.style.display = isHidden ? 'block' : 'none';
  icon.textContent = isHidden ? '▲' : '▼';
  const label = document.querySelector('.toggle-label');
  if (label) label.textContent = isHidden ? 'Ẩn code' : 'Hiện code';
}

function toggleFullscreen() {
  const panel = document.querySelector('.diagram-panel') as HTMLElement;
  if (!panel) return;

  const isFullscreen = panel.classList.toggle('fullscreen');
  document.body.style.overflow = isFullscreen ? 'hidden' : '';

  // Switch icon
  const icon = document.getElementById('fullscreenIcon');
  if (icon) {
    icon.innerHTML = isFullscreen
      ? '<path d="M4 14h6v6m10-10h-6V4m0 16h6v-6M4 4h6v6"/>'  // collapse
      : '<path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>'; // expand
  }
}

// ---- Analysis Helper Functions ----
function renderAnalysis(markdownText: string) {
  analysisContent.innerHTML = marked.parse(markdownText) as string;
}

function showAnalysisLoading() {
  analysisContent.innerHTML = `
    <div class="analysis-loading">
      <div class="shimmer-line"></div>
      <div class="shimmer-line"></div>
      <div class="shimmer-line"></div>
      <div class="shimmer-line"></div>
      <div class="shimmer-line"></div>
      <div class="shimmer-line"></div>
      <div class="shimmer-line"></div>
      <div class="shimmer-line"></div>
      <div class="shimmer-line"></div>
      <div class="shimmer-line"></div>
    </div>
  `;
}

async function generateAnalysisForTab(type: string, requirement: string) {
  // If already cached, just render
  if (currentAnalyses[type]) {
    renderAnalysis(currentAnalyses[type]);
    return;
  }

  showAnalysisLoading();

  try {
    const result = await generateAnalysis(requirement, type);
    if (result) {
      currentAnalyses[type] = result;
      // Only render if still on same tab
      if (currentType === type) {
        renderAnalysis(result);
      }
    } else {
      if (currentType === type) {
        analysisContent.innerHTML = `
          <div class="analysis-placeholder">
            <div class="placeholder-icon">📝</div>
            <div>Không có phân tích cho loại sơ đồ này</div>
          </div>
        `;
      }
    }
  } catch (error) {
    console.error(`Error generating analysis for ${type}:`, error);
    if (currentType === type) {
      analysisContent.innerHTML = `
        <div class="analysis-placeholder">
          <div class="placeholder-icon">⚠️</div>
          <div>Lỗi khi tạo phân tích</div>
        </div>
      `;
    }
  }
}

async function handleCopyAnalysis() {
  const analysisText = currentAnalyses[currentType];
  if (!analysisText) {
    showToast('⚠️ Chưa có bài phân tích để copy', 'error');
    return;
  }
  const success = await copyToClipboard(analysisText);
  showToast(
    success ? '📋 Đã copy bài phân tích!' : '❌ Không thể copy',
    success ? 'success' : 'error'
  );
}

// ---- Export Handlers ----
async function handleCopyCode() {
  if (!currentMermaidCode) {
    showToast('⚠️ Chưa có code để copy', 'error');
    return;
  }
  const success = await copyToClipboard(currentMermaidCode);
  showToast(
    success ? '📋 Đã copy Mermaid code!' : '❌ Không thể copy',
    success ? 'success' : 'error'
  );
}

function handleExportSvg() {
  const svgString = getDiagramSvg(diagramContainer);
  if (!svgString) {
    showToast('⚠️ Chưa có sơ đồ để xuất', 'error');
    return;
  }
  exportSvg(svgString, `${currentType}-diagram`);
  showToast('📥 Đã xuất file SVG!', 'success');
}

async function handleExportPng() {
  const svgString = getDiagramSvg(diagramContainer);
  if (!svgString) {
    showToast('⚠️ Chưa có sơ đồ để xuất', 'error');
    return;
  }
  try {
    await exportPng(svgString, `${currentType}-diagram`);
    showToast('🖼️ Đã xuất file PNG!', 'success');
  } catch {
    showToast('❌ Lỗi khi xuất PNG', 'error');
  }
}

// ---- Toast Notifications ----
function showToast(message: string, type: 'success' | 'error' | 'info' = 'info') {
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = 'toast-in 0.3s ease reverse';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// ---- Start ----
init();
