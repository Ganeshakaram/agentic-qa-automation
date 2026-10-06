import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
    throw new Error('GEMINI_API_KEY is missing from .env');
}

const client = new GoogleGenAI({
    apiKey
});

export async function askAI(
    systemPrompt: string,
    userPrompt: string
): Promise<string> {

    const response = await client.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: userPrompt,
        config: {
            systemInstruction: systemPrompt
        }
    });

    return response.text ?? '';
}