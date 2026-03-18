export type Locale = 'vi' | 'en';
let currentLocale: Locale = 'vi';
const translations: Record<Locale, Record<string, string>> = {
  vi: { 'app.title': 'UML Generator', 'btn.generate': 'Táº¡o sÆ¡ Ä‘á»“', 'btn.export': 'Xuáº¥t', 'btn.copy': 'Copy', 'input.placeholder': 'Nháº­p mÃ´ táº£ Ä‘á» tÃ i...', 'toast.success': 'ThÃ nh cÃ´ng!', 'toast.error': 'CÃ³ lá»—i xáº£y ra' },
  en: { 'app.title': 'UML Generator', 'btn.generate': 'Generate', 'btn.export': 'Export', 'btn.copy': 'Copy', 'input.placeholder': 'Describe your system...', 'toast.success': 'Success!', 'toast.error': 'An error occurred' },
};
export function t(key: string): string { return translations[currentLocale]?.[key] || key; }
export function setLocale(locale: Locale): void { currentLocale = locale; }
export function getLocale(): Locale { return currentLocale; }
