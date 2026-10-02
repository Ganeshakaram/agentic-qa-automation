import { test as base } from '@playwright/test';
import { ApiClient } from '../models/ApiClient';

type TestFixtures = {
    api: ApiClient;
};

export const test = base.extend<TestFixtures>({
    api: async ({ request }, use) => {
        const apiClient = new ApiClient(request);

        await use(apiClient);
    },
});

export { expect } from '@playwright/test';