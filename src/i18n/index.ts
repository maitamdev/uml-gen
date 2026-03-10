// i18n - Translation engine
import type { Locale, TranslationMap } from './types';
import { vi } from './vi';
import { en } from './en';

const translations: Record<string, TranslationMap> = { vi, en };
let currentLocale: Locale = 'vi';

export function setLocale(locale: Locale): void {
  currentLocale = locale;
  document.documentElement.lang = locale;
  localStorage.setItem('uml-gen-locale', locale);
}

export function getLocale(): Locale {
  return currentLocale;
}

export function t(key: string): string {
  const keys = key.split('.');
  let result: unknown = translations[currentLocale] || translations['vi'];
  for (const k of keys) {
    if (result && typeof result === 'object' && k in (result as Record<string, unknown>)) {
      result = (result as Record<string, unknown>)[k];
    } else {
      return key;
    }
  }
  return typeof result === 'string' ? result : key;
}

export function initI18n(): void {
  const saved = localStorage.getItem('uml-gen-locale') as Locale | null;
  if (saved) setLocale(saved);
}
