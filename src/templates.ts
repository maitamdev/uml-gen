// ============================================
// UML Diagram Templates
// Pre-built Mermaid diagrams for common topics
// ============================================

export interface DiagramSet {
  usecase: string;
  activity: string;
  sequence: string;
  class: string;
  erd: string;
  state: string;
  component?: string;
  deployment?: string;
  dfd?: string;
  gantt?: string;
}

export interface Template {
  name: string;
  description: string;
  diagrams: DiagramSet;
  analyses?: Record<string, string>;
}

export const templates: Record<string, Template> = {
  library: {
    name: "Quản lý thư viện",
    description:
      "Hệ thống quản lý thư viện cho phép sinh viên mượn/trả sách, thủ thư quản lý sách và thẻ thư viện",
