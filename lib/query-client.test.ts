import { afterEach, describe, expect, it, vi } from 'vitest';

describe('query client', () => {
  afterEach(() => {
    vi.resetModules();
    vi.doUnmock('@tanstack/react-query');
  });

  it('reuses the same instance in browser mode', async () => {
    const { getQueryClient } = await import('./query-client');

    const first = getQueryClient();
    const second = getQueryClient();

    expect(first).toBe(second);
    expect(first.getDefaultOptions().queries?.retry).toBe(1);
    expect(first.getDefaultOptions().queries?.staleTime).toBe(60 * 1000);
  });

  it('creates a fresh instance for each call in server mode', async () => {
    vi.doMock('@tanstack/react-query', async () => {
      const actual = await vi.importActual<
        typeof import('@tanstack/react-query')
      >('@tanstack/react-query');

      return {
        ...actual,
        isServer: true,
      };
    });

    const { getQueryClient } = await import('./query-client');

    const first = getQueryClient();
    const second = getQueryClient();

    expect(first).not.toBe(second);
  });
});
