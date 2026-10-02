import { test, expect } from '../../fixtures/testFixtures';

import {
    UserResponse,
    LoginResponse,
    AccountActionResponse
} from '../../models/apichaining';

import {
    createAccountData,
    accountUpdateData
} from '../../test-data/accounts';


test('User account API lifecycle', async ({ api }) => {

    // 1. Create a new account

    const account = createAccountData();

    const createResponse = await api.post<AccountActionResponse>(
        '/api/createAccount',
        { ...account },
        {
            type: 'form'
        }
    );

    expect(createResponse.status).toBe(200);
    expect(createResponse.data.responseCode).toBe(201);
    expect(createResponse.data.message).toContain('User created!');



    const email = account.email;
    const password = account.password;



    const loginResponse = await api.post<LoginResponse>(
        '/api/verifyLogin',
        {
            email,
            password
        },
        {
            type: 'form'
        }
    );

    expect(loginResponse.status).toBe(200);
    expect(loginResponse.data.responseCode).toBe(200);
    expect(loginResponse.data.message).toContain('User exists!');



    const getResponse = await api.get<UserResponse>(
        '/api/getUserDetailByEmail',
        {
            email
        }
    );

    expect(getResponse.status).toBe(200);
    expect(getResponse.data.responseCode).toBe(200);
    expect(getResponse.data.user?.email).toBe(email);



    const putResponse = await api.put<AccountActionResponse>(
        '/api/updateAccount',
        {
            ...accountUpdateData,
            email,
            password
        },
        {
            type: 'form'
        }
    );

    expect(putResponse.status).toBe(200);
    expect(putResponse.data.responseCode).toBe(200);
    expect(putResponse.data.message).toContain('User updated!');



    const getResponseAfterPut = await api.get<UserResponse>(
        '/api/getUserDetailByEmail',
        {
            email
        }
    );

    expect(getResponseAfterPut.status).toBe(200);
    expect(getResponseAfterPut.data.responseCode).toBe(200);

   expect(getResponseAfterPut.data.user?.name)
    .toBe(accountUpdateData.name);

expect(getResponseAfterPut.data.user?.first_name)
    .toBe(accountUpdateData.firstname);

expect(getResponseAfterPut.data.user?.last_name)
    .toBe(accountUpdateData.lastname);

expect(getResponseAfterPut.data.user?.company)
    .toBe(accountUpdateData.company);

expect(getResponseAfterPut.data.user?.city)
    .toBe(accountUpdateData.city);



    const deleteResponse = await api.delete<AccountActionResponse>(
        '/api/deleteAccount',
        {
            email,
            password
        },
        {
            type: 'form'
        }
    );

    expect(deleteResponse.status).toBe(200);
    expect(deleteResponse.data.responseCode).toBe(200);
    expect(deleteResponse.data.message).toContain('Account deleted!');



    const getResponseAfterDelete = await api.get<UserResponse>(
        '/api/getUserDetailByEmail',
        {
            email
        }
    );

    expect(getResponseAfterDelete.status).toBe(200);
    expect(getResponseAfterDelete.data.responseCode).toBe(404);
    expect(getResponseAfterDelete.data.message)
        .toContain('Account not found');
});