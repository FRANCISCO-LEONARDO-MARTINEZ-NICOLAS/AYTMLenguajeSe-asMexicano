import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { VideoPlaceholder } from '../components/VideoPlaceholder';
import { getCategoryById } from '../data/lsmContent';
import type { DictionaryItem } from '../data/lsmContent';
import { X } from 'lucide-react';

/**
 * Grid de tarjetas por categoría; modal para ver la seña en grande.
 */
export function DictionaryCategory() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const category = categoryId ? getCategoryById(categoryId) : undefined;
  const [selected, setSelected] = useState<DictionaryItem | null>(null);

  if (!category) {
    return (
      <div className="rounded-3xl border-4 border-white bg-rose-100 p-8 text-center">
        <p className="font-display text-xl font-bold text-rose-800">No encontramos esa categoría.</p>
        <Link to="/diccionario" className="mt-4 inline-block font-bold text-rose-700 underline">
          Volver al diccionario
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <header className="flex flex-col gap-4 rounded-3xl border-4 border-white bg-white p-6 shadow-md md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-4xl">{category.emoji}</p>
          <h1 className="font-display text-3xl font-extrabold text-indigo-800">{category.title}</h1>
          <p className="text-slate-600">{category.description}</p>
        </div>
        <Link
          to="/diccionario"
          className="inline-flex w-fit items-center justify-center rounded-2xl border-4 border-indigo-200 bg-indigo-50 px-5 py-3 font-bold text-indigo-800 transition hover:bg-indigo-100"
        >
          ← Otras categorías
        </Link>
      </header>

      <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {category.items.map((item) => (
          <li key={item.id}>
            <button
              type="button"
              onClick={() => setSelected(item)}
              className="w-full rounded-3xl border-4 border-white bg-gradient-to-b from-white to-sky-50 p-3 text-left shadow-md transition hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-amber-300"
            >
              <VideoPlaceholder
                videoSrc={item.videoSrc}
                title={item.label}
                size="sm"
                nonInteractiveOverlay
              />
              <p className="mt-2 text-center font-display text-lg font-bold text-slate-800">{item.label}</p>
            </button>
          </li>
        ))}
      </ul>

      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div className="relative w-full max-w-lg rounded-3xl border-4 border-white bg-white p-4 shadow-2xl">
            <button
              type="button"
              onClick={() => setSelected(null)}
              className="absolute right-3 top-3 rounded-full bg-rose-100 p-2 text-rose-700 transition hover:bg-rose-200"
              aria-label="Cerrar"
            >
              <X className="h-6 w-6" />
            </button>
            <h2 id="modal-title" className="mb-4 pr-10 font-display text-2xl font-bold text-indigo-800">
              Seña: {selected.label}
            </h2>
            <VideoPlaceholder videoSrc={selected.videoSrc} title={selected.label} size="lg" />
          </div>
        </div>
      )}
    </div>
  );
}
