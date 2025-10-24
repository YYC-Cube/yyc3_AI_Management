import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    coverage: {
      reporter: ['text', 'json', 'html'],
      exclude: ['**/test/**', '**/*.stories.tsx']
    }
  },
  resolve: {
    alias: {
      '@components': './src/components',
      '@utils': './src/utils',
      '@types': './src/types'
    }
  }
});
