// AssociationPuzzleGame.tsx
// Juego principal de rompecabezas de asociación. Reemplaza al juego anterior de ahorcado.
// Mantiene el mismo layout de header + sección que usa el proyecto.

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { RotateCcw, Puzzle } from 'lucide-react';
import { EasyPuzzleGame } from '../components/games/EasyPuzzleGame';

type Category = 'all' | 'letter' | 'number' | 'color';

const CATEGORY_LABELS: Record<Category, string> = {
  all: 'Todos',
  letter: 'Letras',
  number: 'Números',
  color: 'Colores',
};

const CATEGORY_STYLES: Record<Category, string> = {
  all: 'bg-orange-500 border-orange-300 text-white',
  letter: 'bg-indigo-500 border-indigo-300 text-white',
  number: 'bg-sky-500 border-sky-300 text-white',
  color: 'bg-rose-500 border-rose-300 text-white',
};

const CATEGORY_INACTIVE = 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50';

export function AssociationPuzzleGame() {
  const [category, setCategory] = useState<Category>('all');
  const [gameKey, setGameKey] = useState(0);

  const newGame = () => setGameKey((k) => k + 1);

  return (
    <div className="space-y-8">
      {/* ── Header — estilo consistente con el proyecto ── */}
      <header className="rounded-3xl border-4 border-white bg-orange-100 p-6 shadow-md">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="font-display text-3xl font-extrabold text-orange-950 flex items-center gap-2">
              <Puzzle className="h-8 w-8 text-orange-500" aria-hidden />
              Rompecabezas de señas
            </h1>
            <p className="mt-1 text-orange-900/90">
              Arrastra cada pieza a su lugar: letra, seña e imagen juntas.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={newGame}
              className="inline-flex items-center gap-2 rounded-full border-4 border-orange-300 bg-white px-4 py-2 font-bold text-orange-900 hover:bg-orange-50 transition-colors"
            >
              <RotateCcw className="h-4 w-4" aria-hidden />
              Nuevas piezas
            </button>
            <Link
              to="/juegos"
              className="inline-flex items-center rounded-full border-4 border-white bg-orange-200 px-4 py-2 font-bold text-orange-950 hover:bg-orange-300 transition-colors"
            >
              Otros juegos
            </Link>
          </div>
        </div>
      </header>

      {/* ── Filtros de categoría ── */}
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar por categoría">
        {(['all', 'letter', 'number', 'color'] as Category[]).map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => {
              setCategory(cat);
              setGameKey((k) => k + 1);
            }}
            className={[
              'rounded-full border-4 px-4 py-2 font-bold transition-all duration-150',
              category === cat ? CATEGORY_STYLES[cat] : CATEGORY_INACTIVE,
            ].join(' ')}

          >
            {CATEGORY_LABELS[cat]}
          </button>
        ))}
      </div>

      {/* ── Sección del juego principal ── */}
      <section className="rounded-3xl border-4 border-white bg-white p-6 shadow-xl">
        {/* Instrucciones rápidas */}
        <div className="mb-6 flex flex-wrap gap-3">
          {[
            { icon: '🔤', text: 'Letra', color: 'bg-indigo-100 text-indigo-800' },
            { icon: '🤚', text: 'Seña en LSM', color: 'bg-sky-100 text-sky-800' },
            { icon: '🖼️', text: 'Imagen representativa', color: 'bg-lime-100 text-lime-800' },
          ].map((tip) => (
            <span
              key={tip.text}
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium ${tip.color}`}
            >
              <span aria-hidden>{tip.icon}</span>
              {tip.text}
            </span>
          ))}
        </div>

        {/* Juego fácil para niños: una ficha a la vez */}
        <EasyPuzzleGame />
      </section>
    </div>
  );
}