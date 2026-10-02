import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
    testDir: './tests',

    use: {
        baseURL: process.env.BASE_URL,
        headless: true,
        screenshot: 'only-on-failure',
        trace: 'on-first-retry',
    },

    reporter: 'html',

    timeout: 30000,

    projects: [
        {
            name: 'setup',
            testMatch: /auth\.setup\.ts/,
        },

        {
            name: 'chromium',
            use: {
                ...devices['Desktop Chrome'],
                storageState: 'playwright/.auth/user.json',
            },
            dependencies: ['setup'],
        },
    ],
});