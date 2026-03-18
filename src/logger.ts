// ============================================
// Logger Module
// ============================================

export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
}

let currentLevel: LogLevel = LogLevel.INFO;

export function setLogLevel(level: LogLevel): void {
  currentLevel = level;
}

export function debug(...args: any[]): void {
  if (currentLevel <= LogLevel.DEBUG) {
    console.debug('[UML-Gen]', ...args);
  }
}

export function info(...args: any[]): void {
  if (currentLevel <= LogLevel.INFO) {
    console.info('[UML-Gen]', ...args);
  }
}

export function warn(...args: any[]): void {
  if (currentLevel <= LogLevel.WARN) {
    console.warn('[UML-Gen]', ...args);
  }
}

export function error(...args: any[]): void {
  if (currentLevel <= LogLevel.ERROR) {
    console.error('[UML-Gen]', ...args);
  }
}

export const logger = { debug, info, warn, error, setLogLevel };
