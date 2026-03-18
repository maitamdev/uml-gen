export interface DiagramTypeConfig {
  type: string;
  label: string;
  icon: string;
  description: string;
  mermaidPrefix: string;
}
export const DIAGRAM_CONFIGS: DiagramTypeConfig[] = [
  { type: 'usecase', label: 'Use Case', icon: 'ðŸ‘¥', description: 'SÆ¡ Ä‘á»“ tÃ¡c nhÃ¢n & chá»©c nÄƒng', mermaidPrefix: 'flowchart LR' },
  { type: 'activity', label: 'Activity', icon: 'ðŸ”„', description: 'Luá»“ng hoáº¡t Ä‘á»™ng & quy trÃ¬nh', mermaidPrefix: 'flowchart TD' },
  { type: 'sequence', label: 'Sequence', icon: 'ðŸ“¨', description: 'TÆ°Æ¡ng tÃ¡c giá»¯a cÃ¡c Ä‘á»‘i tÆ°á»£ng', mermaidPrefix: 'sequenceDiagram' },
  { type: 'class', label: 'Class', icon: 'ðŸ—ï¸', description: 'Cáº¥u trÃºc lá»›p & quan há»‡', mermaidPrefix: 'classDiagram' },
  { type: 'erd', label: 'ERD', icon: 'ðŸ—ƒï¸', description: 'SÆ¡ Ä‘á»“ quan há»‡ thá»±c thá»ƒ', mermaidPrefix: 'erDiagram' },
  { type: 'state', label: 'State', icon: 'ðŸ”€', description: 'SÆ¡ Ä‘á»“ tráº¡ng thÃ¡i', mermaidPrefix: 'stateDiagram-v2' },
];
export function getDiagramConfig(type: string): DiagramTypeConfig | undefined {
  return DIAGRAM_CONFIGS.find(c => c.type === type);
}
export function getDiagramLabel(type: string): string {
  return getDiagramConfig(type)?.label || type;
}
