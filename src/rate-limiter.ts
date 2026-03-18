export class RateLimiter {
  private timestamps: number[] = [];
  constructor(private maxRequests: number, private windowMs: number) {}
  canProceed(): boolean {
    const now = Date.now();
    this.timestamps = this.timestamps.filter(t => now - t < this.windowMs);
    return this.timestamps.length < this.maxRequests;
  }
  record(): void { this.timestamps.push(Date.now()); }
  getRemainingRequests(): number {
    const now = Date.now();
    this.timestamps = this.timestamps.filter(t => now - t < this.windowMs);
    return Math.max(0, this.maxRequests - this.timestamps.length);
  }
  getResetTime(): number {
    if (this.timestamps.length === 0) return 0;
    return Math.max(0, this.windowMs - (Date.now() - this.timestamps[0]));
  }
}
