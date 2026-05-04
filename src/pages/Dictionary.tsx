import { Link } from 'react-router-dom';
import { dictionaryCategories } from '../data/lsmContent';

/**
 * Lista de categorías del diccionario LSM.
 */
export function Dictionary() {
  return (
    <div className="space-y-8">
      <header className="rounded-3xl border-4 border-white bg-amber-100 p-6 text-center shadow-md">
        <h1 className="font-display text-3xl font-extrabold text-amber-950 md:text-4xl">Diccionario</h1>
        <p className="mt-2 text-lg text-amber-900/90">
          Elige una categoría y mira la seña en cada tarjeta. ¡Toca para ver más grande!
        </p>
      </header>

      <ul className="grid gap-6 sm:grid-cols-2">
        {dictionaryCategories.map((cat) => (
          <li key={cat.id}>
            <Link
              to={`/diccionario/${cat.id}`}
              className="flex h-full flex-col gap-3 rounded-3xl border-4 border-white bg-white p-6 shadow-[0_8px_0_rgba(0,0,0,0.06)] transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              <span className="text-5xl" aria-hidden>
                {cat.emoji}
              </span>
              <span className="font-display text-2xl font-bold text-indigo-700">{cat.title}</span>
              <span className="text-slate-600">{cat.description}</span>
              <span className="mt-auto inline-flex w-fit items-center rounded-full bg-sky-100 px-4 py-2 text-sm font-bold text-sky-800">
                {cat.items.length} palabras / letras
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
