// i18n - Language type definitions
export type Locale = 'vi' | 'en' | 'ja' | 'ko' | 'zh';

export interface TranslationMap {
  [key: string]: string | TranslationMap;
}

export interface I18nConfig {
  defaultLocale: Locale;
  fallbackLocale: Locale;
  availableLocales: Locale[];
}
