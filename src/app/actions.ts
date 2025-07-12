'use server';

import { generateExampleSentence } from '@/ai/flows/generate-example-sentence';
import type { Connection } from '@/lib/data';

export async function getAIExample(connection: Omit<Connection, 'id' | 'slug'>) {
  try {
    const result = await generateExampleSentence({
      spanishWord: connection.spanish,
      englishWord: connection.english,
      mnemonicConnection: connection.mnemonic,
    });
    return { success: true, example: result.exampleSentence };
  } catch (error) {
    console.error('AI example generation failed:', error);
    return { success: false, error: 'Failed to generate a new example. Please try again.' };
  }
}
