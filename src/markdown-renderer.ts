import { marked } from 'marked';
export function configureMarkdown(): void {
  marked.setOptions({
    breaks: true,
    gfm: true,
  });
}
export function renderMarkdown(text: string): string {
  return marked.parse(text) as string;
}
export function stripMarkdown(text: string): string {
  return text.replace(/[#*_~>\[\]()!|]/g, '').replace(/\n{2,}/g, '\n').trim();
}
