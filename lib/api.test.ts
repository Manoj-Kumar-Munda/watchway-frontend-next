import { http, HttpResponse } from 'msw';
import { afterAll, beforeEach, describe, expect, it, vi } from 'vitest';
import { server } from '../test/mocks/server';

const ORIGINAL_ENV = process.env;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const loadApiClient = async () => {
  vi.resetModules();
  process.env = {
    ...ORIGINAL_ENV,
    NEXT_PUBLIC_BASE_URL: 'http://localhost:4010',
    NEXT_PUBLIC_CLOUDINARY_USERNAME: 'demo-cloud',
  };

  const apiModule = await import('./api');
  return apiModule.default;
};

describe('api client', () => {
  beforeEach(() => {
    vi.resetModules();
  });

  afterAll(() => {
    process.env = ORIGINAL_ENV;
  });

  it('retries the original request after a successful refresh', async () => {
    let protectedCalls = 0;
    let refreshCalls = 0;

    server.use(
      http.get('*/api/v1/protected', () => {
        protectedCalls += 1;
        if (protectedCalls === 1) {
          return HttpResponse.json(
            { message: 'Unauthorized' },
            { status: 401 }
          );
        }

        return HttpResponse.json({ ok: true }, { status: 200 });
      }),
      http.post('*/api/v1/users/refresh-token', () => {
        refreshCalls += 1;
        return HttpResponse.json({}, { status: 200 });
      })
    );

    const api = await loadApiClient();
    const response = await api.get('/api/v1/protected');

    expect(response.status).toBe(200);
    expect(response.data).toEqual({ ok: true });
    expect(refreshCalls).toBe(1);
    expect(protectedCalls).toBe(2);
  });

  it('queues concurrent 401 requests while a refresh is already running', async () => {
    let protectedCalls = 0;
    let refreshCalls = 0;

    server.use(
      http.get('*/api/v1/protected', () => {
        protectedCalls += 1;
        if (protectedCalls <= 2) {
          return HttpResponse.json(
            { message: 'Unauthorized' },
            { status: 401 }
          );
        }

        return HttpResponse.json({ ok: true }, { status: 200 });
      }),
      http.post('*/api/v1/users/refresh-token', async () => {
        refreshCalls += 1;
        await sleep(50);
        return HttpResponse.json({}, { status: 200 });
      })
    );

    const api = await loadApiClient();

    const [first, second] = await Promise.all([
      api.get('/api/v1/protected'),
      api.get('/api/v1/protected'),
    ]);

    expect(first.status).toBe(200);
    expect(second.status).toBe(200);
    expect(refreshCalls).toBe(1);
    expect(protectedCalls).toBe(4);
  });

  it('does not recursively refresh when refresh endpoint itself returns 401', async () => {
    let refreshCalls = 0;

    server.use(
      http.post('*/api/v1/users/refresh-token', () => {
        refreshCalls += 1;
        return HttpResponse.json({ message: 'Unauthorized' }, { status: 401 });
      })
    );

    const api = await loadApiClient();

    await expect(api.post('/api/v1/users/refresh-token')).rejects.toBeTruthy();
    expect(refreshCalls).toBe(1);
  });
});
