import { afterAll, beforeEach, describe, expect, it, vi } from 'vitest';

const ORIGINAL_ENV = process.env;

describe('env config', () => {
  beforeEach(() => {
    vi.resetModules();
    process.env = { ...ORIGINAL_ENV };
  });

  afterAll(() => {
    process.env = ORIGINAL_ENV;
  });

  it('parses required env values', async () => {
    process.env.NEXT_PUBLIC_BASE_URL = 'https://api.example.com';
    process.env.NEXT_PUBLIC_CLOUDINARY_USERNAME = 'watchway-cloud';

    const envModule = await import('./env');

    expect(envModule.default).toEqual({
      NEXT_PUBLIC_BASE_URL: 'https://api.example.com',
      CLOUDINARY_USERNAME: 'watchway-cloud',
    });
  });

  it('throws when env values are missing or invalid', async () => {
    delete process.env.NEXT_PUBLIC_BASE_URL;
    delete process.env.NEXT_PUBLIC_CLOUDINARY_USERNAME;

    await expect(import('./env')).rejects.toThrow();
  });
});
