'use server';

/**
 * @fileOverview AI flow for generating a personalized learning plan.
 *
 * - generateLearningPlan - A function that suggests topics and vocabulary.
 * - GenerateLearningPlanInput - The input type for the function.
 * - GenerateLearningPlanOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {googleAI} from '@genkit-ai/googleai';
import {z} from 'genkit';

const GenerateLearningPlanInputSchema = z.object({
  goal: z.string().describe('The user\'s learning goal. e.g., "I am a machine learning engineer and I have a job interview. I want to learn words to prepare for the interview, both technical and for assertive communication."'),
  currentLevel: z.string().describe('The user\'s current English level (e.g., beginner, lower-intermediate, upper-intermediate, advanced).'),
  nativeLanguage: z.string().describe("The user's native language (e.g., 'Spanish', 'French', 'Mandarin')."),
});
export type GenerateLearningPlanInput = z.infer<typeof GenerateLearningPlanInputSchema>;

const GenerateLearningPlanOutputSchema = z.object({
  response: z.string().describe('A friendly, conversational response to the user summarizing the suggestions, written in their native language.'),
  topicName: z.string().describe("A short, relevant name for the topic generated based on the user's goal (e.g., 'Job Interview Prep', 'Cooking Vocabulary')."),
  topicSlug: z.string().describe("A URL-friendly slug for the topic name (e.g., 'job-interview-prep', 'cooking-vocabulary')."),
  topicDescription: z.string().describe("A brief, one-sentence description of the topic."),
  connections: z.array(z.object({
    spanish: z.string().describe('The word in the user\'s native language.'),
    english: z.string().describe('The word in English.'),
    mnemonic: z.string().describe('A very creative, clever, witty, humorous, and memorable mnemonic connection between the native language and English words. It should be a short, clever sentence or phrase that links the sounds or concepts of the words in both languages, written in the user\'s native language. Avoid simple transliterations and aim for genuinely helpful and witty connections that create a funny or vivid mental image.'),
    phonetic_spelling: z.string().describe('A simple, written-out pronunciation guide for the English word, as if read by a speaker of the user\'s native language. For example, for "hello" for a Spanish speaker, it would be "jelou".'),
    explanation: z.string().describe('A brief explanation of why the mnemonic works and the meaning of the word, written in the user\'s native language.'),
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
  model: 'googleai/gemini-1.5-flash-latest',
  input: {schema: GenerateLearningPlanInputSchema},
  output: {schema: GenerateLearningPlanOutputSchema},
  prompt: `You are an expert and highly creative language learning assistant for an app called LinguaLeap. Your specialty is creating personalized vocabulary plans with powerful, witty, and unforgettable mnemonic devices to connect English words with words in the user's native language.

The user's native language is {{nativeLanguage}}. All of your generated text content (responses, mnemonics, explanations, etc.) MUST be in {{nativeLanguage}}, except for the English vocabulary words themselves.

Your task is to analyze a user's learning goal and their English level to generate a custom vocabulary list and a relevant topic name for it.

USER'S GOAL: "{{goal}}"
USER'S ENGLISH LEVEL: "{{currentLevel}}"
USER'S NATIVE LANGUAGE: "{{nativeLanguage}}"

First, based on the user's goal, generate a concise and relevant topic name, slug, and description.
- topicName: A short name for the topic.
- topicSlug: a URL-friendly version of the name.
- topicDescription: A one-sentence description.

Next, generate a list of 5 to 7 relevant vocabulary words. Crucially, the vocabulary you select MUST be strictly appropriate for the user's stated English level. This is the most important rule.
- For a 'beginner', choose essential, high-frequency words. Examples: house, eat, book, meet, job. Do NOT suggest complex words.
- For a 'lower-intermediate' user, choose words for everyday conversations. Examples: appointment, routine, achieve, improve.
- For an 'upper-intermediate' user, choose more sophisticated vocabulary for nuanced expression. Examples: insight, leverage, nuance, comprehensive.
- For an 'advanced' user, choose specialized, idiomatic, or complex vocabulary that demonstrates mastery. Examples: ubiquitous, ephemeral, pragmatic, elucidate. Do NOT suggest simple words like 'meet'.

For each word, you must create a "connection" with the following fields:
1.  **spanish**: The word in the user's native language ({{nativeLanguage}}).
2.  **english**: The corresponding word in English.
3.  **mnemonic**: A very clever, memorable, humorous, and logical phrase or sentence IN {{nativeLanguage}} that connects the sounds or concepts of the two words. THIS IS THE MOST IMPORTANT PART. It must genuinely help the user remember the word by creating a vivid, funny, or absurd mental image. For example, for "screen" (pantalla) for a Spanish speaker, a good mnemonic is: "¡Qué escándalo con tanta 'cream' (crema) en la pantalla!". For "itinerary", a better mnemonic would be "Para no 'ai-tener-ary' que adivinar, revisa el itinerario." The connection should be witty and make sense.
4.  **phonetic_spelling**: A simple, written-out pronunciation guide for the English word, targeted at a {{nativeLanguage}} speaker. For a Spanish speaker learning "knowledge", it would be "no-ledch".
5.  **explanation**: A brief explanation of the word's meaning and why the mnemonic works, IN {{nativeLanguage}}.
6.  **example**: A clear sentence demonstrating the use of the English word.

Finally, write a brief, friendly, and encouraging response to the user in {{nativeLanguage}} that introduces the vocabulary plan you've created for them.
`,
});

export const generateLearningPlanFlow = ai.defineFlow(
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
    // The AI might incorrectly label the native language field. Let's fix it to always be 'spanish' for data consistency.
    const correctedConnections = output.connections.map(conn => ({
        ...conn,
        spanish: conn.spanish, 
    }));

    return { ...output, connections: correctedConnections };
  }
);
