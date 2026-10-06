import { askAI } from '../ai/aiClient';

export interface TestScenario {
    name: string;
    preconditions: string[];
    steps: string[];
    expectedResult: string;
    priority: 'High' | 'Medium' | 'Low';
}

export interface TestPlan {
    feature: string;
    scenarios: TestScenario[];
}

export async function createTestPlan(
    feature: string,
    observations: unknown
): Promise<TestPlan> {

    const systemPrompt = `
You are an expert QA automation test planner.

You receive observations collected from a real application using browser automation.

Your job is to create a test plan based ONLY on the observed application behavior.

IMPORTANT RULES:
- Do not invent UI elements or behaviors that were not observed.
- Do not assume successful behavior if it was not observed.
- Include positive, negative, and validation scenarios only when supported by the observations.
- Clearly distinguish observed behavior from unobserved behavior.
- Prioritize important validation and negative scenarios.
- Keep the scenarios suitable for Playwright automation.

Return ONLY valid JSON.

The JSON must follow this structure:

{
  "feature": "string",
  "scenarios": [
    {
      "name": "string",
      "preconditions": ["string"],
      "steps": ["string"],
      "expectedResult": "string",
      "priority": "High | Medium | Low"
    }
  ]
}
`;

    const userPrompt = `
Create a QA test plan for the following feature.

Feature:
${feature}

Observed application behavior:
${JSON.stringify(observations, null, 2)}

Generate scenarios based strictly on these observations.
`;

    const result = await askAI(systemPrompt, userPrompt);

    return JSON.parse(result) as TestPlan;
}