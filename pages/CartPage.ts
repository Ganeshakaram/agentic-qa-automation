import { Page } from '@playwright/test';

export class CartPage {

    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }




async getProduct(productName: string) {
    return this.page
        .locator('#cart_info_table tbody tr')
        .filter({ hasText: productName });
}

async getProductPrice(productName: string) {
    const product = await this.getProduct(productName);

   return (await product.locator('.cart_price').textContent())?.trim();
}

async getProductName(productName: string) {
    const product = await this.getProduct(productName);

    return await product.locator('.cart_description h4').textContent();
}

async getProductQuantity(productName: string) {
    const product = await this.getProduct(productName);

    return (await product.locator('.cart_quantity .disabled').textContent())?.trim();
}


}