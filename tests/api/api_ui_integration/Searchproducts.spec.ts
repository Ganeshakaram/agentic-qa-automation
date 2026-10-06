import { test, expect } from '../../../fixtures/testFixtures';
import { ProductsPage } from '../../../pages/ProductsPage';
import { ProductsResponse } from '../../../models/products';
import { CartPage } from '../../../pages/CartPage';

test('Search product from UI', async ({ page, api }) => {

    // API
    const response = await api.get<ProductsResponse>(
        '/api/productsList'
    );

    expect(response.status).toBe(200);
    expect(response.data.responseCode).toBe(200);

    // Select a known product from API
    const apiProduct = response.data.products.find(
        product => product.name === 'Blue Top'
    );

    expect(apiProduct).toBeDefined();

    const productName = apiProduct!.name;

    // UI
    const productsPage = new ProductsPage(page);

    await productsPage.openProductsPage();
    await productsPage.searchProduct(productName);

    const uiProductName =
        await productsPage.getProductName(productName);

    const uiProductPrice =
        await productsPage.getProductPrice(productName);

    // API ↔ UI validation
    expect(uiProductName).toBe(apiProduct!.name);
    expect(uiProductPrice).toBe(apiProduct!.price);

    // Add product to cart
    await productsPage.addProductToCart(productName);

    await productsPage.openCart();

    // Cart validation
    const cart = new CartPage(page);

    const cartProductName =
        await cart.getProductName(productName);

    const cartProductPrice =
        await cart.getProductPrice(productName);

    expect(cartProductName).toBe(apiProduct!.name);
    expect(cartProductPrice).toBe(apiProduct!.price);

    const cartProductQuantity =
        await cart.getProductQuantity(productName);

    expect(cartProductQuantity).toBe('1');
});