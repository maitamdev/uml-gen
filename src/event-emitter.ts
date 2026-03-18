// ============================================
// Simple Event Emitter
// ============================================

type EventCallback = (...args: any[]) => void;

export class EventEmitter {
  private events: Map<string, EventCallback[]> = new Map();

  on(event: string, callback: EventCallback): void {
    const callbacks = this.events.get(event) || [];
    callbacks.push(callback);
    this.events.set(event, callbacks);
  }

  off(event: string, callback: EventCallback): void {
    const callbacks = this.events.get(event) || [];
    this.events.set(event, callbacks.filter(cb => cb !== callback));
  }

  emit(event: string, ...args: any[]): void {
    const callbacks = this.events.get(event) || [];
    callbacks.forEach(cb => cb(...args));
  }

  once(event: string, callback: EventCallback): void {
    const wrapper = (...args: any[]) => {
      callback(...args);
      this.off(event, wrapper);
    };
    this.on(event, wrapper);
  }

  removeAllListeners(event?: string): void {
    if (event) {
      this.events.delete(event);
    } else {
      this.events.clear();
    }
  }
}

export const appEvents = new EventEmitter();
