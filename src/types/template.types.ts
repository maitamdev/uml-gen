// Template type definitions
export interface Template {
  name: string;
  description: string;
  category: TemplateCategory;
  icon: string;
  diagrams: Record<string, string>;
  analyses?: Record<string, string>;
}

export type TemplateCategory = 'education' | 'business' | 'healthcare' | 'entertainment';

export interface TemplateListItem {
  key: string;
  name: string;
  description: string;
  icon: string;
  category: TemplateCategory;
}

export interface TemplateFilter {
  category?: TemplateCategory;
  searchQuery?: string;
}
