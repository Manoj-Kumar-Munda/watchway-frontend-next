import path from 'node:path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['./test/setup/vitest.setup.ts'],
    globals: true,
    css: true,
    exclude: ['node_modules', '.next', 'dist', 'e2e/**'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      include: [
        'lib/**/*.ts',
        'services/**/*.ts',
        'store/**/*.ts',
        'utils/**/*.ts',
      ],
      exclude: ['**/*.d.ts', '**/index.ts'],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
});
