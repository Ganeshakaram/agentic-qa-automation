import { test, expect } from '../../fixtures/testFixtures';
// import { ApiClient } from '../../models/ApiClient';
import { ProductsResponse } from '../../models/products';

test('Search Products through API', async ({ api }) => {

    // const api = new ApiClient(request);

    const response = await api.post<ProductsResponse>(
        '/api/searchProduct',
        { search_product: 'top' },
        { type: 'form' }
    );

    console.log(response);

    expect(response.status).toBe(200);
expect(response.data.products[0].name).toContain('Top');
console.log(response.data.products[0].name);
    const products = response.data.products;

    expect(products.length).toBeGreaterThan(0);

   products.forEach(product => {
    expect(product).toHaveProperty('id');
    expect(product).toHaveProperty('name');
    expect(product).toHaveProperty('price');
    expect(product).toHaveProperty('brand');
    expect(product).toHaveProperty('category');


})
})

interface SearchErrorResponse {
    responseCode: number;
    message: string;
}

test("Negative Scenario by Missing a Parameter", async({api})=>{
     const response = await api.post<SearchErrorResponse>(
    '/api/searchProduct',
    {},
    { type: 'form' }
   );

    expect(response.status).toBe(200);
    expect(response.data.responseCode).toBe(400);
    expect(response.data.message).toContain(
        'search_product parameter is missing'
    );
})