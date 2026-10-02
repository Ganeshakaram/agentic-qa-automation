import { test, expect } from '../../../fixtures/testFixtures';

import { ProductsResponse } from '../../../models/products';

test('Negative - Search product with non-existing product name', async ({ api }) => {

    const response = await api.post<ProductsResponse>(
        '/api/searchProduct',
        {
            search_product: 'THIS_PRODUCT_DOES_NOT_EXIST_123456'
        },
        {
            type: 'form'
        }
    );

    console.log(response);

    expect(response.status).toBe(200);

    expect(response.data.responseCode).toBe(200);

    expect(response.data.products).toHaveLength(0);
});