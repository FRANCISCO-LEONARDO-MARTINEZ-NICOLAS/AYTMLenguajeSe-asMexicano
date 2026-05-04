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
    videoSrc: `/videos/lsm/letra-${letra.toLowerCase()}.mp4`,
  }));
}

function makeNumbers(): DictionaryItem[] {
  return Array.from({ length: 21 }, (_, n) => ({
    id: `num-${n}`,
    label: String(n),
    videoSrc: `/videos/lsm/numero-${n}.mp4`,
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
      { id: 'c-rojo', label: 'Rojo', videoSrc: '/videos/lsm/color-rojo.mp4' },
      { id: 'c-azul', label: 'Azul', videoSrc: '/videos/lsm/color-azul.mp4' },
      { id: 'c-verde', label: 'Verde', videoSrc: '/videos/lsm/color-verde.mp4' },
      { id: 'c-amarillo', label: 'Amarillo', videoSrc: '/videos/lsm/color-amarillo.mp4' },
      { id: 'c-naranja', label: 'Naranja', videoSrc: '/videos/lsm/color-naranja.mp4' },
      { id: 'c-morado', label: 'Morado', videoSrc: '/videos/lsm/color-morado.mp4' },
      { id: 'c-rosa', label: 'Rosa', videoSrc: '/videos/lsm/color-rosa.mp4' },
      { id: 'c-negro', label: 'Negro', videoSrc: '/videos/lsm/color-negro.mp4' },
      { id: 'c-blanco', label: 'Blanco', videoSrc: '/videos/lsm/color-blanco.mp4' },
      { id: 'c-cafe', label: 'Café', videoSrc: '/videos/lsm/color-cafe.mp4' },
      { id: 'c-gris', label: 'Gris', videoSrc: '/videos/lsm/color-gris.mp4' },
    ],
  },
  {
    id: 'cuerpo',
    title: 'Partes del cuerpo',
    emoji: '🧒',
    description: 'Cabeza, manos y más',
    items: [
      { id: 'p-cabeza', label: 'Cabeza', videoSrc: '/videos/lsm/cabeza.mp4' },
      { id: 'p-ojos', label: 'Ojos', videoSrc: '/videos/lsm/ojos.mp4' },
      { id: 'p-nariz', label: 'Nariz', videoSrc: '/videos/lsm/nariz.mp4' },
      { id: 'p-boca', label: 'Boca', videoSrc: '/videos/lsm/boca.mp4' },
      { id: 'p-orejas', label: 'Orejas', videoSrc: '/videos/lsm/orejas.mp4' },
      { id: 'p-manos', label: 'Manos', videoSrc: '/videos/lsm/manos.mp4' },
      { id: 'p-brazos', label: 'Brazos', videoSrc: '/videos/lsm/brazos.mp4' },
      { id: 'p-piernas', label: 'Piernas', videoSrc: '/videos/lsm/piernas.mp4' },
      { id: 'p-pies', label: 'Pies', videoSrc: '/videos/lsm/pies.mp4' },
      { id: 'p-dedos', label: 'Dedos', videoSrc: '/videos/lsm/dedos.mp4' },
      { id: 'p-cuello', label: 'Cuello', videoSrc: '/videos/lsm/cuello.mp4' },
    ],
  },
];

export function getCategoryById(id: string): DictionaryCategory | undefined {
  return dictionaryCategories.find((c) => c.id === id);
}

/** Opción visual para modo práctica (emoji grande + id interno) */
export type PracticeOption = {
  id: string;
  emoji: string;
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

export const practiceQuestions: PracticeQuestion[] = [
  {
    id: 'pq-a',
    topic: 'Letra A',
    signVideoSrc: '/videos/lsm/practica-letra-a.mp4',
    prompt: '¿Qué opción empieza con la letra A?',
    options: [
      { id: 'o1', emoji: '✈️', alt: 'Avión', correct: true },
      { id: 'o2', emoji: '🌳', alt: 'Árbol', correct: false },
      { id: 'o3', emoji: '💍', alt: 'Anillo', correct: false },
      { id: 'o4', emoji: '🍌', alt: 'Banana', correct: false },
    ],
  },
  {
    id: 'pq-3',
    topic: 'Número 3',
    signVideoSrc: '/videos/lsm/practica-num-3.mp4',
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
    signVideoSrc: '/videos/lsm/practica-rojo.mp4',
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
    signVideoSrc: '/videos/lsm/practica-mano.mp4',
    prompt: '¿Con qué saludamos con la mano?',
    options: [
      { id: 'o1', emoji: '👋', alt: 'Mano saludando', correct: true },
      { id: 'o2', emoji: '🦶', alt: 'Pie', correct: false },
      { id: 'o3', emoji: '👂', alt: 'Oreja', correct: false },
      { id: 'o4', emoji: '👃', alt: 'Nariz', correct: false },
    ],
  },
  {
    id: 'pq-m',
    topic: 'Letra M',
    signVideoSrc: '/videos/lsm/practica-letra-m.mp4',
    prompt: 'Elige la palabra que lleva M:',
    options: [
      { id: 'o1', emoji: '🐒', alt: 'Mono', correct: true },
      { id: 'o2', emoji: '🦁', alt: 'León', correct: false },
      { id: 'o3', emoji: '🐸', alt: 'Rana', correct: false },
      { id: 'o4', emoji: '🐻', alt: 'Oso', correct: false },
    ],
  },
  {
    id: 'pq-10',
    topic: 'Número 10',
    signVideoSrc: '/videos/lsm/practica-num-10.mp4',
    prompt: '¿Qué grupo muestra diez?',
    options: [
      { id: 'o1', emoji: '⭐'.repeat(8), alt: 'Ocho estrellas', correct: false },
      { id: 'o2', emoji: '⭐'.repeat(10), alt: 'Diez estrellas', correct: true },
      { id: 'o3', emoji: '⭐'.repeat(6), alt: 'Seis estrellas', correct: false },
      { id: 'o4', emoji: '⭐'.repeat(12), alt: 'Doce estrellas', correct: false },
    ],
  },
];

/** Par para memorama: representación visual + “seña” (placeholder de video) */
export type MemoryPair = {
  id: string;
  label: string;
  pairEmoji: string;
  signVideoSrc: string;
};

export const memoryPairs: MemoryPair[] = [
  { id: 'm1', label: 'A', pairEmoji: '🅰️', signVideoSrc: '/videos/lsm/letra-a.mp4' },
  { id: 'm2', label: 'L', pairEmoji: '🔤', signVideoSrc: '/videos/lsm/letra-l.mp4' },
  { id: 'm3', label: 'S', pairEmoji: '✨', signVideoSrc: '/videos/lsm/letra-s.mp4' },
  { id: 'm4', label: '5', pairEmoji: '5️⃣', signVideoSrc: '/videos/lsm/numero-5.mp4' },
  { id: 'm5', label: 'Rojo', pairEmoji: '❤️', signVideoSrc: '/videos/lsm/color-rojo.mp4' },
  { id: 'm6', label: 'Mano', pairEmoji: '✋', signVideoSrc: '/videos/lsm/manos.mp4' },
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
