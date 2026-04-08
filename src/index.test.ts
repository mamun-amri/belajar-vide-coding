import { describe, expect, it } from 'bun:test';
import app from './index';

describe('Elysia Server', () => {
  it('should return 200 for health check', async () => {
    const response = await app.handle(new Request('http://localhost/health'));
    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data.status).toBe('ok');
  });

  it('should return 200 for root endpoint', async () => {
    const response = await app.handle(new Request('http://localhost/'));
    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data.message).toContain('Welcome to Bun + Elysia + Drizzle + PostgreSQL API');
  });
});
