// ============================================
// Mermaid Diagram Renderer
// ============================================

import mermaid from 'mermaid';

let renderCounter = 0;

export function initMermaid(): void {
  mermaid.initialize({
    startOnLoad: false,
    theme: 'base',
    themeVariables: {
      darkMode: false,
      background: '#ffffff',
      primaryColor: '#4ecdc4',
      primaryTextColor: '#2d3436',
      primaryBorderColor: '#3dbdb4',
      secondaryColor: '#ff6b6b',
      secondaryTextColor: '#2d3436',
      tertiaryColor: '#a29bfe',
      lineColor: '#636e72',
      textColor: '#2d3436',
      mainBkg: '#dfe6e9',
      nodeBorder: '#b2bec3',
      clusterBkg: '#f8f9fa',
      clusterBorder: '#b2bec3',
      titleColor: '#2d3436',
      actorBorder: '#6c5ce7',
      actorBkg: '#a29bfe',
      actorTextColor: '#ffffff',
      actorLineColor: '#636e72',
      signalColor: '#2d3436',
      signalTextColor: '#2d3436',
      labelBoxBkgColor: '#ffffff',
      labelBoxBorderColor: '#b2bec3',
      labelTextColor: '#2d3436',
      loopTextColor: '#636e72',
      noteBorderColor: '#fdcb6e',
      noteBkgColor: '#ffeaa7',
      noteTextColor: '#2d3436',
      activationBorderColor: '#6c5ce7',
      activationBkgColor: '#e8e5fc',
      sequenceNumberColor: '#ffffff',
      classText: '#2d3436',
      relationColor: '#636e72',
      relationLabelBackground: '#ffffff',
      relationLabelColor: '#636e72',
      edgeLabelBackground: '#ffffff',
      fillType0: '#4ecdc4',
      fillType1: '#ff6b6b',
      fillType2: '#a29bfe',
    },
    flowchart: {
      curve: 'basis',
      padding: 30,
      htmlLabels: true,
      useMaxWidth: true,
      nodeSpacing: 50,
      rankSpacing: 60,
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
  renderCounter++;
  const id = `mermaid-diagram-${renderCounter}`;
  
  try {
    container.innerHTML = '';
    
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
    
    // Clean up any error elements Mermaid may have injected into body
    document.querySelectorAll('body > div').forEach(el => {
      if (el.id === 'app') return;
      if (el.textContent?.includes('Syntax error') || el.querySelector('svg[aria-roledescription="error"]')) {
        el.remove();
      }
    });
    // Remove any stale mermaid error SVGs from body  
    document.querySelectorAll('body > svg[aria-roledescription="error"]').forEach(el => el.remove());
    document.querySelectorAll(`body > #d${id}`).forEach(el => el.remove());
    
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
        <div style="font-weight: 600; margin-bottom: 0.5rem;">Lỗi cú pháp Mermaid</div>
        <div style="font-size: 0.85rem; color: #a0a0c0;">
          ${error instanceof Error ? error.message.replace(/</g, '&lt;').replace(/>/g, '&gt;') : 'Unknown error'}
        </div>
        <div style="margin-top: 1rem; font-size: 0.8rem; color: #6a6a8a;">
          Kiểm tra lại cú pháp Mermaid code bên dưới
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
