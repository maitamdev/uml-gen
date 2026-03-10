// Request middleware pipeline
export type Middleware = (context: RequestContext, next: () => Promise<void>) => Promise<void>;

export interface RequestContext {
  url: string;
  method: string;
  headers: Record<string, string>;
  body?: string;
  response?: Response;
  startTime: number;
  metadata: Record<string, unknown>;
}

export class MiddlewarePipeline {
  private middlewares: Middleware[] = [];

  use(middleware: Middleware): this {
    this.middlewares.push(middleware);
    return this;
  }

  async execute(context: RequestContext): Promise<void> {
    let index = 0;
    const next = async (): Promise<void> => {
      if (index < this.middlewares.length) {
        const mw = this.middlewares[index++];
        await mw(context, next);
      }
    };
    await next();
  }
}
