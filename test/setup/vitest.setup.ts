import '@testing-library/jest-dom/vitest';
import { getQueryClient } from '@/lib/query-client';
import { cleanup } from '@testing-library/react';
import { afterAll, afterEach, beforeAll } from 'vitest';
import { server } from '../mocks/server';
import { resetStores } from './store-reset';

process.env.NEXT_PUBLIC_BASE_URL ??= 'http://localhost:4010';
process.env.NEXT_PUBLIC_CLOUDINARY_USERNAME ??= 'demo-cloud';

beforeAll(() => {
  server.listen({ onUnhandledRequest: 'error' });
});

afterEach(() => {
  cleanup();
  server.resetHandlers();
  resetStores();
  getQueryClient().clear();
});

afterAll(() => {
  server.close();
});
