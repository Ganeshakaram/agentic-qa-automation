import { test, expect } from '../../fixtures/testFixtures';

import { ProductsResponse } from '../../models/products';

test('get products', async ({ api }) => {

    const getResponse = await api.get<ProductsResponse>(
        '/api/productsList'
    );

    expect(getResponse.status).toBe(200);
    expect(getResponse.data.responseCode).toBe(200);

    expect(getResponse.data.products[0].name)
        .toContain('Blue Top');

    expect(getResponse.data.products[0].price)
        .toContain('Rs. 500');
});