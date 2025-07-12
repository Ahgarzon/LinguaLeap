'use server';

/**
 * @fileOverview AI flow for proposing learning topics based on user goals.
 *
 * - proposeTopics - A function that suggests topics.
 * - ProposeTopicsInput - The input type for the function.
 * - ProposeTopicsOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import {topicsData} from '@/lib/data';

const ProposeTopicsInputSchema = z.object({
  goal: z.string().describe('The user\'s learning goal. e.g., "prepare for a job interview as a software engineer"'),
});
export type ProposeTopicsInput = z.infer<typeof ProposeTopicsInputSchema>;

const ProposeTopicsOutputSchema = z.object({
  topics: z.array(z.object({
    slug: z.string().describe('The slug of the suggested topic.'),
    reason: z.string().describe('A brief reason why this topic is being suggested.'),
  })).describe('A list of suggested topic slugs and the reason for the suggestion.'),
  response: z.string().describe('A friendly, conversational response to the user summarizing the suggestions.'),
});
export type ProposeTopicsOutput = z.infer<typeof ProposeTopicsOutputSchema>;

export async function proposeTopics(
  input: ProposeTopicsInput
): Promise<ProposeTopicsOutput> {
  return proposeTopicsFlow(input);
}

const allTopics = topicsData.map(t => ({ slug: t.slug, name: t.name, description: t.description }));

const prompt = ai.definePrompt({
  name: 'proposeTopicsPrompt',
  input: {schema: ProposeTopicsInputSchema},
  output: {schema: ProposeTopicsOutputSchema},
  prompt: `You are a helpful and friendly language learning assistant for an app called LinguaLeap.

Your goal is to help a user who is learning English. You need to analyze their learning goal and recommend a personalized set of learning topics from a predefined list.

The user's learning goal is: "{{goal}}"

Here are the available topics they can study:
${JSON.stringify(allTopics, null, 2)}

Based on the user's goal, select up to 4 of the most relevant topics. For each topic, provide a short, encouraging reason why it's a good choice for them.

Finally, write a brief, friendly, and encouraging response to the user that summarizes your recommendations. Address the user directly and tell them you've prepared some topics for them.
`,
});

const proposeTopicsFlow = ai.defineFlow(
  {
    name: 'proposeTopicsFlow',
    inputSchema: ProposeTopicsInputSchema,
    outputSchema: ProposeTopicsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    if (!output) {
      throw new Error('Could not generate topic proposal.');
    }
    // Filter out any hallucinated topics
    const validSlugs = allTopics.map(t => t.slug);
    output.topics = output.topics.filter(t => validSlugs.includes(t.slug));

    return output;
  }
);
