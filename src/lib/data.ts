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
    name: 'Viajes',
    slug: 'viajes',
    description: 'Palabras esenciales para tu próxima aventura.',
    connections: [
      {
        id: 1,
        spanish: 'Maleta',
        english: 'Suitcase',
        mnemonic: 'En mi maleta llevo un "sweet case" (estuche dulce) para los caramelos del viaje.',
        explanation: 'Imagina que dentro de tu maleta, lo más importante que guardas es un estuche (case) lleno de dulces (sweet). La combinación "sweet case" suena muy parecido a "suitcase".',
        example: 'Please, pack the "sweet case" in my suitcase before we leave.',
        slug: 'maleta-suitcase'
      },
      {
        id: 2,
        spanish: 'Boleto',
        english: 'Ticket',
        mnemonic: 'Para subir al avión, te "pican" (tick) el boleto.',
        explanation: 'Asocia el sonido "tick" de ticket con la acción de que te "piquen" o perforen el boleto antes de embarcar.',
        example: 'They have to "tick" your ticket at the gate.',
        slug: 'boleto-ticket'
      },
    ],
  },
  {
    name: 'Trabajo',
    slug: 'trabajo',
    description: 'Vocabulario útil para el entorno profesional.',
    connections: [
      {
        id: 3,
        spanish: 'Reunión',
        english: 'Meeting',
        mnemonic: 'En la reunión, el jefe te "mide" (meet) el rendimiento.',
        explanation: 'Piensa que el propósito de una reunión de trabajo es "medir" tu desempeño. El sonido de "mide" en español se parece a "meet" en "meeting".',
        example: 'In the next meeting, the boss will measure our performance.',
        slug: 'reunion-meeting'
      },
      {
        id: 4,
        spanish: 'Correo',
        english: 'Mail',
        mnemonic: 'El correo de hoy trae "maíz" (mail).',
        explanation: 'Imagina una carta o paquete que, en lugar de papeles, contiene granos de maíz. La palabra "maíz" suena casi idéntica a "mail".',
        example: 'I received some corn (maíz) in the mail today.',
        slug: 'correo-mail'
      },
    ]
  },
  {
    name: 'Tecnología',
    slug: 'tecnologia',
    description: 'Palabras para el mundo digital y los gadgets.',
    connections: [
      {
        id: 5,
        spanish: 'Pantalla',
        english: 'Screen',
        mnemonic: '¡Qué "escándalo" (screen) se ve en esa pantalla!',
        explanation: 'Asocia el sonido de "screen" con la palabra "escándalo", imaginando una escena muy llamativa en una pantalla.',
        example: 'What an "escándalo" is showing on that screen!',
        slug: 'pantalla-screen'
      },
      {
        id: 6,
        spanish: 'Teclado',
        english: 'Keyboard',
        mnemonic: 'Con el teclado, "clavo" (key) las letras en el "tablero" (board).',
        explanation: 'Descompón "keyboard" en "key" (llave/clavo) y "board" (tablero). Imagina que cada tecla es un clavo que pones en un tablero.',
        example: 'I use the keyboard to put the "key" on the "board".',
        slug: 'teclado-keyboard'
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
