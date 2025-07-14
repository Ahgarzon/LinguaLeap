'use server';

import { generateExampleSentence } from '@/ai/flows/generate-example-sentence';
import { generateLearningPlan, type GenerateLearningPlanOutput } from '@/ai/flows/generate-learning-plan';
import { textToSpeech } from '@/ai/flows/text-to-speech';
import type { Connection, UserLevel } from '@/lib/data';

export async function getAIExample(connection: Omit<Connection, 'id' | 'slug' | 'phonetic_spelling' | 'level'>) {
  try {
    const result = await generateExampleSentence({
      spanishWord: connection.spanish,
      englishWord: connection.english,
      mnemonicConnection: connection.mnemonic,
    });
    return { success: true, example: result.exampleSentence };
  } catch (error) {
    console.error('AI example generation failed:', error);
    let errorMessage = 'An unknown error occurred.';
    if (error instanceof Error) {
        if (error.message.includes('quota')) {
            errorMessage = 'Sorry, the request limit for generating examples has been reached for today. Please try again tomorrow.';
        } else {
            errorMessage = error.message;
        }
    }
    return { success: false, error: `Failed to generate a new example. Reason: ${errorMessage}` };
  }
}

export async function getPronunciation(text: string) {
  try {
    const result = await textToSpeech({ text });
    return { success: true, audioDataUri: result.audioDataUri };
  } catch (error) {
    console.error('Text-to-speech generation failed:', error);
    let errorMessage = 'An unknown error occurred.';
    if (error instanceof Error) {
        if (error.message.toLowerCase().includes('quota')) {
            errorMessage = 'The daily limit for pronunciations has been reached. Please try again tomorrow.';
        } else {
            errorMessage = error.message;
        }
    }
    return { success: false, error: `Failed to generate pronunciation. Reason: ${errorMessage}` };
  }
}

export async function getLearningPlan(goal: string, level: UserLevel, nativeLanguage: string): Promise<{ success: boolean; data?: GenerateLearningPlanOutput; error?: string }> {
    if (!goal) {
        return { success: false, error: "Please provide a learning goal." };
    }
    if (!nativeLanguage) {
        return { success: false, error: "Please set your native language in your profile first." };
    }
    try {
        const result = await generateLearningPlan({ goal, currentLevel: level, nativeLanguage });
        return { success: true, data: result };
    } catch (error) {
        console.error('Learning plan generation failed:', error);
        let errorMessage = 'An unknown error occurred.';
        if (error instanceof Error) {
            if (error.message.toLowerCase().includes('quota')) {
                errorMessage = 'Sorry, I have reached my idea generation limit for today. Please try again tomorrow.';
            } else {
                errorMessage = error.message;
            }
        }
        return { success: false, error: `Sorry, I had trouble coming up with ideas. Reason: ${errorMessage}` };
    }
}
