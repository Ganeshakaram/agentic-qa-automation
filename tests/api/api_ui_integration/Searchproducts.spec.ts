import { test, expect } from '../../../fixtures/testFixtures';
import { ProductsPage } from '../../../pages/ProductsPage';
import { ProductsResponse } from '../../../models/products';
import { CartPage } from '../../../pages/CartPage';

test('Search product from UI', async ({ page, api }) => {
    const response = await api.get<ProductsResponse>(
        '/api/productsList'
    );

    expect(response.status).toBe(200);
    expect(response.data.responseCode).toBe(200);

    const apiProduct = response.data.products.find(
        product => product.name === 'Blue Top'
    );

    expect(apiProduct).toBeDefined();

    const productName = apiProduct!.name;

    const productsPage = new ProductsPage(page);

    await productsPage.openProductsPage();
    await productsPage.searchProduct(productName);

    const uiProductName =
        await productsPage.getProductName(productName);

    const uiProductPrice =
        await productsPage.getProductPrice(productName);

    expect(uiProductName).toBe(apiProduct!.name);
    expect(uiProductPrice).toBe(apiProduct!.price);

    await productsPage.openCart();

    const cart = new CartPage(page);

    const existingProduct = await cart.getProduct(productName);

    let initialQuantity = 0;

    if (await existingProduct.count() > 0) {
        initialQuantity = Number(
            await cart.getProductQuantity(productName)
        );
    }
await page.goto(`/products?search=${encodeURIComponent(productName)}`, {
    waitUntil: 'domcontentloaded'
});

await productsPage.addProductToCart(productName);

    await productsPage.openCart();

    const cartProductName =
        await cart.getProductName(productName);

    const cartProductPrice =
        await cart.getProductPrice(productName);

    expect(cartProductName).toBe(apiProduct!.name);
    expect(cartProductPrice).toBe(apiProduct!.price);

    const finalQuantity = Number(
        await cart.getProductQuantity(productName)
    );

    expect(finalQuantity).toBe(initialQuantity + 1);
});