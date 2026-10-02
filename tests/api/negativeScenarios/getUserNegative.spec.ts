import { test, expect } from '../../../fixtures/testFixtures';

import { UserResponse } from '../../../models/apichaining';

test('Negative - Get details for non-existent user', async ({ api }) => {

    const invalidEmail = 'user-does-not-exist-12345@example.com';

    const response = await api.get<UserResponse>(
        '/api/getUserDetailByEmail',
        {
            email: invalidEmail
        }
    );

    console.log(response);

    expect(response.status).toBe(200);

    expect(response.data.responseCode).toBe(404);

    // expect(response.data.message)
    //     .toContain('Account not found');
});