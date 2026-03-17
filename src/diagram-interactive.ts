// ============================================
// Interactive Diagram - Drag & Drop Nodes
// Makes SVG nodes draggable and recalculates edges
// ============================================

interface NodeInfo {
  el: SVGGElement;
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

interface EdgeInfo {
  el: SVGGElement;
  pathEl: SVGPathElement;
  sourceId: string;
  targetId: string;
  labelEl?: SVGGElement;
}

/**
 * Enable drag-and-drop on all nodes in the SVG diagram.
 * Call this after each Mermaid render.
 */
export function enableDragDrop(svgContainer: HTMLElement): void {
  const svg = svgContainer.querySelector('svg');
  if (!svg) return;

  // Parse nodes
  const nodeEls = svg.querySelectorAll<SVGGElement>('g.node');
  if (nodeEls.length === 0) return;

  const nodes = new Map<string, NodeInfo>();
  
  nodeEls.forEach(nodeEl => {
    const id = getNodeId(nodeEl);
    if (!id) return;

    const transform = nodeEl.getAttribute('transform');
    const pos = parseTranslate(transform);
    const bbox = getNodeBBox(nodeEl);

    nodes.set(id, {
      el: nodeEl,
      id,
      x: pos.x,
      y: pos.y,
      width: bbox.width,
      height: bbox.height,
    });

    // Style cursor
    nodeEl.style.cursor = 'grab';
  });

  // Parse edges
  const edges: EdgeInfo[] = parseEdges(svg, nodes);

  // Add drag handlers to each node
  nodes.forEach(node => {
    addDragHandlers(svg, node, nodes, edges);
  });

  // Add visual hint
  addDragHint(svgContainer);
}

function getNodeId(el: SVGGElement): string {
  // Mermaid node IDs: "flowchart-A1-123" → extract "A1"
  const rawId = el.id || '';
  const match = rawId.match(/flowchart-(\w+)-\d+/);
  if (match) return match[1];
  
  // Try data-id or just use the element id
  return el.getAttribute('data-id') || rawId;
}

function parseTranslate(transform: string | null): { x: number; y: number } {
  if (!transform) return { x: 0, y: 0 };
  const match = transform.match(/translate\s*\(\s*([-\d.]+)\s*[,\s]\s*([-\d.]+)\s*\)/);
  if (match) return { x: parseFloat(match[1]), y: parseFloat(match[2]) };
  return { x: 0, y: 0 };
}

function getNodeBBox(el: SVGGElement): { width: number; height: number } {
  // Try to get rect/circle dimensions
  const rect = el.querySelector('rect, polygon, circle, ellipse, path');
  if (rect) {
    try {
      const bbox = (rect as SVGGraphicsElement).getBBox();
      return { width: bbox.width, height: bbox.height };
    } catch {
      // getBBox can fail if not rendered
    }
  }
  return { width: 100, height: 50 };
}

function parseEdges(svg: SVGSVGElement, nodes: Map<string, NodeInfo>): EdgeInfo[] {
  const edges: EdgeInfo[] = [];
  const edgeEls = svg.querySelectorAll<SVGGElement>('g.edgePath');

  edgeEls.forEach(edgeEl => {
    const pathEl = edgeEl.querySelector<SVGPathElement>('path.path');
    if (!pathEl) return;

    // Try to determine source/target from edge ID
    // Mermaid edge IDs look like: "L-A1-UC1-0" or "L_A1_UC1_0"
    const edgeId = edgeEl.id || '';
    const edgeMatch = edgeId.match(/L[-_](\w+)[-_](\w+)/);
    
    let sourceId = '';
    let targetId = '';
    
    if (edgeMatch) {
      sourceId = edgeMatch[1];
      targetId = edgeMatch[2];
    } else {
      // Fallback: find closest nodes to path start/end points
      const d = pathEl.getAttribute('d') || '';
      const points = extractPathEndpoints(d);
      if (points) {
        sourceId = findClosestNode(points.start, nodes);
        targetId = findClosestNode(points.end, nodes);
      }
    }

    if (sourceId && targetId) {
      // Find associated edge label
      const labelEl = findEdgeLabel(svg, edgeEl);
      edges.push({ el: edgeEl, pathEl, sourceId, targetId, labelEl: labelEl || undefined });
    }
  });

  return edges;
}

function extractPathEndpoints(d: string): { start: { x: number; y: number }; end: { x: number; y: number } } | null {
  // Extract first M point and last point from SVG path
  const mMatch = d.match(/M\s*([-\d.]+)\s*[,\s]\s*([-\d.]+)/);
  if (!mMatch) return null;

  const start = { x: parseFloat(mMatch[1]), y: parseFloat(mMatch[2]) };

  // Find last coordinate pair
  const allCoords = d.match(/[-\d.]+\s*[,\s]\s*[-\d.]+/g);
  if (!allCoords || allCoords.length === 0) return null;

  const lastCoord = allCoords[allCoords.length - 1];
  const parts = lastCoord.split(/[,\s]+/);
  const end = { x: parseFloat(parts[0]), y: parseFloat(parts[1]) };

  return { start, end };
}

function findClosestNode(point: { x: number; y: number }, nodes: Map<string, NodeInfo>): string {
  let closestId = '';
  let closestDist = Infinity;

  nodes.forEach((node, id) => {
    const dx = node.x - point.x;
    const dy = node.y - point.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < closestDist) {
      closestDist = dist;
      closestId = id;
    }
  });

  return closestId;
}

function findEdgeLabel(svg: SVGSVGElement, edgeEl: SVGGElement): SVGGElement | null {
  // Edge labels are separate elements with class "edgeLabel"
  // They're in sequence with edgePaths
  const edgeLabels = svg.querySelectorAll<SVGGElement>('g.edgeLabel');
  const edgePaths = svg.querySelectorAll<SVGGElement>('g.edgePath');
  const idx = Array.from(edgePaths).indexOf(edgeEl);
  if (idx >= 0 && idx < edgeLabels.length) {
    return edgeLabels[idx];
  }
  return null;
}

function addDragHandlers(
  svg: SVGSVGElement,
  node: NodeInfo,
  nodes: Map<string, NodeInfo>,
  edges: EdgeInfo[]
): void {
  let isDragging = false;
  let startMouseX = 0;
  let startMouseY = 0;
  let startNodeX = 0;
  let startNodeY = 0;

  const getMousePos = (e: MouseEvent) => {
    const ctm = svg.getScreenCTM();
    if (!ctm) return { x: e.clientX, y: e.clientY };
    return {
      x: (e.clientX - ctm.e) / ctm.a,
      y: (e.clientY - ctm.f) / ctm.d,
    };
  };

  node.el.addEventListener('mousedown', (e: MouseEvent) => {
    if (e.button !== 0) return; // Left click only
    e.preventDefault();
    e.stopPropagation();

    isDragging = true;
    const pos = getMousePos(e);
    startMouseX = pos.x;
    startMouseY = pos.y;
    startNodeX = node.x;
    startNodeY = node.y;

    node.el.style.cursor = 'grabbing';
    node.el.style.opacity = '0.85';
    node.el.style.filter = 'drop-shadow(0 4px 8px rgba(99, 102, 241, 0.4))';
  });

  document.addEventListener('mousemove', (e: MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();

    const pos = getMousePos(e);
    const dx = pos.x - startMouseX;
    const dy = pos.y - startMouseY;

    node.x = startNodeX + dx;
    node.y = startNodeY + dy;
    node.el.setAttribute('transform', `translate(${node.x}, ${node.y})`);

    // Update all connected edges
    updateConnectedEdges(node.id, nodes, edges);
  });

  document.addEventListener('mouseup', () => {
    if (!isDragging) return;
    isDragging = false;
    node.el.style.cursor = 'grab';
    node.el.style.opacity = '1';
    node.el.style.filter = '';
  });
}

function updateConnectedEdges(
  movedNodeId: string,
  nodes: Map<string, NodeInfo>,
  edges: EdgeInfo[]
): void {
  edges.forEach(edge => {
    if (edge.sourceId !== movedNodeId && edge.targetId !== movedNodeId) return;

    const source = nodes.get(edge.sourceId);
    const target = nodes.get(edge.targetId);
    if (!source || !target) return;

    // Calculate edge path from source center to target center
    const sx = source.x;
    const sy = source.y;
    const tx = target.x;
    const ty = target.y;

    // Calculate edge-of-node intersection points
    const dx = tx - sx;
    const dy = ty - sy;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist === 0) return;

    // Simple offset from center by half-width/height
    const sourceOffX = (dx / dist) * (source.width / 2);
    const sourceOffY = (dy / dist) * (source.height / 2);
    const targetOffX = (dx / dist) * (target.width / 2);
    const targetOffY = (dy / dist) * (target.height / 2);

    const startX = sx + sourceOffX;
    const startY = sy + sourceOffY;
    const endX = tx - targetOffX;
    const endY = ty - targetOffY;

    // Create smooth cubic bezier curve
    const midX = (startX + endX) / 2;
    const curvature = 0.2;
    const cpOffset = dist * curvature;

    // Control points for smooth curve
    const cp1x = startX + cpOffset * (dx / dist);
    const cp1y = startY + cpOffset * (dy / dist);
    const cp2x = endX - cpOffset * (dx / dist);
    const cp2y = endY - cpOffset * (dy / dist);

    const newPath = `M ${startX},${startY} C ${cp1x},${cp1y} ${cp2x},${cp2y} ${endX},${endY}`;
    edge.pathEl.setAttribute('d', newPath);

    // Update edge label position (midpoint)
    if (edge.labelEl) {
      edge.labelEl.setAttribute('transform', `translate(${midX}, ${(startY + endY) / 2})`);
    }
  });
}

function addDragHint(container: HTMLElement): void {
  // Check if hint already exists
  if (container.querySelector('.drag-hint')) return;

  const hint = document.createElement('div');
  hint.className = 'drag-hint';
  hint.innerHTML = '✋ Kéo thả các node để chỉnh sửa bố cục';
  hint.style.cssText = `
    position: absolute;
    top: 8px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(99, 102, 241, 0.9);
    color: white;
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 0.72rem;
    font-weight: 500;
    z-index: 10;
    pointer-events: none;
    opacity: 1;
    transition: opacity 0.5s ease;
  `;
  
  // Make container relative for absolute positioning
  const viewport = container.closest('.diagram-viewport') as HTMLElement;
  if (viewport) {
    viewport.style.position = 'relative';
    viewport.appendChild(hint);
  } else {
    container.style.position = 'relative';
    container.appendChild(hint);
  }

  // Fade out after 4 seconds
  setTimeout(() => {
    hint.style.opacity = '0';
    setTimeout(() => hint.remove(), 500);
  }, 4000);
}
