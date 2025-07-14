import {genkit, GenerationCommonConfig, configureGenkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';
import {defineNextPlugin} from '@genkit-ai/next';

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

configureGenkit({
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
  flowStateStore: 'firebase',
  traceStore: 'firebase',
  enableTracingAndMetrics: true,
  logLevel: 'debug',
  defaultModelConfig: {
    safetySettings,
  },
});

export const ai = genkit({
    model: 'googleai/gemini-2.0-flash',
});
