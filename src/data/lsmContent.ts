/**
 * Contenido educativo LSM (Lengua de Señas Mexicana) — datos estáticos para frontend.
 * Los videos son rutas opcionales; si no existen, la UI usa placeholders.
 */

export type DictionaryCategoryId = 'abecedario' | 'numeros' | 'colores' | 'cuerpo';

export type DictionaryItem = {
  id: string;
  label: string;
  /** Ruta a video local o URL; vacío = solo placeholder */
  videoSrc: string;
};

export type DictionaryCategory = {
  id: DictionaryCategoryId;
  title: string;
  emoji: string;
  description: string;
  items: DictionaryItem[];
};

/** Alfabeto escolar mexicano incluye Ñ */
const ALFABETO =
  'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'.split('');

function makeLetterItems(): DictionaryItem[] {
  return ALFABETO.map((letra) => ({
    id: `letra-${letra}`,
    label: letra,
    videoSrc: `/videos/lsm/Letras/${letra}.mp4`,
  }));
}

function makeNumbers(): DictionaryItem[] {
  return Array.from({ length: 21 }, (_, n) => ({
    id: `num-${n}`,
    label: String(n),
    videoSrc: `/videos/lsm/Numeros/${n}.mp4`,
  }));
}

export const dictionaryCategories: DictionaryCategory[] = [
  {
    id: 'abecedario',
    title: 'Abecedario',
    emoji: '🔤',
    description: 'Letras de la A a la Z y la Ñ',
    items: makeLetterItems(),
  },
  {
    id: 'numeros',
    title: 'Números',
    emoji: '🔢',
    description: 'Del 0 al 20',
    items: makeNumbers(),
  },
  {
    id: 'colores',
    title: 'Colores',
    emoji: '🎨',
    description: 'Colores básicos',
    items: [
      { id: 'c-rojo', label: 'Rojo', videoSrc: '/videos/lsm/Colores/Rojo.mp4' },
      { id: 'c-azul', label: 'Azul', videoSrc: '/videos/lsm/Colores/Azul.mp4' },
      { id: 'c-verde', label: 'Verde', videoSrc: '/videos/lsm/Colores/Verde.mp4' },
      { id: 'c-amarillo', label: 'Amarillo', videoSrc: '/videos/lsm/Colores/Amarillo.mp4' },
      { id: 'c-naranja', label: 'Naranja', videoSrc: '/videos/lsm/Colores/Naranja.mp4' },
      { id: 'c-morado', label: 'Morado', videoSrc: '/videos/lsm/Colores/Morado.mp4' },
      { id: 'c-rosa', label: 'Rosa', videoSrc: '/videos/lsm/Colores/Rosa.mp4' },
      { id: 'c-negro', label: 'Negro', videoSrc: '/videos/lsm/Colores/Negro.mp4' },
      { id: 'c-blanco', label: 'Blanco', videoSrc: '/videos/lsm/Colores/Blanco.mp4' },
      { id: 'c-cafe', label: 'Café', videoSrc: '/videos/lsm/Colores/Cafe.mp4' },
      { id: 'c-gris', label: 'Gris', videoSrc: '/videos/lsm/Colores/Gris.mp4' },
    ],
  },
  {
    id: 'cuerpo',
    title: 'Partes del cuerpo',
    emoji: '🧒',
    description: 'Cabeza, manos y más',
    items: [
      { id: 'p-cabeza', label: 'Cabeza', videoSrc: '/videos/lsm/Cuerpo/Cabeza.mp4' },
      { id: 'p-ojos', label: 'Ojos', videoSrc: '/videos/lsm/Cuerpo/Ojos.mp4' },
      { id: 'p-nariz', label: 'Nariz', videoSrc: '/videos/lsm/Cuerpo/Nariz.mp4' },
      { id: 'p-cara', label: 'Cara', videoSrc: '/videos/lsm/Cuerpo/Cara.mp4' },
      { id: 'p-oreja', label: 'Oreja', videoSrc: '/videos/lsm/Cuerpo/Oreja.mp4' },
      { id: 'p-mano', label: 'Mano', videoSrc: '/videos/lsm/Cuerpo/Mano.mp4' },
      { id: 'p-brazo', label: 'Brazo', videoSrc: '/videos/lsm/Cuerpo/Brazo.mp4' },
      { id: 'p-pierna', label: 'Pierna', videoSrc: '/videos/lsm/Cuerpo/Pierna.mp4' },
      { id: 'p-pie', label: 'Pie', videoSrc: '/videos/lsm/Cuerpo/Pie.mp4' },
      { id: 'p-dedo', label: 'Dedo', videoSrc: '/videos/lsm/Cuerpo/Dedo.mp4' },
      { id: 'p-cuello', label: 'Cuello', videoSrc: '/videos/lsm/Cuerpo/Cuello.mp4' },
      { id: 'p-hombro', label: 'Hombro', videoSrc: '/videos/lsm/Cuerpo/Hombro.mp4' },
    ],
  },
];

export function getCategoryById(id: string): DictionaryCategory | undefined {
  return dictionaryCategories.find((c) => c.id === id);
}

/** Opción visual para modo práctica (emoji grande + id interno) */
export type PracticeOption = {
  id: string;
  emoji?: string;
  stars?: number;
  label?: string;
  alt: string;
  correct: boolean;
};

export type PracticeQuestion = {
  id: string;
  /** Lo que se está enseñando (para lectores de pantalla / título) */
  topic: string;
  signVideoSrc: string;
  prompt: string;
  options: PracticeOption[];
};

export type PracticeCategoryId = 'abecedario' | 'numeros' | 'colores' | 'cuerpo' | 'todo';

export type PracticeCategory = {
  id: PracticeCategoryId;
  title: string;
  emoji: string;
  description: string;
  questions: PracticeQuestion[];
};

type VisualWord = { emoji: string; word: string };

const DISTRACTOR_BANK: VisualWord[] = [
  { emoji: '🐶', word: 'Perro' },
  { emoji: '🌙', word: 'Luna' },
  { emoji: '🍓', word: 'Fresa' },
  { emoji: '🐱', word: 'Gato' },
  { emoji: '⚽', word: 'Pelota' },
  { emoji: '🚲', word: 'Bicicleta' },
  { emoji: '🌞', word: 'Sol' },
  { emoji: '🚗', word: 'Coche' },
];

const ABECEDARIO_CORRECT_WORDS: Record<string, VisualWord> = {
  A: { emoji: '✈️', word: 'Avión' },
  B: { emoji: '🚲', word: 'Bicicleta' },
  C: { emoji: '🏠', word: 'Casa' },
  D: { emoji: '🐬', word: 'Delfín' },
  E: { emoji: '🐘', word: 'Elefante' },
  F: { emoji: '🍓', word: 'Fresa' },
  G: { emoji: '🐱', word: 'Gato' },
  H: { emoji: '🍨', word: 'Helado' },
  I: { emoji: '🧲', word: 'Imán' },
  J: { emoji: '🦒', word: 'Jirafa' },
  K: { emoji: '🥝', word: 'Kiwi' },
  L: { emoji: '🦁', word: 'León' },
  M: { emoji: '🐒', word: 'Mono' },
  N: { emoji: '👶', word: 'Niño' },
  'Ñ': { emoji: '🍠', word: 'Ñame' },
  O: { emoji: '🐻', word: 'Oso' },
  P: { emoji: '🥔', word: 'Papa' },
  Q: { emoji: '🧀', word: 'Queso' },
  R: { emoji: '🐸', word: 'Rana' },
  S: { emoji: '🌞', word: 'Sol' },
  T: { emoji: '🐢', word: 'Tortuga' },
  U: { emoji: '🦄', word: 'Unicornio' },
  V: { emoji: '🐄', word: 'Vaca' },
  W: { emoji: '🛜', word: 'Wifi' },
  X: { emoji: '📻', word: 'Xilófono' },
  Y: { emoji: '🐴', word: 'Yegua' },
  Z: { emoji: '🦊', word: 'Zorro' },
};

function makeAbecedarioPracticeQuestions(): PracticeQuestion[] {
  return ALFABETO.map((letter) => {
    const correct = ABECEDARIO_CORRECT_WORDS[letter];
    const distractors = DISTRACTOR_BANK.filter(
      (item) => item.word[0].toUpperCase() !== letter && item.word !== correct.word
    ).slice(0, 3);

    return {
      id: `pq-${letter.toLowerCase()}`,
      topic: `Letra ${letter}`,
      signVideoSrc: `/videos/lsm/Letras/${letter}.mp4`,
      prompt: `¿Cuál palabra empieza con la letra ${letter}?`,
      options: shuffleArray([
        { id: 'o1', emoji: correct.emoji, alt: correct.word, correct: true },
        ...distractors.map((item, i) => ({
          id: `o${i + 2}`,
          emoji: item.emoji,
          alt: item.word,
          correct: false,
        })),
      ]),
    };
  });
}

function shuffleArray<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

const extraPracticeQuestions: PracticeQuestion[] = [
  {
    id: 'pq-3',
    topic: 'Número 3',
    signVideoSrc: '/videos/lsm/Numeros/3.mp4',
    prompt: '¿Cuántos objetos ves?',
    options: [
      { id: 'o1', emoji: '🍎', alt: 'Una manzana', correct: false },
      { id: 'o2', emoji: '🍎🍎🍎', alt: 'Tres manzanas', correct: true },
      { id: 'o3', emoji: '🍎🍎', alt: 'Dos manzanas', correct: false },
      { id: 'o4', emoji: '🍎🍎🍎🍎', alt: 'Cuatro manzanas', correct: false },
    ],
  },
  {
    id: 'pq-rojo',
    topic: 'Color rojo',
    signVideoSrc: '/videos/lsm/Colores/Rojo.mp4',
    prompt: '¿Qué color es la fresa?',
    options: [
      { id: 'o1', emoji: '🍓', alt: 'Fresa (rojo)', correct: true },
      { id: 'o2', emoji: '🫐', alt: 'Arándano', correct: false },
      { id: 'o3', emoji: '🍋', alt: 'Limón', correct: false },
      { id: 'o4', emoji: '🍇', alt: 'Uvas', correct: false },
    ],
  },
  {
    id: 'pq-mano',
    topic: 'Mano',
    signVideoSrc: '/videos/lsm/Cuerpo/Mano.mp4',
    prompt: '¿Con qué saludamos con la mano?',
    options: [
      { id: 'o1', emoji: '👋', alt: 'Mano saludando', correct: true },
      { id: 'o2', emoji: '🦶', alt: 'Pie', correct: false },
      { id: 'o3', emoji: '👂', alt: 'Oreja', correct: false },
      { id: 'o4', emoji: '👃', alt: 'Nariz', correct: false },
    ],
  },
  {
    id: 'pq-10',
    topic: 'Número 10',
    signVideoSrc: '/videos/lsm/Numeros/10.mp4',
    prompt: '¿Qué grupo muestra diez?',
    options: [
      { id: 'o1', emoji: '⭐'.repeat(8), alt: 'Ocho estrellas', correct: false },
      { id: 'o2', emoji: '⭐'.repeat(10), alt: 'Diez estrellas', correct: true },
      { id: 'o3', emoji: '⭐'.repeat(6), alt: 'Seis estrellas', correct: false },
      { id: 'o4', emoji: '⭐'.repeat(12), alt: 'Doce estrellas', correct: false },
    ],
  },
];

export const practiceQuestions: PracticeQuestion[] = [
  ...makeAbecedarioPracticeQuestions(),
  ...extraPracticeQuestions,
];

export const practiceCategories: PracticeCategory[] = [
  {
    id: 'abecedario',
    title: 'Abecedario',
    emoji: '🔤',
    description: 'Letras básicas para iniciar',
    questions: practiceQuestions.filter((q) => q.topic.toLowerCase().includes('letra')),
  },
  {
    id: 'numeros',
    title: 'Números',
    emoji: '🔢',
    description: 'Conteo y cantidades',
    questions: practiceQuestions.filter((q) => q.topic.toLowerCase().includes('número')),
  },
  {
    id: 'colores',
    title: 'Colores',
    emoji: '🎨',
    description: 'Identifica colores',
    questions: practiceQuestions.filter((q) => q.topic.toLowerCase().includes('color')),
  },
  {
    id: 'cuerpo',
    title: 'Partes del cuerpo',
    emoji: '🧒',
    description: 'Señas del cuerpo humano',
    questions: practiceQuestions.filter((q) => q.topic.toLowerCase().includes('mano')),
  },
  {
    id: 'todo',
    title: 'Todo mezclado',
    emoji: '🌟',
    description: 'Un poco de cada tema',
    questions: practiceQuestions,
  },
];

export function getPracticeCategoryById(id: string): PracticeCategory | undefined {
  return practiceCategories.find((c) => c.id === id);
}

/** Par para memorama: representación visual + “seña” (placeholder de video) */
export type MemoryPair = {
  id: string;
  label: string;
  pairEmoji: string;
  signVideoSrc: string;
};

export const memoryPairs: MemoryPair[] = [
  { id: 'm1', label: 'A', pairEmoji: '🅰️', signVideoSrc: '/videos/lsm/Letras/A.mp4' },
  { id: 'm2', label: 'L', pairEmoji: '🔤', signVideoSrc: '/videos/lsm/Letras/L.mp4' },
  { id: 'm3', label: 'S', pairEmoji: '✨', signVideoSrc: '/videos/lsm/Letras/S.mp4' },
  { id: 'm4', label: '5', pairEmoji: '5️⃣', signVideoSrc: '/videos/lsm/Numeros/5.mp4' },
  { id: 'm5', label: 'Rojo', pairEmoji: '❤️', signVideoSrc: '/videos/lsm/Colores/Rojo.mp4' },
  { id: 'm6', label: 'Mano', pairEmoji: '✋', signVideoSrc: '/videos/lsm/Cuerpo/Mano.mp4' },
];

/** Palabras cortas para ahorcado infantil (mayúsculas para botones) */
export type HangmanWord = {
  word: string;
  hintEmoji: string;
  hintText: string;
};

export const hangmanWords: HangmanWord[] = [
  { word: 'GATO', hintEmoji: '🐱', hintText: 'Animal que maulla' },
  { word: 'SOL', hintEmoji: '☀️', hintText: 'Brilla en el día' },
  { word: 'CASA', hintEmoji: '🏠', hintText: 'Donde vivimos' },
  { word: 'LUNA', hintEmoji: '🌙', hintText: 'Sale de noche' },
  { word: 'MANO', hintEmoji: '✋', hintText: 'Tiene cinco dedos' },
  { word: 'AZUL', hintEmoji: '💙', hintText: 'Color del cielo' },
];

/** Letras para teclado (español): sin ñ en estas palabras demo; incluimos Ñ por si amplías palabras */
export const HANGMAN_LETTERS = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'.split('');
