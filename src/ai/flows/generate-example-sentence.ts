'use server';

/**
 * @fileOverview AI flow for generating example sentences based on a mnemonic connection.
 *
 * - generateExampleSentence - A function that generates example sentences.
 * - GenerateExampleSentenceInput - The input type for the generateExampleSentence function.
 * - GenerateExampleSentenceOutput - The return type for the generateExampleSentence function.
 */

import {ai} from '@/ai/genkit';
import {googleAI} from '@genkit-ai/googleai';
import {z} from 'genkit';

const GenerateExampleSentenceInputSchema = z.object({
  spanishWord: z.string().describe('The Spanish word.'),
  englishWord: z.string().describe('The English word.'),
  mnemonicConnection: z.string().describe('The mnemonic connection between the Spanish and English words.'),
});
export type GenerateExampleSentenceInput = z.infer<typeof GenerateExampleSentenceInputSchema>;

const GenerateExampleSentenceOutputSchema = z.object({
  exampleSentences: z.array(z.string()).describe('An array of 5 distinct example sentences using the English word in different contexts.'),
});
export type GenerateExampleSentenceOutput = z.infer<typeof GenerateExampleSentenceOutputSchema>;

export async function generateExampleSentence(
  input: GenerateExampleSentenceInput
): Promise<GenerateExampleSentenceOutput> {
  return generateExampleSentenceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateExampleSentencePrompt',
  model: 'googleai/gemini-2.0-flash',
  input: {schema: GenerateExampleSentenceInputSchema},
  output: {schema: GenerateExampleSentenceOutputSchema},
  prompt: `You are a helpful language learning assistant.

You are helping a user learn the English word "{{englishWord}}".

Generate an array of 5 distinct and clear example sentences that use the English word "{{englishWord}}" in a real-world context. The sentences should be easy to understand for an English language learner. Do NOT use the Spanish word or the mnemonic connection in the examples.
`,
});

const generateExampleSentenceFlow = ai.defineFlow(
  {
    name: 'generateExampleSentenceFlow',
    inputSchema: GenerateExampleSentenceInputSchema,
    outputSchema: GenerateExampleSentenceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
