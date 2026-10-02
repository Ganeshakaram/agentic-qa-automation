import { Page } from '@playwright/test';

export class ProductsPage {

    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async openProductsPage() {
        await this.page.goto('/products');
    }

    async searchProduct(productName: string) {
        await this.page.getByPlaceholder('Search Product').fill(productName);
        await this.page.locator('#submit_search').click();
    }

    async getProductCard(productName: string) {
        return this.page.locator('.productinfo').filter({ hasText: productName });
    }

    async getProductName(productName: string) {
        const productCard = this.page
            .locator('.productinfo')
            .filter({ hasText: productName });

        return await productCard.locator('p').textContent();
    }

    async getProductPrice(productName: string) {
        const productCard = this.page
            .locator('.productinfo')
            .filter({ hasText: productName });

        return await productCard.locator('h2').textContent();
    }


   async addProductToCart(productName: string) {

    const productCard = this.page
        .locator('.productinfo')
        .filter({ hasText: productName });

    await productCard
        .locator('.add-to-cart')
        .click();
}

  async openCart() {
     await this.page.getByRole('link', { name: /Cart/i }).first().click();}
}