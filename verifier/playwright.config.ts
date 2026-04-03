import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './checks',
  timeout: 30000,
  retries: 0,
  use: {
    baseURL: process.env.VERIFY_URL || 'http://localhost:3000',
    screenshot: 'only-on-failure',
    trace: 'off',
  },
  projects: [
    {
      name: 'desktop',
      use: {
        viewport: { width: 1280, height: 800 },
        deviceScaleFactor: 2,
      },
    },
    {
      name: 'mobile',
      use: {
        viewport: { width: 375, height: 812 },
        deviceScaleFactor: 2,
        isMobile: true,
      },
    },
  ],
  reporter: [
    ['list'],
    ['json', { outputFile: 'results.json' }],
  ],
});
