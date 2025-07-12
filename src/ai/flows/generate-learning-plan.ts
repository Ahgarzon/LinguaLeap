'use server';

/**
 * @fileOverview AI flow for generating a personalized learning plan.
 *
 * - generateLearningPlan - A function that suggests topics and vocabulary.
 * - GenerateLearningPlanInput - The input type for the function.
 * - GenerateLearningPlanOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateLearningPlanInputSchema = z.object({
  goal: z.string().describe('The user\'s learning goal. e.g., "I am a machine learning engineer and I have a job interview. I want to learn words to prepare for the interview, both technical and for assertive communication."'),
  currentLevel: z.string().describe('The user\'s current English level (e.g., beginner, intermediate, advanced).'),
});
export type GenerateLearningPlanInput = z.infer<typeof GenerateLearningPlanInputSchema>;

const GenerateLearningPlanOutputSchema = z.object({
  response: z.string().describe('A friendly, conversational response to the user summarizing the suggestions.'),
  connections: z.array(z.object({
    spanish: z.string().describe('The word in Spanish.'),
    english: z.string().describe('The word in English.'),
    mnemonic: z.string().describe('A creative and memorable mnemonic connection between the Spanish and English words. It should be a short, clever sentence or phrase that links the sounds or concepts of the words in both languages.'),
    phonetic_spelling: z.string().describe('A simple, written-out pronunciation guide for the English word, as if read by a Spanish speaker. For example, for "hello", it would be "jelou".'),
    explanation: z.string().describe('A brief explanation of why the mnemonic works and the meaning of the word.'),
    example: z.string().describe('An example sentence using the English word in a clear context.'),
  })).describe('An array of 5-7 vocabulary connections tailored to the user\'s goal and level.'),
});
export type GenerateLearningPlanOutput = z.infer<typeof GenerateLearningPlanOutputSchema>;

export async function generateLearningPlan(
  input: GenerateLearningPlanInput
): Promise<GenerateLearningPlanOutput> {
  return generateLearningPlanFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateLearningPlanPrompt',
  input: {schema: GenerateLearningPlanInputSchema},
  output: {schema: GenerateLearningPlanOutputSchema},
  prompt: `You are an expert and creative language learning assistant for an app called LinguaLeap. Your specialty is creating personalized vocabulary plans with powerful mnemonic devices to connect Spanish and English words.

Your task is to analyze a user's learning goal and their English level to generate a custom list of 5 to 7 relevant vocabulary words.

USER'S GOAL: "{{goal}}"
USER'S LEVEL: "{{currentLevel}}"

For each word, you must create a "connection" with the following fields:
1.  **spanish**: The word in Spanish.
2.  **english**: The corresponding word in English.
3.  **mnemonic**: A clever, memorable, and logical phrase or sentence that connects the sounds or concepts of the two words. THIS IS THE MOST IMPORTANT PART. It must genuinely help the user remember the word. For example, for "screen" (pantalla), a good mnemonic is: "¡Qué escándalo con tanta 'cream' (crema) en la pantalla!".
4.  **phonetic_spelling**: A simple, written-out pronunciation guide for the English word, targeted at a Spanish speaker. For "knowledge", it would be "no-ledch".
5.  **explanation**: A brief explanation of the word's meaning and why the mnemonic works.
6.  **example**: A clear sentence demonstrating the use of the English word.

Finally, write a brief, friendly, and encouraging response to the user that introduces the vocabulary plan you've created for them.
`,
});

const generateLearningPlanFlow = ai.defineFlow(
  {
    name: 'generateLearningPlanFlow',
    inputSchema: GenerateLearningPlanInputSchema,
    outputSchema: GenerateLearningPlanOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    if (!output) {
      throw new Error('Could not generate learning plan.');
    }
    return output;
  }
);
