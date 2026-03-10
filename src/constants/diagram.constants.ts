// Diagram type constants and metadata
export const DIAGRAM_TYPES = ['usecase', 'activity', 'sequence', 'class'] as const;

export const DIAGRAM_LABELS: Record<string, string> = {
  usecase: 'Use Case Diagram',
  activity: 'Activity Diagram',
  sequence: 'Sequence Diagram',
  class: 'Class Diagram',
};

export const DIAGRAM_ICONS: Record<string, string> = {
  usecase: 'ðŸ‘¥',
  activity: 'ðŸ”„',
  sequence: 'ðŸ“¨',
  class: 'ðŸ—ï¸',
};

export const DIAGRAM_DESCRIPTIONS: Record<string, string> = {
  usecase: 'SÆ¡ Ä‘á»“ tÃ¡c nhÃ¢n & chá»©c nÄƒng há»‡ thá»‘ng',
  activity: 'Luá»“ng hoáº¡t Ä‘á»™ng & quy trÃ¬nh xá»­ lÃ½',
  sequence: 'TÆ°Æ¡ng tÃ¡c giá»¯a cÃ¡c Ä‘á»‘i tÆ°á»£ng',
  class: 'Cáº¥u trÃºc lá»›p & quan há»‡ káº¿ thá»«a',
};

export const DIAGRAM_ACCENT_HUES: Record<string, number> = {
  usecase: 240,
  activity: 270,
  sequence: 200,
  class: 330,
};
