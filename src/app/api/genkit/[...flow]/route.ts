import defineNextPlugin from '@genkit-ai/next';
import '@/ai/genkit';

const nextPlugin = defineNextPlugin({
  flows: [
    'generateExampleSentenceFlow',
    'textToSpeechFlow',
    'generateLearningPlanFlow',
  ],
});

export const {GET, POST} = nextPlugin;
