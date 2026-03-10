// ============================================
// Mermaid Diagram Renderer
// ============================================

import mermaid from 'mermaid';

let renderCounter = 0;

export function initMermaid(): void {
  mermaid.initialize({
    startOnLoad: false,
    theme: 'dark',
    themeVariables: {
      darkMode: true,
      background: '#0a0a1a',
      primaryColor: '#6366f1',
      primaryTextColor: '#e8e8f0',
      primaryBorderColor: '#8b5cf6',
      secondaryColor: '#1a1a3a',
      secondaryTextColor: '#a0a0c0',
      tertiaryColor: '#12122a',
      lineColor: '#6366f1',
      textColor: '#e8e8f0',
      mainBkg: '#1a1a3a',
      nodeBorder: '#6366f1',
      clusterBkg: 'rgba(99, 102, 241, 0.08)',
      clusterBorder: 'rgba(99, 102, 241, 0.3)',
      titleColor: '#e8e8f0',
      actorBorder: '#8b5cf6',
      actorBkg: '#1a1a3a',
      actorTextColor: '#e8e8f0',
      actorLineColor: '#6366f1',
      signalColor: '#e8e8f0',
      signalTextColor: '#e8e8f0',
      labelBoxBkgColor: '#1a1a3a',
      labelBoxBorderColor: '#6366f1',
      labelTextColor: '#e8e8f0',
      loopTextColor: '#a0a0c0',
      noteBorderColor: '#8b5cf6',
      noteBkgColor: '#1a1a3a',
      noteTextColor: '#e8e8f0',
      activationBorderColor: '#8b5cf6',
      activationBkgColor: '#12122a',
      sequenceNumberColor: '#e8e8f0',
      classText: '#e8e8f0',
      relationColor: '#6366f1',
      relationLabelBackground: '#12122a',
      relationLabelColor: '#a0a0c0',
      edgeLabelBackground: '#12122a',
      fillType0: '#6366f1',
      fillType1: '#8b5cf6',
      fillType2: '#a78bfa',
    },
    flowchart: {
      curve: 'basis',
      padding: 20,
      htmlLabels: true,
      useMaxWidth: true,
    },
    sequence: {
      diagramMarginX: 30,
      diagramMarginY: 20,
      actorMargin: 80,
      width: 200,
      height: 45,
      boxMargin: 10,
      boxTextMargin: 5,
      noteMargin: 15,
      messageMargin: 40,
      mirrorActors: true,
      useMaxWidth: true,
    },
    er: {
      useMaxWidth: true,
    },
  });
}

export async function renderDiagram(
  code: string,
  container: HTMLElement
): Promise<boolean> {
  try {
    container.innerHTML = '';
    renderCounter++;
    const id = `mermaid-diagram-${renderCounter}`;
    
    const { svg } = await mermaid.render(id, code);
    container.innerHTML = svg;
    
    // Style the SVG for better display
    const svgElement = container.querySelector('svg');
    if (svgElement) {
      svgElement.style.maxWidth = '100%';
      svgElement.style.height = 'auto';
      svgElement.style.minHeight = '200px';
    }
    
    return true;
  } catch (error) {
    console.error('Mermaid render error:', error);
    container.innerHTML = `
      <div style="
        padding: 2rem;
        text-align: center;
        color: #ef4444;
        background: rgba(239, 68, 68, 0.1);
        border: 1px solid rgba(239, 68, 68, 0.2);
        border-radius: 12px;
        max-width: 500px;
        margin: auto;
      ">
        <div style="font-size: 2rem; margin-bottom: 0.5rem;">⚠️</div>
        <div style="font-weight: 600; margin-bottom: 0.5rem;">Lỗi render sơ đồ</div>
        <div style="font-size: 0.85rem; color: #a0a0c0;">
          ${error instanceof Error ? error.message : 'Unknown error'}
        </div>
        <div style="margin-top: 1rem; font-size: 0.8rem; color: #6a6a8a;">
          Thử lại hoặc kiểm tra cú pháp Mermaid code
        </div>
      </div>
    `;
    return false;
  }
}

export function getDiagramSvg(container: HTMLElement): string | null {
  const svg = container.querySelector('svg');
  if (!svg) return null;
  return new XMLSerializer().serializeToString(svg);
}
