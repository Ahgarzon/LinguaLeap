'use server';

import { generateExampleSentence } from '@/ai/flows/generate-example-sentence';
import { proposeTopics, type ProposeTopicsOutput } from '@/ai/flows/propose-topics';
import { textToSpeech } from '@/ai/flows/text-to-speech';
import type { Connection } from '@/lib/data';

export async function getAIExample(connection: Omit<Connection, 'id' | 'slug' | 'phonetic_spelling'>) {
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

export async function getPronunciation(text: string) {
  try {
    const result = await textToSpeech({ text });
    return { success: true, audioDataUri: result.audioDataUri };
  } catch (error) {
    console.error('Text-to-speech generation failed:', error);
    return { success: false, error: 'Failed to generate pronunciation. Please try again.' };
  }
}

export async function getTopicSuggestions(goal: string): Promise<{ success: boolean; data?: ProposeTopicsOutput; error?: string }> {
    if (!goal) {
        return { success: false, error: "Please provide a learning goal." };
    }
    try {
        const result = await proposeTopics({ goal });
        return { success: true, data: result };
    } catch (error) {
        console.error('Topic suggestion failed:', error);
        return { success: false, error: 'Sorry, I had trouble coming up with ideas. Please try again.' };
    }
}
