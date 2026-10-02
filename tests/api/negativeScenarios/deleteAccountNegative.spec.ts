import { test, expect } from '../../../fixtures/testFixtures';

import { AccountActionResponse } from '../../../models/apichaining';

test('Negative - Delete account with wrong password', async ({ api }) => {

    const email = process.env.TEST_USER_EMAIL!;
    const wrongPassword = 'WrongPassword123!';

    const response = await api.delete<AccountActionResponse>(
        '/api/deleteAccount',
        {
            email,
            password: wrongPassword
        },
        {
            type: 'form'
        }
    );

    console.log(response);

    expect(response.status).toBe(200);

    expect(response.data.responseCode).not.toBe(200);

    expect(response.data.message).toBeTruthy();
});