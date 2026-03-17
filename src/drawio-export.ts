// ============================================
// Mermaid → Draw.io XML Converter
// Converts Mermaid flowchart code to native Draw.io shapes
// ============================================

interface DrawioActor {
  id: string;
  label: string;
}

interface DrawioUseCase {
  id: string;
  label: string;
}

interface DrawioConnection {
  from: string;
  to: string;
  label?: string;
  dashed?: boolean;
}

interface DrawioNode {
  id: string;
  label: string;
  type: 'process' | 'decision' | 'start' | 'end' | 'io';
}

function escapeXml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

// Strip emoji from label for cleaner draw.io display
function cleanLabel(label: string): string {
  return label.replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE00}-\u{FEFF}]/gu, '').trim();
}

// ---- USE CASE DIAGRAM ----
function parseUseCaseMermaid(code: string) {
  const lines = code.split('\n').map(l => l.trim()).filter(l => l && !l.startsWith('%%'));

  const actors: DrawioActor[] = [];
  const usecases: DrawioUseCase[] = [];
  const connections: DrawioConnection[] = [];
  let systemName = 'Hệ thống';
  let inSubgraph = false;

  for (const line of lines) {
    if (line.startsWith('flowchart')) continue;

    // Subgraph
    const subMatch = line.match(/subgraph\s+\w+\["?(.+?)"?\]/);
    if (subMatch) {
      systemName = cleanLabel(subMatch[1]);
      inSubgraph = true;
      continue;
    }
    if (line === 'end') { inSubgraph = false; continue; }

    // Use case: UC1(["text"]) or UC1(["text"])
    const ucMatch = line.match(/^(\w+)\(\["(.+?)"\]\)/);
    if (ucMatch) {
      usecases.push({ id: ucMatch[1], label: cleanLabel(ucMatch[2]) });
      continue;
    }

    // Actor (not inside subgraph): A1["text"]
    const actorMatch = line.match(/^(\w+)\["(.+?)"\]/);
    if (actorMatch && !inSubgraph) {
      actors.push({ id: actorMatch[1], label: cleanLabel(actorMatch[2]) });
      continue;
    }

    // Node inside subgraph but not use case format: UC1["text"]
    if (actorMatch && inSubgraph) {
      usecases.push({ id: actorMatch[1], label: cleanLabel(actorMatch[2]) });
      continue;
    }

    // Dashed connection with label: UC1 -.->|"text"| UC2
    const dashedMatch = line.match(/^(\w+)\s*-\.->?\|"?(.+?)"?\|\s*(\w+)/);
    if (dashedMatch) {
      connections.push({ from: dashedMatch[1], to: dashedMatch[3], label: dashedMatch[2], dashed: true });
      continue;
    }

    // Normal connection: A1 --> UC1
    const connMatch = line.match(/^(\w+)\s*-->\s*(\w+)/);
    if (connMatch) {
      connections.push({ from: connMatch[1], to: connMatch[2] });
      continue;
    }
  }

  return { actors, usecases, connections, systemName };
}

export function useCaseToDrawioXml(mermaidCode: string): string {
  const { actors, usecases, connections, systemName } = parseUseCaseMermaid(mermaidCode);

  // Layout constants
  const actorX = 100;
  const ucStartX = 350;
  const ucWidth = 200;
  const ucHeight = 50;
  const ucGap = 30;
  const actorGap = 120;

  // Calculate dimensions
  const totalUCHeight = usecases.length * (ucHeight + ucGap) - ucGap;
  const sysMargin = 40;
  const sysY = 30;
  const sysHeight = Math.max(totalUCHeight + sysMargin * 2 + 30, 200);
  const sysWidth = ucWidth + sysMargin * 2 + 40;
  const sysX = ucStartX - sysMargin;

  // Center actors vertically
  const totalActorHeight = actors.length * actorGap;
  const actorStartY = sysY + (sysHeight - totalActorHeight) / 2;

  let cellId = 10;
  const idMap: Record<string, string> = {};

  let cells = '';

  // System boundary (swimlane)
  const sysId = `${cellId++}`;
  cells += `
        <mxCell id="${sysId}" value="${escapeXml(systemName)}" style="rounded=1;whiteSpace=wrap;html=1;arcSize=4;fillColor=none;dashed=1;dashPattern=8 4;strokeColor=#6366F1;strokeWidth=2;verticalAlign=top;fontStyle=1;fontSize=14;fontColor=#6366F1;spacingTop=5;container=0;" vertex="1" parent="1">
          <mxGeometry x="${sysX}" y="${sysY}" width="${sysWidth}" height="${sysHeight}" as="geometry" />
        </mxCell>`;

  // Use cases
  usecases.forEach((uc, i) => {
    const id = `${cellId++}`;
    idMap[uc.id] = id;
    const y = sysY + sysMargin + 25 + i * (ucHeight + ucGap);
    cells += `
        <mxCell id="${id}" value="${escapeXml(uc.label)}" style="ellipse;whiteSpace=wrap;html=1;fillColor=#dae8fc;strokeColor=#6c8ebf;fontSize=12;fontStyle=0;" vertex="1" parent="1">
          <mxGeometry x="${ucStartX}" y="${y}" width="${ucWidth}" height="${ucHeight}" as="geometry" />
        </mxCell>`;
  });

  // Actors
  actors.forEach((actor, i) => {
    const id = `${cellId++}`;
    idMap[actor.id] = id;
    const y = actorStartY + i * actorGap;
    cells += `
        <mxCell id="${id}" value="${escapeXml(actor.label)}" style="shape=umlActor;verticalLabelPosition=bottom;verticalAlign=top;html=1;outlineConnect=0;fillColor=#d5e8d4;strokeColor=#82b366;fontSize=11;" vertex="1" parent="1">
          <mxGeometry x="${actorX}" y="${y}" width="30" height="55" as="geometry" />
        </mxCell>`;
  });

  // Connections
  connections.forEach((conn, i) => {
    const sourceId = idMap[conn.from] || conn.from;
    const targetId = idMap[conn.to] || conn.to;
    const style = conn.dashed
      ? 'endArrow=open;endFill=0;dashed=1;dashPattern=8 4;html=1;strokeColor=#999999;fontSize=10;fontColor=#666666;'
      : 'endArrow=open;endFill=0;html=1;strokeColor=#333333;strokeWidth=1.5;';
    const label = conn.label ? escapeXml(conn.label) : '';
    cells += `
        <mxCell id="e${i}" value="${label}" style="${style}" edge="1" source="${sourceId}" target="${targetId}" parent="1">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>`;
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<mxfile host="app.diagrams.net" type="device">
  <diagram name="Use Case Diagram" id="use-case-1">
    <mxGraphModel dx="1422" dy="762" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1169" pageHeight="827" math="0" shadow="0">
      <root>
        <mxCell id="0" />
        <mxCell id="1" parent="0" />${cells}
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}

// ---- ACTIVITY DIAGRAM ----
function parseActivityMermaid(code: string) {
  const lines = code.split('\n').map(l => l.trim()).filter(l => l && !l.startsWith('%%'));
  const nodes: DrawioNode[] = [];
  const connections: DrawioConnection[] = [];
  const knownIds = new Set<string>();

  for (const line of lines) {
    if (line.startsWith('flowchart')) continue;
    if (line === 'end') continue;
    if (line.startsWith('subgraph')) continue;
    if (line.startsWith('style ') || line.startsWith('classDef ')) continue;

    // Start node: S(("text"))
    const startMatch = line.match(/^(\w+)\(\("(.+?)"\)\)/);
    if (startMatch && !knownIds.has(startMatch[1])) {
      const label = cleanLabel(startMatch[2]);
      const isEnd = label.includes('Kết thúc') || label.includes('End');
      nodes.push({ id: startMatch[1], label, type: isEnd ? 'end' : 'start' });
      knownIds.add(startMatch[1]);
      continue;
    }

    // Decision: C1{"text"}
    const decMatch = line.match(/^(\w+)\{"(.+?)"\}/);
    if (decMatch && !knownIds.has(decMatch[1])) {
      nodes.push({ id: decMatch[1], label: cleanLabel(decMatch[2]), type: 'decision' });
      knownIds.add(decMatch[1]);
      continue;
    }

    // Process: B1["text"]
    const procMatch = line.match(/^(\w+)\["(.+?)"\]/);
    if (procMatch && !knownIds.has(procMatch[1])) {
      nodes.push({ id: procMatch[1], label: cleanLabel(procMatch[2]), type: 'process' });
      knownIds.add(procMatch[1]);
      continue;
    }

    // Connection with label: A -->|"text"| B or A -->|text| B
    const labelConnMatch = line.match(/^(\w+)\s*-->\|"?(.+?)"?\|\s*(\w+)/);
    if (labelConnMatch) {
      connections.push({ from: labelConnMatch[1], to: labelConnMatch[3], label: labelConnMatch[2] });
      continue;
    }

    // Chain: A --> B --> C
    const chainParts = line.split(/\s*-->\s*/);
    if (chainParts.length >= 2) {
      for (let i = 0; i < chainParts.length - 1; i++) {
        const from = chainParts[i].trim();
        const to = chainParts[i + 1].trim();
        if (from && to && /^\w+$/.test(from) && /^\w+$/.test(to)) {
          connections.push({ from, to });
        }
      }
    }
  }

  return { nodes, connections };
}

export function activityToDrawioXml(mermaidCode: string): string {
  const { nodes, connections } = parseActivityMermaid(mermaidCode);

  const nodeWidth = 200;
  const nodeHeight = 40;
  const startX = 400;
  let y = 40;
  const yGap = 80;
  let cellId = 10;
  const idMap: Record<string, string> = {};

  let cells = '';

  nodes.forEach((node) => {
    const id = `${cellId++}`;
    idMap[node.id] = id;
    let style = '';
    let w = nodeWidth;
    let h = nodeHeight;

    switch (node.type) {
      case 'start':
        style = 'ellipse;whiteSpace=wrap;html=1;fillColor=#d5e8d4;strokeColor=#82b366;fontStyle=1;fontSize=12;';
        w = 80; h = 40;
        break;
      case 'end':
        style = 'ellipse;whiteSpace=wrap;html=1;fillColor=#f8cecc;strokeColor=#b85450;fontStyle=1;fontSize=12;';
        w = 80; h = 40;
        break;
      case 'decision':
        style = 'rhombus;whiteSpace=wrap;html=1;fillColor=#fff2cc;strokeColor=#d6b656;fontSize=11;';
        w = 180; h = 80;
        break;
      case 'process':
      default:
        style = 'rounded=1;whiteSpace=wrap;html=1;fillColor=#dae8fc;strokeColor=#6c8ebf;fontSize=12;arcSize=20;';
        break;
    }

    const x = startX - w / 2;
    cells += `
        <mxCell id="${id}" value="${escapeXml(node.label)}" style="${style}" vertex="1" parent="1">
          <mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry" />
        </mxCell>`;
    y += h + yGap;
  });

  connections.forEach((conn, i) => {
    const sourceId = idMap[conn.from] || conn.from;
    const targetId = idMap[conn.to] || conn.to;
    const label = conn.label ? escapeXml(conn.label) : '';
    cells += `
        <mxCell id="e${i}" value="${label}" style="endArrow=block;endFill=1;html=1;strokeColor=#333333;strokeWidth=1.5;fontSize=10;fontColor=#666666;" edge="1" source="${sourceId}" target="${targetId}" parent="1">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>`;
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<mxfile host="app.diagrams.net" type="device">
  <diagram name="Activity Diagram" id="activity-1">
    <mxGraphModel dx="1422" dy="762" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1169" pageHeight="827" math="0" shadow="0">
      <root>
        <mxCell id="0" />
        <mxCell id="1" parent="0" />${cells}
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}

// ---- GENERIC FALLBACK: SVG with white background ----
export function svgToDrawioXml(svgElement: SVGSVGElement): string {
  // Clone and add white background
  const clone = svgElement.cloneNode(true) as SVGSVGElement;
  const bgRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  bgRect.setAttribute('width', '100%');
  bgRect.setAttribute('height', '100%');
  bgRect.setAttribute('fill', 'white');
  clone.insertBefore(bgRect, clone.firstChild);

  // Make text black for readability
  clone.querySelectorAll('text').forEach(t => {
    t.setAttribute('fill', '#333333');
  });
  clone.querySelectorAll('[stroke]').forEach(el => {
    const s = el.getAttribute('stroke');
    if (s && (s.includes('#e8e8f0') || s.includes('#a0a0c0'))) {
      el.setAttribute('stroke', '#333333');  
    }
  });

  const svgString = new XMLSerializer().serializeToString(clone);
  const encodedSvg = btoa(unescape(encodeURIComponent(svgString)));
  const svgDataUri = `data:image/svg+xml;base64,${encodedSvg}`;

  const viewBox = clone.getAttribute('viewBox')?.split(' ') || [];
  const width = parseInt(viewBox[2] || clone.getAttribute('width') || '800');
  const height = parseInt(viewBox[3] || clone.getAttribute('height') || '600');

  return `<?xml version="1.0" encoding="UTF-8"?>
<mxfile host="app.diagrams.net" type="device">
  <diagram name="Diagram" id="diagram-1">
    <mxGraphModel dx="1422" dy="762" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1169" pageHeight="827" math="0" shadow="0">
      <root>
        <mxCell id="0" />
        <mxCell id="1" parent="0" />
        <mxCell id="2" value="" style="shape=image;verticalLabelPosition=bottom;labelBackgroundColor=default;verticalAlign=top;aspect=fixed;imageAspect=0;image=${svgDataUri};" vertex="1" parent="1">
          <mxGeometry x="40" y="40" width="${width}" height="${height}" as="geometry" />
        </mxCell>
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}

// ---- Main export function ----
export function convertToDrawio(mermaidCode: string, diagramType: string, svgElement?: SVGSVGElement | null): string {
  switch (diagramType) {
    case 'usecase':
      return useCaseToDrawioXml(mermaidCode);
    case 'activity':
      return activityToDrawioXml(mermaidCode);
    default:
      // For sequence, class, and others: fallback to SVG embed
      if (svgElement) {
        return svgToDrawioXml(svgElement);
      }
      return useCaseToDrawioXml(mermaidCode); // fallback
  }
}
