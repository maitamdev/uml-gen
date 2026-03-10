// Application logger with levels
export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

const LOG_COLORS: Record<LogLevel, string> = {
  debug: '#8b5cf6',
  info: '#6366f1',
  warn: '#f59e0b',
  error: '#ef4444',
};

let currentLevel: LogLevel = 'info';
const logHistory: { level: LogLevel; message: string; timestamp: number }[] = [];

export function setLogLevel(level: LogLevel): void { currentLevel = level; }

export function log(level: LogLevel, message: string, ...args: unknown[]): void {
  const levels: LogLevel[] = ['debug', 'info', 'warn', 'error'];
  if (levels.indexOf(level) < levels.indexOf(currentLevel)) return;
  const prefix = '%c[UML-Gen][' + level.toUpperCase() + ']';
  console[level === 'debug' ? 'log' : level](prefix, 'color:' + LOG_COLORS[level], message, ...args);
  logHistory.push({ level, message, timestamp: Date.now() });
  if (logHistory.length > 500) logHistory.splice(0, 250);
}

export function debug(msg: string, ...a: unknown[]): void { log('debug', msg, ...a); }
export function info(msg: string, ...a: unknown[]): void { log('info', msg, ...a); }
export function warn(msg: string, ...a: unknown[]): void { log('warn', msg, ...a); }
export function error(msg: string, ...a: unknown[]): void { log('error', msg, ...a); }
export function getLogHistory() { return [...logHistory]; }
