import { test, expect } from '@playwright/test';

import { env } from '../../config/env';

const authFile = 'playwright/.auth/user.json';

test('Setting up Auth state', async ({ page }) => {

    await page.goto('/login');

    await page.locator('[data-qa="login-email"]')
        .fill(env.testUserEmail);

    await page.locator('[data-qa="login-password"]')
        .fill(env.testUserPassword);

    await page.locator('[data-qa="login-button"]')
        .click();

    await expect(
        page.getByText(/Logged in as/i)
    ).toBeVisible();

    await page.context().storageState({
        path: authFile,
    });
});