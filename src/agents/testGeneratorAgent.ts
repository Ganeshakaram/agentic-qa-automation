import { askAI } from '../ai/aiClient';
import { TestPlan } from './plannerAgent';

export async function generatePlaywrightTest(
    testPlan: TestPlan
): Promise<string> {

    const systemPrompt = `
You are an expert Playwright TypeScript test automation engineer.

Your job is to convert a QA test plan into executable Playwright test code.

IMPORTANT RULES:
- Generate valid TypeScript using @playwright/test.
- Generate one Playwright test for each scenario.
- Use only selectors provided in the test plan.
- Never invent selectors.
- Preserve selectors exactly as provided.
- Use async/await.
- Include meaningful Playwright assertions.
- Use clear and descriptive test names.
- Keep the generated tests independent.
- Do not use hard waits such as page.waitForTimeout().
- Do not include explanations.
- Return ONLY valid TypeScript code.
- Do not use markdown code fences.

The generated code should follow this general structure:

import { test, expect } from '@playwright/test';

test.describe('Feature', () => {

    test('scenario name', async ({ page }) => {

        // test steps

        // assertions
    });

});
`;

    const userPrompt = `
Generate Playwright TypeScript tests for the following QA test plan.

Test Plan:
${JSON.stringify(testPlan, null, 2)}

Generate the tests strictly from the provided test plan.
`;

    return await askAI(systemPrompt, userPrompt);
}