
import fs from 'node:fs/promises';
import path from 'node:path';

import { loginObservation } from '../src/agents/loginObservation';
import { createTestPlan } from '../src/agents/plannerAgent';
import { generatePlaywrightTest } from '../src/agents/testGeneratorAgent';

async function main() {
    console.log('Step 1: Creating AI test plan...');

    const testPlan = await createTestPlan(
        loginObservation.feature,
        loginObservation
    );

    console.log(
        `Generated ${testPlan.scenarios.length} test scenarios.`
    );

    console.log('Step 2: Generating Playwright tests...');

    const generatedCode = await generatePlaywrightTest(testPlan);

    if (
        !generatedCode.includes("from '@playwright/test'") ||
        !generatedCode.includes('test(')
    ) {
        throw new Error(
            'Generated output does not look like a Playwright test file.'
        );
    }

    const outputPath = path.resolve(
        'tests/ai-generated/login.generated.spec.ts'
    );

    await fs.mkdir(path.dirname(outputPath), {
        recursive: true
    });

    await fs.writeFile(outputPath, generatedCode, 'utf8');

    console.log(`Generated tests saved to: ${outputPath}`);
    console.log('Review the file before executing it.');
}

main().catch(error => {
    console.error('AI test generation failed:', error);
    process.exitCode = 1;
});