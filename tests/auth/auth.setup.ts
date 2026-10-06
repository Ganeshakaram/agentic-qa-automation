import { test, expect } from '@playwright/test';
import { env } from '../../config/env';

const authFile = 'playwright/.auth/user.json';

test('Setting up Auth state', async ({ page }) => {

    await page.goto('/login', {
        waitUntil: 'domcontentloaded'
    });

    await expect(page).toHaveURL(/login/);

    const emailInput = page.locator('[data-qa="login-email"]');
    const passwordInput = page.locator('[data-qa="login-password"]');

    await expect(emailInput).toBeVisible();
    await expect(passwordInput).toBeVisible();

    await emailInput.fill(env.testUserEmail);
    await passwordInput.fill(env.testUserPassword);

    await page.locator('[data-qa="login-button"]').click();

    await expect(page.getByText(/Logged in as/i)).toBeVisible();

    await page.context().storageState({
        path: authFile,
    });
});