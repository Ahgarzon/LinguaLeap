import type { UserLevel } from "@/hooks/use-user";

export type Connection = {
  id: number;
  spanish: string;
  english: string;
  mnemonic: string;
  explanation: string;
  example: string;
  slug: string;
  level: UserLevel;
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
        mnemonic: 'Mi "suite" de hotel es tan grande que la uso como "case" (estuche) para la ropa.',
        explanation: 'Imagina una suite de hotel (suite) que usas como estuche gigante (case). La combinación "suite case" te recordará a "suitcase".',
        example: 'My hotel suite is the perfect case for my clothes, I should pack my suitcase.',
        slug: 'maleta-suitcase',
        level: 'beginner'
      },
      {
        id: 2,
        spanish: 'Boleto',
        english: 'Ticket',
        mnemonic: 'Para subir al avión, te "pican" (tick) el boleto.',
        explanation: 'Asocia el sonido "tick" de ticket con la acción de que te "piquen" o perforen el boleto antes de embarcar.',
        example: 'They have to "tick" your ticket at the gate.',
        slug: 'boleto-ticket',
        level: 'beginner'
      },
      {
        id: 101,
        spanish: 'Aduana',
        english: 'Customs',
        mnemonic: 'En la aduana, revisan tus "costumbres" y las de tus maletas.',
        explanation: 'La palabra "customs" en inglés también significa "costumbres" o "tradiciones". Imagina que el oficial de aduanas es muy curioso sobre tus costumbres personales.',
        example: 'Tell the customs officer about your local customs when you travel.',
        slug: 'aduana-customs',
        level: 'intermediate'
      },
      {
        id: 102,
        spanish: 'Itinerario',
        english: 'Itinerary',
        mnemonic: 'Si "it" (eso) no está en el "itinerario", ¡no vamos!',
        explanation: 'Usa la frase en spanglish para recordar que el plan de viaje es estricto. "It" en inglés suena como el inicio de "itinerario".',
        example: 'If "it" is not on the itinerary, we are not going.',
        slug: 'itinerario-itinerary',
        level: 'intermediate'
      },
      {
        id: 201,
        spanish: 'Pernoctar',
        english: 'Stay overnight',
        mnemonic: 'El caballero ("knight") se quedó a "pernoctar" en el castillo.',
        explanation: 'La palabra "night" (noche) está dentro de "overnight". Asóciala con un caballero (knight) que pasa la noche en un lugar.',
        example: 'The brave knight decided to stay overnight in the haunted castle.',
        slug: 'pernoctar-stay-overnight',
        level: 'advanced'
      }
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
        mnemonic: 'En la reunión, el jefe "mide" tu rendimiento con "ting" tings (campanitas).',
        explanation: 'Piensa que el propósito de una reunión de trabajo es "medir" tu desempeño. El sonido de "mide" en español se parece a "meet" y "ting" a una campana que suena.',
        example: 'In the next meeting, the boss will "mide" (measure) our performance with a "ting".',
        slug: 'reunion-meeting',
        level: 'beginner'
      },
      {
        id: 4,
        spanish: 'Correo',
        english: 'Mail',
        mnemonic: 'El correo de hoy trae "maíz" (mail).',
        explanation: 'Imagina una carta o paquete que, en lugar de papeles, contiene granos de maíz. La palabra "maíz" suena casi idéntica a "mail".',
        example: 'I received some corn (maíz) in the mail today.',
        slug: 'correo-mail',
        level: 'beginner'
      },
      {
        id: 103,
        spanish: 'Plazo',
        english: 'Deadline',
        mnemonic: 'Si no cumples el plazo, la línea de tu vida estará "muerta" (dead line).',
        explanation: 'Asocia la idea de un plazo final con una "línea mortal" que no puedes cruzar. Es una exageración que ayuda a recordar la urgencia.',
        example: 'I have to finish this report before the deadline, or I\'m dead!',
        slug: 'plazo-deadline',
        level: 'intermediate'
      },
      {
        id: 202,
        spanish: 'Apalancamiento',
        english: 'Leverage',
        mnemonic: 'Con una buena "leva" (lever), "envejeces" (age) con más riqueza.',
        explanation: 'Descompón "leverage" en "lever" (palanca) y "age" (edad). Imagina que usar una palanca financiera te permite tener una mejor vejez.',
        example: 'Use financial leverage wisely to secure your old age.',
        slug: 'apalancamiento-leverage',
        level: 'advanced'
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
        mnemonic: '¡Qué "escándalo" con tanto "cream" (crema) en la pantalla!',
        explanation: 'Asocia el sonido de "screen" con la palabra "escándalo" y "cream" (crema), imaginando una pantalla totalmente manchada de crema.',
        example: 'It\'s a scandal! Someone put ice cream all over the new screen.',
        slug: 'pantalla-screen',
        level: 'beginner'
      },
      {
        id: 6,
        spanish: 'Teclado',
        english: 'Keyboard',
        mnemonic: 'Con el teclado, uso la "llave" (key) en el "tablero" (board).',
        explanation: 'Descompón "keyboard" en "key" (llave) y "board" (tablero). Imagina que cada tecla es una llave que abre una letra en un tablero.',
        example: 'I use the key to type on the board with my keyboard.',
        slug: 'teclado-keyboard',
        level: 'beginner'
      },
      {
        id: 104,
        spanish: 'Subir (archivos)',
        english: 'Upload',
        mnemonic: '"Up" (arriba) en la "load" (carga). ¡Súbelo a la nube!',
        explanation: 'Literalmente, "upload" significa "cargar hacia arriba". Asocia "up" con la dirección y "load" con la acción de cargar.',
        example: 'Go up and manage the server load, then you can upload the file.',
        slug: 'subir-upload',
        level: 'intermediate'
      },
      {
        id: 203,
        spanish: 'Ancho de Banda',
        english: 'Bandwidth',
        mnemonic: 'El ancho de la "banda" de rock determina cuántos datos pueden tocar.',
        explanation: 'Piensa en una banda de música ("band") y el "ancho" ("width") de su escenario. Un escenario más ancho permite que más músicos (datos) toquen a la vez.',
        example: 'The rock band needs more stage width to handle this much data, we need more bandwidth.',
        slug: 'ancho-de-banda-bandwidth',
        level: 'advanced'
      },
    ]
  },
  {
    name: 'Negocios',
    slug: 'negocios',
    description: 'Términos clave para el mundo de los negocios.',
    connections: [
      {
        id: 105,
        spanish: 'Factura',
        english: 'Invoice',
        mnemonic: 'En la factura, "in" (dentro) está mi "voz" (voice) de queja por el precio.',
        explanation: 'Imagina que dentro ("in") de cada factura que emites, grabas un mensaje de voz ("voice") explicando los cargos. "In" + "voice" = "invoice".',
        example: 'In this invoice, I want to include my voice complaining about the price.',
        slug: 'factura-invoice',
        level: 'intermediate'
      },
      {
        id: 204,
        spanish: 'Accionista',
        english: 'Shareholder',
        mnemonic: 'Un accionista "comparte" (share) la carga y "sostiene" (hold) la empresa.',
        explanation: '"Shareholder" se compone de "share" (acción, compartir) y "holder" (el que sostiene). El accionista comparte los riesgos y sostiene la compañía.',
        example: 'A good shareholder must share the responsibilities and hold the company line.',
        slug: 'accionista-shareholder',
        level: 'advanced'
      }
    ]
  },
  {
    name: 'Academia',
    slug: 'academia',
    description: 'Vocabulario para estudiantes y académicos.',
    connections: [
      {
        id: 106,
        spanish: 'Ensayo',
        english: 'Essay',
        mnemonic: '"Ese" (esse) ensayo es sobre "mí" (say)... ¡mentira!',
        explanation: 'Juega con la pronunciación de "essay". Suena como "ese" en español. Imagina que estás escribiendo un ensayo sobre "ese" tema.',
        example: '"Ese" essay is not about what you say.',
        slug: 'ensayo-essay',
        level: 'intermediate'
      },
      {
        id: 205,
        spanish: 'Tesis',
        english: 'Thesis',
        mnemonic: 'Mi tesis es tan importante como "la tesis" de un detective.',
        explanation: 'La palabra es casi idéntica en ambos idiomas, pero en inglés se pronuncia "zisis". La conexión es directa.',
        example: 'My thesis is as important as a detective\'s thesis.',
        slug: 'tesis-thesis',
        level: 'advanced'
      }
    ]
  },
  {
    name: 'Conceptos Abstractos',
    slug: 'conceptos-abstractos',
    description: 'Palabras para ideas y pensamientos complejos.',
    connections: [
      {
        id: 107,
        spanish: 'Conocimiento',
        english: 'Knowledge',
        mnemonic: '"No" (know) tendrás "ventaja" (ledge) si no tienes conocimiento.',
        explanation: 'Divide "knowledge" en "know" (saber/no) y "ledge" (borde/ventaja). Sin saber ("know"), no tienes una ventaja ("ledge") sobre los demás.',
        example: 'You will have no edge if you have no knowledge.',
        slug: 'conocimiento-knowledge',
        level: 'intermediate'
      },
      {
        id: 206,
        spanish: 'Perspicacia',
        english: 'Insight',
        mnemonic: 'Para tener perspicacia, mira "adentro" (in) de la "vista" (sight).',
        explanation: 'Descompón "insight": "in" (dentro) y "sight" (vista). Tener perspicacia es la capacidad de ver dentro de un problema.',
        example: 'To gain insight, you must look in and use your inner sight.',
        slug: 'perspicacia-insight',
        level: 'advanced'
      }
    ]
  }
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
