import type { UserLevel } from "@/hooks/use-user";

export type Connection = {
  id: number;
  spanish: string;
  english: string;
  mnemonic: string;
  phonetic_spelling: string;
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
        phonetic_spelling: 'sut-keis',
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
        phonetic_spelling: 'ti-ket',
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
        phonetic_spelling: 'kos-toms',
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
        phonetic_spelling: 'ai-ti-ne-ra-ri',
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
        phonetic_spelling: 'stei o-ver-nait',
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
        phonetic_spelling: 'mi-ting',
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
        phonetic_spelling: 'meil',
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
        phonetic_spelling: 'ded-lain',
        explanation: 'Asocia la idea de un plazo final con una "línea mortal" que no puedes cruzar. Es una exageración que ayuda a recordar la urgencia.',
        example: 'I have to finish this report before the deadline, or I\'m dead!',
        slug: 'plazo-deadline',
        level: 'intermediate'
      },
      {
        id: 202,
        spanish: 'Apalancamiento',
        english: 'Leverage',
        mnemonic: 'Usa una "leva" (lever) para levantar tu "era" (age) de prosperidad.',
        phonetic_spelling: 'le-ve-redch',
        explanation: 'Descompón "leverage" en "lever" (palanca) y "age" (era). Imagina usar una palanca financiera para iniciar una nueva era de éxito en los negocios.',
        example: 'Use financial leverage wisely to start a new age of prosperity.',
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
        phonetic_spelling: 'skrin',
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
        phonetic_spelling: 'ki-bord',
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
        phonetic_spelling: 'ap-loud',
        explanation: 'Literalmente, "upload" significa "cargar hacia arriba". Asocia "up" con la dirección y "load" con la acción de cargar.',
        example: 'Go up and manage the server load, then you can upload the file.',
        slug: 'subir-upload',
        level: 'intermediate'
      },
      {
        id: 203,
        spanish: 'Ancho de Banda',
        english: 'Bandwidth',
        mnemonic: 'La "banda" de rock necesita un escenario "ancho" (width) para transmitir todos sus datos.',
        phonetic_spelling: 'band-widz',
        explanation: 'Imagina una "banda" de música que necesita un escenario muy "ancho" ("width") para poder transmitir toda su música (datos) sin problemas. Un escenario más ancho permite que más datos fluyan, al igual que el ancho de banda.',
        example: 'The rock band needs more stage width to stream their concert; we need more bandwidth.',
        slug: 'ancho-de-banda-bandwidth',
        level: 'advanced'
      },
    ]
  },
  {
    name: 'Desarrollo de Software',
    slug: 'desarrollo-software',
    description: 'Términos técnicos para programadores y desarrolladores.',
    connections: [
      {
        id: 301,
        spanish: 'Variable',
        english: 'Variable',
        mnemonic: 'Una variable es "variable", ¡puede cambiar!',
        phonetic_spelling: 'ver-i-a-bol',
        explanation: 'La palabra es casi idéntica. Simplemente recuerda que en programación, una variable puede contener valores que varían.',
        example: 'In programming, a variable is a container for a value that is variable.',
        slug: 'variable-variable',
        level: 'beginner'
      },
      {
        id: 302,
        spanish: 'Depurar',
        english: 'Debug',
        mnemonic: 'Para depurar, tienes que quitarle el "bicho" (bug) al código.',
        phonetic_spelling: 'di-bag',
        explanation: '"Bug" en inglés significa "bicho" o "insecto". Depurar ("debug") es el proceso de encontrar y eliminar estos "bichos" o errores del software.',
        example: 'I need to find the bug in the code to debug the application.',
        slug: 'depurar-debug',
        level: 'intermediate'
      },
      {
        id: 303,
        spanish: 'Compilar',
        english: 'Compile',
        mnemonic: 'Para compilar, "con" "pila" de archivos haces uno solo.',
        phonetic_spelling: 'com-pail',
        explanation: 'Imagina que "compilar" es juntar "con" una "pila" de archivos de código fuente para crear un único archivo ejecutable.',
        example: 'I will compile the code with this pile of files.',
        slug: 'compilar-compile',
        level: 'intermediate'
      },
      {
        id: 304,
        spanish: 'Repositorio',
        english: 'Repository',
        phonetic_spelling: 're-po-si-to-ri',
        mnemonic: 'El "repo" es donde "se torean" los grandes códigos.',
        explanation: 'Usa la abreviatura común "repo" para "repository". Imagina un lugar donde los programadores valientes "torean" o manejan código complejo.',
        example: 'The best coders are chosen to work in this repository.',
        slug: 'repositorio-repository',
        level: 'advanced'
      },
    ]
  },
  {
    name: 'Entrevista de Trabajo',
    slug: 'entrevista-trabajo',
    description: 'Frases y palabras clave para tener éxito en una entrevista.',
    connections: [
      {
        id: 401,
        spanish: 'Fortalezas',
        english: 'Strengths',
        mnemonic: 'Mis fortalezas son tan largas como una "trenza" (strengths).',
        phonetic_spelling: 'strengz',
        explanation: 'La pronunciación de "strengths" puede ser difícil. Asóciala con la imagen de una trenza fuerte y larga, que representa tus múltiples fortalezas.',
        example: 'My list of strengths is as long as a braid (trenza).',
        slug: 'fortalezas-strengths',
        level: 'intermediate'
      },
      {
        id: 402,
        spanish: 'Debilidades',
        english: 'Weaknesses',
        mnemonic: 'Mis debilidades son "huecas" (weak) y las confieso esta "semana" (ness).',
        phonetic_spelling: 'wik-ne-ses',
        explanation: '"Weak" suena como "hueco" en español (algo sin fuerza). Imagina que esta semana tienes que rellenar esas debilidades huecas.',
        example: 'My weaknesses are weak, but I will work on them this week.',
        slug: 'debilidades-weaknesses',
        level: 'intermediate'
      },
      {
        id: 403,
        spanish: 'Logro',
        english: 'Achievement',
        mnemonic: 'Para "archivar" (achieve) un logro, necesitas un buen "mento" (mentor).',
        phonetic_spelling: 'a-chiv-ment',
        explanation: 'Divide "achievement" en "achieve" (que suena como archivar) y "ment". Imagina que archivas tus logros gracias a un mentor.',
        example: 'To archive this achievement, I had the help of a great mentor.',
        slug: 'logro-achievement',
        level: 'advanced'
      },
    ]
  },
  {
    name: 'Comida',
    slug: 'comida',
    description: 'Vocabulario para pedir comida y hablar de ingredientes.',
    connections: [
      {
        id: 501,
        spanish: 'Tenedor',
        english: 'Fork',
        mnemonic: 'Para la carne de "puerco" (pork), uso el tenedor.',
        phonetic_spelling: 'fork',
        explanation: 'La palabra "fork" suena muy similar a "pork" (cerdo en inglés). Imagina que siempre usas un tenedor para comer cerdo.',
        example: 'I need a fork for this delicious pork.',
        slug: 'tenedor-fork',
        level: 'beginner'
      },
       {
        id: 502,
        spanish: 'Cuchara',
        english: 'Spoon',
        mnemonic: 'La sopa "es púnica" y se come con cuchara.',
        phonetic_spelling: 'spun',
        explanation: 'Imagina una sopa histórica, de la época de las guerras púnicas. "Es púnica" suena como "spoon".',
        example: 'This soup is Punic, so I will eat it with a spoon.',
        slug: 'cuchara-spoon',
        level: 'beginner'
      },
    ],
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
        phonetic_spelling: 'in-vois',
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
        phonetic_spelling: 'sher-hol-der',
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
        phonetic_spelling: 'e-sei',
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
        phonetic_spelling: 'zi-sis',
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
        phonetic_spelling: 'no-ledch',
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
        phonetic_spelling: 'in-sait',
        explanation: 'Descompón "insight": "in" (dentro) y "sight" (vista). Tener perspicacia es la capacidad de ver dentro de un problema.',
        example: 'To gain insight, you must look in and use your inner sight.',
        slug: 'perspicacia-insight',
        level: 'advanced'
      }
    ]
  }
];

export const getAllConnections = (userTopics?: Topic[]) => (userTopics || topicsData).flatMap(topic => topic.connections);
export const getTopicBySlug = (slug: string, userTopics?: Topic[]) => (userTopics || topicsData).find(topic => topic.slug === slug);
export const getConnectionBySlug = (topicSlug: string, connectionSlug: string, userTopics?: Topic[]) => {
  const sourceTopics = userTopics || topicsData;
  const topic = getTopicBySlug(topicSlug, sourceTopics);
  if (!topic) return null;
  const connection = topic.connections.find(conn => conn.slug === connectionSlug);
  if (!connection) return null;
  return { ...connection, topicName: topic.name, topicSlug: topic.slug };
}
