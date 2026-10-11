
import fs from 'node:fs/promises';
import path from 'node:path';
import * as ts from 'typescript';
import { loginObservation } from '../src/agents/loginObservation';
import { createTestPlan } from '../src/agents/plannerAgent';
import { generatePlaywrightTest } from '../src/agents/testGeneratorAgent';

function validateGeneratedCode(code: string): void {
    const sourceFile = ts.createSourceFile(
        'login.generated.spec.ts',
        code,
        ts.ScriptTarget.Latest,
        true,
        ts.ScriptKind.TS
    );

    const syntaxErrors = (
    sourceFile as ts.SourceFile & {
        parseDiagnostics: readonly ts.Diagnostic[];
    }
).parseDiagnostics;

if (syntaxErrors.length > 0) {
    throw new Error(
        'Generated code contains TypeScript syntax errors.'
    );
}

    let hasTestCase = false;
    let hasTestImport = false;
    let hasExpectImport = false;

    const forbiddenIdentifiers = new Set([
        'process',
        'require',
        'eval',
        'Function',
        'globalThis',
        'fetch',
        'XMLHttpRequest',
        'WebSocket',
        'Deno',
        'Bun',
    ]);

    function visit(node: ts.Node): void {
        if (ts.isImportDeclaration(node)) {
            const moduleName = ts.isStringLiteral(node.moduleSpecifier)
                ? node.moduleSpecifier.text
                : '';

            if (moduleName !== '@playwright/test') {
                throw new Error(
                    `Generated code contains an unapproved import: ${moduleName}`
                );
            }

            if (
                node.importClause &&
                !node.importClause.isTypeOnly &&
                node.importClause.namedBindings &&
                ts.isNamedImports(node.importClause.namedBindings)
            ) {
                for (const element of node.importClause.namedBindings.elements) {
                    if (element.name.text === 'test') {
                        hasTestImport = true;
                    }

                    if (element.name.text === 'expect') {
                        hasExpectImport = true;
                    }
                }
            }
        }

        if (
            ts.isIdentifier(node) &&
            forbiddenIdentifiers.has(node.text)
        ) {
            throw new Error(
                `Generated code uses a restricted identifier: ${node.text}`
            );
        }

        if (
            ts.isCallExpression(node) &&
            node.expression.kind === ts.SyntaxKind.ImportKeyword
        ) {
            throw new Error(
                'Dynamic imports are not allowed in generated tests.'
            );
        }

        if (
            ts.isCallExpression(node) &&
            ts.isIdentifier(node.expression) &&
            node.expression.text === 'test'
        ) {
            hasTestCase = true;
        }

        ts.forEachChild(node, visit);
    }

    visit(sourceFile);

    if (!hasTestImport || !hasExpectImport || !hasTestCase) {
        throw new Error(
            'Generated code must import test and expect from @playwright/test and contain at least one test case.'
        );
    }
}

async function main(): Promise<void> {
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

    console.log('Step 3: Validating generated code...');
    validateGeneratedCode(generatedCode);

    console.log('Validation passed.');

    const outputPath = path.resolve(
        'tests/ai-generated/login.generated.spec.ts'
    );

    await fs.mkdir(path.dirname(outputPath), {
        recursive: true,
    });

    await fs.writeFile(outputPath, generatedCode, 'utf8');

    console.log(`Generated tests saved to: ${outputPath}`);
    console.log('Step 4: Run the generated tests using npm run ai:test.');
}

main().catch((error: unknown) => {
    console.error('AI test generation failed:', error);
    process.exitCode = 1;
});