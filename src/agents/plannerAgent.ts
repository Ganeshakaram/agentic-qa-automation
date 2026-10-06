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
    feature: string
): Promise<TestPlan> {

    const systemPrompt = `
You are an expert QA automation test planner.

Your job is to create a test plan for the requested application feature.

Identify:
- positive scenarios
- negative scenarios
- boundary or validation scenarios where relevant

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
Create a QA test plan for this feature:

${feature}
`;

    const result = await askAI(systemPrompt, userPrompt);

    return JSON.parse(result) as TestPlan;
}