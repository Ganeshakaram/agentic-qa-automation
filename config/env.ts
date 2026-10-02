import dotenv from 'dotenv';

dotenv.config();

function getEnvVariable(name: string): string {
    const value = process.env[name];

    if (!value) {
        throw new Error(`Missing required environment variable: ${name}`);
    }

    return value;
}

export const env = {
    baseURL: getEnvVariable('BASE_URL'),
    testUserEmail: getEnvVariable('TEST_USER_EMAIL'),
    testUserPassword: getEnvVariable('TEST_USER_PASSWORD')
};