import { defineConfig, devices } from '@playwright/test';

export default defineConfig({

  testDir: './src/tests',
  fullyParallel: true, // Root of all tests
  reporter: 'html',


  projects: [
    // 1. Setup project
    {
      name: 'setup',  //tag of test
      testMatch: /auth\.setup\.spec\.ts/,
    },
    // 2. Main testing project
    {
      name: 'e2e tests', //tag of tests
      use: {
        ...devices['Desktop Chrome'],
        // Only this project looks for the file
        storageState: 'playwright/.auth/user.json',
      },
      dependencies: ['setup'], // This ensures setup runs first!
      testIgnore: /.*\.setup\.spec\.ts/,
    },
  ],
});