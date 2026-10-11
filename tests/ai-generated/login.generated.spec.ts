import { test, expect } from '@playwright/test';

test.describe('Login', () => {

    test('Empty required fields validation', async ({ page }) => {
        await page.goto('/login');
        await page.click('[data-qa="login-button"]');

        const emailInput = page.locator('[data-qa="login-email"]');
        const validationMessage = await emailInput.evaluate((node: HTMLInputElement) => node.validationMessage);
        expect(validationMessage).toBeTruthy();
    });

    test('Malformed email validation', async ({ page }) => {
        await page.goto('/login');
        await page.fill('[data-qa="login-email"]', 'not-an-email');
        await page.fill('[data-qa="login-password"]', 'ValidPassword123');
        await page.click('[data-qa="login-button"]');

        const emailInput = page.locator('[data-qa="login-email"]');
        const validationMessage = await emailInput.evaluate((node: HTMLInputElement) => node.validationMessage);
        expect(validationMessage).toBeTruthy();
    });

    test('Invalid credentials error handling', async ({ page }) => {
        await page.goto('/login');
        await page.fill('[data-qa="login-email"]', 'valid.user@example.com');
        await page.fill('[data-qa="login-password"]', 'WrongPassword123');
        await page.click('[data-qa="login-button"]');

        expect(page.url()).toContain('/login');
        await expect(page.locator('text=Your email or password is incorrect!')).toBeVisible();
    });

});