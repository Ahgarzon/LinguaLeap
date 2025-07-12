export type Connection = {
  id: number;
  spanish: string;
  english: string;
  mnemonic: string;
  explanation: string;
  example: string;
  slug: string;
};

export type Topic = {
  name: string;
  slug: string;
  description: string;
  connections: Connection[];
};

export const topicsData: Topic[] = [
  {
    name: 'Everyday Objects',
    slug: 'everyday-objects',
    description: 'Common items you see and use daily.',
    connections: [
      {
        id: 1,
        spanish: 'Tenedor',
        english: 'Fork',
        mnemonic: '"Tenedor" sounds like "ten door". Imagine a fork with ten doors on it.',
        explanation: 'The unusual image of a fork having ten tiny doors helps to link the sound of "tenedor" with its meaning, "fork".',
        example: 'To eat the salad, I need a tenedor, not one with a "ten door" design, just a normal fork.',
        slug: 'tenedor-fork'
      },
      {
        id: 2,
        spanish: 'Cuchillo',
        english: 'Knife',
        mnemonic: '"Cuchillo" sounds like "coo-chee-yo". Imagine a pigeon (coo) on your cheek (chee) that you have to gently shoo away with a knife (yo!).',
        explanation: 'This creates a short, memorable story that connects the sounds in "cuchillo" to the object, a knife.',
        example: 'I saw a "coo" on my "chee", so "yo" used the cuchillo to cut the apple, not to scare the bird.',
        slug: 'cuchillo-knife'
      },
    ],
  },
  {
    name: 'Food & Dining',
    slug: 'food-dining',
    description: 'Vocabulary for the kitchen and your favorite meals.',
    connections: [
      {
        id: 3,
        spanish: 'Cebolla',
        english: 'Onion',
        mnemonic: '"Cebolla" sounds like "say boy-ya!". You shout "Boy-ya!" when you successfully chop an onion without crying.',
        explanation: 'This links the triumphant shout "say boy-ya!" to the challenging task of cutting an onion, helping you remember "cebolla".',
        example: 'After chopping the cebolla, I wanted to shout "say boy-ya!" because my eyes didn\'t water.',
        slug: 'cebolla-onion'
      },
      {
        id: 4,
        spanish: 'Pan',
        english: 'Bread',
        mnemonic: 'Both "pan" (Spanish) and "pan" (English, for cooking) are used for making food. You bake bread in a pan.',
        explanation: 'This uses a direct link between the Spanish word and an English word that sounds the same and is related in context (cooking).',
        example: 'I will bake the pan (bread) in a frying pan.',
        slug: 'pan-bread'
      },
    ]
  },
  {
    name: 'Travel & Directions',
    slug: 'travel-directions',
    description: 'Essential words for navigating a new place.',
    connections: [
      {
        id: 5,
        spanish: 'Derecha',
        english: 'Right',
        mnemonic: '"Derecha" sounds like "the wretch". The wicked witch is always on the right side of the path.',
        explanation: 'This creates a character-based story to associate "derecha" with the direction "right".',
        example: 'Follow the path, but be careful of "the wretch" on the derecha (right) side.',
        slug: 'derecha-right'
      },
      {
        id: 6,
        spanish: 'Izquierda',
        english: 'Left',
        mnemonic: '"Izquierda" sounds like "is scary". The left path is always the scary one in horror movies.',
        explanation: 'This mnemonic uses a common movie trope to connect the sound of "izquierda" with the direction "left".',
        example: 'He said the path to the left "is scary" and dark, and it was the one on the izquierda (left).',
        slug: 'izquierda-left'
      },
    ]
  },
];

export const getAllConnections = () => topicsData.flatMap(topic => topic.connections);
export const getTopicBySlug = (slug: string) => topicsData.find(topic => topic.slug === slug);
export const getConnectionBySlug = (topicSlug: string, connectionSlug: string) => {
  const topic = getTopicBySlug(topicSlug);
  if (!topic) return null;
  const connection = topic.connections.find(conn => conn.slug === connectionSlug);
  if (!connection) return null;
  return { ...connection, topicName: topic.name, topicSlug: topic.slug };
}
