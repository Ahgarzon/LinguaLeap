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
  exampleSentence: z.string().describe('An example sentence using the mnemonic connection.'),
});
export type GenerateExampleSentenceOutput = z.infer<typeof GenerateExampleSentenceOutputSchema>;

export async function generateExampleSentence(
  input: GenerateExampleSentenceInput
): Promise<GenerateExampleSentenceOutput> {
  return generateExampleSentenceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateExampleSentencePrompt',
  model: googleAI.model('gemini-2.0-flash'),
  input: {schema: GenerateExampleSentenceInputSchema},
  output: {schema: GenerateExampleSentenceOutputSchema},
  prompt: `You are a helpful language learning assistant.

You are helping a user learn the connection between the Spanish word "{{spanishWord}}" and the English word "{{englishWord}}".

The mnemonic connection between these words is: "{{mnemonicConnection}}".

Generate one example sentence that uses both the Spanish and English words in a way that demonstrates the mnemonic connection. The sentence should be clear, concise, and easy to understand for English language learners.
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
