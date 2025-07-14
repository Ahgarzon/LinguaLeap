'use server';

import {genkit, GenerationCommonConfig} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';
import defineNextPlugin from '@genkit-ai/next';

const safetySettings: GenerationCommonConfig['safetySettings'] = [
  {
    category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
    threshold: 'BLOCK_NONE',
  },
  {
    category: 'HARM_CATEGORY_HATE_SPEECH',
    threshold: 'BLOCK_NONE',
  },
  {
    category: 'HARM_CATEGORY_HARASSMENT',
    threshold: 'BLOCK_NONE',
  },
  {
    category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
    threshold: 'BLOCK_NONE',
  },
];

export const ai = genkit({
  plugins: [
    googleAI(),
    defineNextPlugin({
      // These flows will be available as API endpoints
      flows: [
        'generateExampleSentenceFlow',
        'textToSpeechFlow',
        'generateLearningPlanFlow',
      ],
    }),
  ],
  logSinks: [],
  enableTracingAndMetrics: true,
  defaultModel: 'googleai/gemini-2.0-flash',
  defaultModelConfig: {
    safetySettings,
  },
});
