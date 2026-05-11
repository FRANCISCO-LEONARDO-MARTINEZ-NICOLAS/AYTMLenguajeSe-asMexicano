// puzzleContent.ts
// Datos para el juego de rompecabezas LSM
// Cada entrada tiene: id, tipo, etiqueta visible, emoji de seña, emoji representativo, color de acento

export type PuzzleCategory = 'letter' | 'number' | 'color';

export interface PuzzleItem {
  id: string;
  category: PuzzleCategory;
  label: string;          // Letra, número o nombre del color
  signEmoji: string;      // Emoji que representa la seña (mano)
  imageEmoji: string;     // Emoji representativo del concepto
  accentColor: string;    // Clase Tailwind para el acento de color
  signVideo: string;      // Ruta al video de la seña
}

export const puzzleItems: PuzzleItem[] = [
  // ── LETRAS ──────────────────────────────────────────────────────────────
  { id: 'A', category: 'letter', label: 'A', signEmoji: '🤙', imageEmoji: '🍎', accentColor: 'bg-red-400', signVideo: '/videos/lsm/Letras/A.mp4' },
  { id: 'B', category: 'letter', label: 'B', signEmoji: '✋', imageEmoji: '🐝', accentColor: 'bg-yellow-400', signVideo: '/videos/lsm/Letras/B.mp4' },
  { id: 'C', category: 'letter', label: 'C', signEmoji: '🤏', imageEmoji: '🐱', accentColor: 'bg-orange-400', signVideo: '/videos/lsm/Letras/C.mp4' },
  { id: 'D', category: 'letter', label: 'D', signEmoji: '☝️', imageEmoji: '🎲', accentColor: 'bg-blue-400', signVideo: '/videos/lsm/Letras/D.mp4' },
  { id: 'E', category: 'letter', label: 'E', signEmoji: '✊', imageEmoji: '⭐', accentColor: 'bg-purple-400', signVideo: '/videos/lsm/Letras/E.mp4' },
  { id: 'F', category: 'letter', label: 'F', signEmoji: '🤞', imageEmoji: '🌸', accentColor: 'bg-pink-400', signVideo: '/videos/lsm/Letras/F.mp4' },
  { id: 'G', category: 'letter', label: 'G', signEmoji: '👉', imageEmoji: '🦒', accentColor: 'bg-lime-500', signVideo: '/videos/lsm/Letras/G.mp4' },
  { id: 'H', category: 'letter', label: 'H', signEmoji: '🤟', imageEmoji: '🦛', accentColor: 'bg-teal-400', signVideo: '/videos/lsm/Letras/H.mp4' },
  { id: 'I', category: 'letter', label: 'I', signEmoji: '🤙', imageEmoji: '🏝️', accentColor: 'bg-cyan-400', signVideo: '/videos/lsm/Letras/I.mp4' },
  { id: 'J', category: 'letter', label: 'J', signEmoji: '🤙', imageEmoji: '🦒', accentColor: 'bg-indigo-400', signVideo: '/videos/lsm/Letras/J.mp4' },
  { id: 'K', category: 'letter', label: 'K', signEmoji: '✌️', imageEmoji: '🥝', accentColor: 'bg-green-500', signVideo: '/videos/lsm/Letras/K.mp4' },
  { id: 'L', category: 'letter', label: 'L', signEmoji: '🤙', imageEmoji: '🦁', accentColor: 'bg-amber-500', signVideo: '/videos/lsm/Letras/L.mp4' },
  { id: 'M', category: 'letter', label: 'M', signEmoji: '✊', imageEmoji: '🌙', accentColor: 'bg-violet-400', signVideo: '/videos/lsm/Letras/M.mp4' },
  { id: 'N', category: 'letter', label: 'N', signEmoji: '✊', imageEmoji: '🌈', accentColor: 'bg-sky-400', signVideo: '/videos/lsm/Letras/N.mp4' },
  { id: 'Ñ', category: 'letter', label: 'Ñ', signEmoji: '🤜', imageEmoji: '🍂', accentColor: 'bg-orange-500', signVideo: '/videos/lsm/Letras/Ñ.mp4' },
  { id: 'O', category: 'letter', label: 'O', signEmoji: '👌', imageEmoji: '🐙', accentColor: 'bg-rose-400', signVideo: '/videos/lsm/Letras/O.mp4' },
  { id: 'P', category: 'letter', label: 'P', signEmoji: '👇', imageEmoji: '🦜', accentColor: 'bg-emerald-400', signVideo: '/videos/lsm/Letras/P.mp4' },
  { id: 'Q', category: 'letter', label: 'Q', signEmoji: '👇', imageEmoji: '🧀', accentColor: 'bg-yellow-500', signVideo: '/videos/lsm/Letras/Q.mp4' },
  { id: 'R', category: 'letter', label: 'R', signEmoji: '🤞', imageEmoji: '🌹', accentColor: 'bg-red-500', signVideo: '/videos/lsm/Letras/R.mp4' },
  { id: 'S', category: 'letter', label: 'S', signEmoji: '✊', imageEmoji: '☀️', accentColor: 'bg-amber-400', signVideo: '/videos/lsm/Letras/S.mp4' },
  { id: 'T', category: 'letter', label: 'T', signEmoji: '✊', imageEmoji: '🐢', accentColor: 'bg-teal-500', signVideo: '/videos/lsm/Letras/T.mp4' },
  { id: 'U', category: 'letter', label: 'U', signEmoji: '✌️', imageEmoji: '🦄', accentColor: 'bg-purple-500', signVideo: '/videos/lsm/Letras/U.mp4' },
  { id: 'V', category: 'letter', label: 'V', signEmoji: '✌️', imageEmoji: '🌋', accentColor: 'bg-cyan-500', signVideo: '/videos/lsm/Letras/V.mp4' },
  { id: 'W', category: 'letter', label: 'W', signEmoji: '🖖', imageEmoji: '🍉', accentColor: 'bg-green-400', signVideo: '/videos/lsm/Letras/W.mp4' },
  { id: 'X', category: 'letter', label: 'X', signEmoji: '☝️', imageEmoji: '🎸', accentColor: 'bg-blue-500', signVideo: '/videos/lsm/Letras/X.mp4' },
  { id: 'Y', category: 'letter', label: 'Y', signEmoji: '🤙', imageEmoji: '🧶', accentColor: 'bg-indigo-500', signVideo: '/videos/lsm/Letras/Y.mp4' },
  { id: 'Z', category: 'letter', label: 'Z', signEmoji: '☝️', imageEmoji: '🦓', accentColor: 'bg-slate-500', signVideo: '/videos/lsm/Letras/Z.mp4' },

  // ── NÚMEROS ─────────────────────────────────────────────────────────────
  { id: 'N0',  category: 'number', label: '0',  signEmoji: '👊', imageEmoji: '🥚', accentColor: 'bg-slate-400', signVideo: '/videos/lsm/Numeros/0.mp4' },
  { id: 'N1',  category: 'number', label: '1',  signEmoji: '☝️', imageEmoji: '🌟', accentColor: 'bg-yellow-400', signVideo: '/videos/lsm/Numeros/1.mp4' },
  { id: 'N2',  category: 'number', label: '2',  signEmoji: '✌️', imageEmoji: '👀', accentColor: 'bg-blue-400', signVideo: '/videos/lsm/Numeros/2.mp4' },
  { id: 'N3',  category: 'number', label: '3',  signEmoji: '🤟', imageEmoji: '🎯', accentColor: 'bg-green-400', signVideo: '/videos/lsm/Numeros/3.mp4' },
  { id: 'N4',  category: 'number', label: '4',  signEmoji: '🖖', imageEmoji: '🍀', accentColor: 'bg-emerald-500', signVideo: '/videos/lsm/Numeros/4.mp4' },
  { id: 'N5',  category: 'number', label: '5',  signEmoji: '🖐️', imageEmoji: '⭐', accentColor: 'bg-amber-400', signVideo: '/videos/lsm/Numeros/5.mp4' },
  { id: 'N6',  category: 'number', label: '6',  signEmoji: '🤙', imageEmoji: '🎲', accentColor: 'bg-red-400', signVideo: '/videos/lsm/Numeros/6.mp4' },
  { id: 'N7',  category: 'number', label: '7',  signEmoji: '🤞', imageEmoji: '🌈', accentColor: 'bg-purple-400', signVideo: '/videos/lsm/Numeros/7.mp4' },
  { id: 'N8',  category: 'number', label: '8',  signEmoji: '🤌', imageEmoji: '🎱', accentColor: 'bg-gray-600', signVideo: '/videos/lsm/Numeros/8.mp4' },
  { id: 'N9',  category: 'number', label: '9',  signEmoji: '🤏', imageEmoji: '🎈', accentColor: 'bg-pink-400', signVideo: '/videos/lsm/Numeros/9.mp4' },
  { id: 'N10', category: 'number', label: '10', signEmoji: '✊', imageEmoji: '🔟', accentColor: 'bg-orange-400', signVideo: '/videos/lsm/Numeros/10.mp4' },
  { id: 'N11', category: 'number', label: '11', signEmoji: '☝️', imageEmoji: '🦋', accentColor: 'bg-sky-400', signVideo: '/videos/lsm/Numeros/11.mp4' },
  { id: 'N12', category: 'number', label: '12', signEmoji: '✌️', imageEmoji: '🎂', accentColor: 'bg-rose-400', signVideo: '/videos/lsm/Numeros/12.mp4' },
  { id: 'N13', category: 'number', label: '13', signEmoji: '🤟', imageEmoji: '🌙', accentColor: 'bg-indigo-400', signVideo: '/videos/lsm/Numeros/13.mp4' },
  { id: 'N14', category: 'number', label: '14', signEmoji: '🖖', imageEmoji: '❤️', accentColor: 'bg-red-500', signVideo: '/videos/lsm/Numeros/14.mp4' },
  { id: 'N15', category: 'number', label: '15', signEmoji: '🖐️', imageEmoji: '🏆', accentColor: 'bg-yellow-500', signVideo: '/videos/lsm/Numeros/15.mp4' },
  { id: 'N16', category: 'number', label: '16', signEmoji: '🤙', imageEmoji: '🎵', accentColor: 'bg-violet-400', signVideo: '/videos/lsm/Numeros/16.mp4' },
  { id: 'N17', category: 'number', label: '17', signEmoji: '🤞', imageEmoji: '⚡', accentColor: 'bg-amber-500', signVideo: '/videos/lsm/Numeros/17.mp4' },
  { id: 'N18', category: 'number', label: '18', signEmoji: '🤌', imageEmoji: '🌺', accentColor: 'bg-pink-500', signVideo: '/videos/lsm/Numeros/18.mp4' },
  { id: 'N19', category: 'number', label: '19', signEmoji: '🤏', imageEmoji: '🦚', accentColor: 'bg-teal-500', signVideo: '/videos/lsm/Numeros/19.mp4' },
  { id: 'N20', category: 'number', label: '20', signEmoji: '✊', imageEmoji: '🎉', accentColor: 'bg-lime-500', signVideo: '/videos/lsm/Numeros/20.mp4' },

  // ── COLORES ──────────────────────────────────────────────────────────────
  { id: 'COL_ROJO',     category: 'color', label: 'Rojo',     signEmoji: '🤜', imageEmoji: '🍎', accentColor: 'bg-red-500',    signVideo: '/videos/lsm/Colores/Rojo.mp4' },
  { id: 'COL_AZUL',     category: 'color', label: 'Azul',     signEmoji: '🤛', imageEmoji: '🌊', accentColor: 'bg-blue-500',   signVideo: '/videos/lsm/Colores/Azul.mp4' },
  { id: 'COL_VERDE',    category: 'color', label: 'Verde',    signEmoji: '✋', imageEmoji: '🌿', accentColor: 'bg-green-500',   signVideo: '/videos/lsm/Colores/Verde.mp4' },
  { id: 'COL_AMARILLO', category: 'color', label: 'Amarillo', signEmoji: '🖐️', imageEmoji: '⭐', accentColor: 'bg-yellow-400', signVideo: '/videos/lsm/Colores/Amarillo.mp4' },
  { id: 'COL_NARANJA',  category: 'color', label: 'Naranja',  signEmoji: '✊', imageEmoji: '🍊', accentColor: 'bg-orange-500',   signVideo: '/videos/lsm/Colores/Naranja.mp4' },
  { id: 'COL_MORADO',   category: 'color', label: 'Morado',   signEmoji: '🤟', imageEmoji: '🍇', accentColor: 'bg-purple-500',  signVideo: '/videos/lsm/Colores/Morado.mp4' },
  { id: 'COL_ROSA',     category: 'color', label: 'Rosa',     signEmoji: '🤞', imageEmoji: '🌸', accentColor: 'bg-pink-400',    signVideo: '/videos/lsm/Colores/Rosa.mp4' },
  { id: 'COL_BLANCO',   category: 'color', label: 'Blanco',   signEmoji: '✋', imageEmoji: '🤍', accentColor: 'bg-gray-300',    signVideo: '/videos/lsm/Colores/Blanco.mp4' },
  { id: 'COL_NEGRO',    category: 'color', label: 'Negro',    signEmoji: '✊', imageEmoji: '🖤', accentColor: 'bg-gray-800',    signVideo: '/videos/lsm/Colores/Negro.mp4' },
  { id: 'COL_CAFE',     category: 'color', label: 'Café',     signEmoji: '🤜', imageEmoji: '🍫', accentColor: 'bg-amber-700',   signVideo: '/videos/lsm/Colores/Cafe.mp4' },
];

/** Devuelve 4 items aleatorios sin repetir, filtrando por categoría opcional */
export function getRandomPuzzleSet(
  exclude: string[] = [],
  category?: PuzzleCategory
): PuzzleItem[] {
  let pool = puzzleItems.filter((p) => !exclude.includes(p.id));
  if (category) pool = pool.filter((p) => p.category === category);
  if (pool.length < 4) pool = puzzleItems.filter((p) => !exclude.includes(p.id)); // fallback
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 4);
}