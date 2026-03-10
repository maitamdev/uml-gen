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
