import { Link } from 'react-router-dom';
import { Grid3x3, Smile } from 'lucide-react';

/**
 * Centro de juegos: enlaces a memorama y ahorcado infantil.
 */
export function Games() {
  return (
    <div className="space-y-10">
      <header className="rounded-3xl border-4 border-white bg-fuchsia-100 p-6 text-center shadow-md">
        <h1 className="font-display text-3xl font-extrabold text-purple-950 md:text-4xl">Juegos</h1>
        <p className="mt-2 text-lg text-purple-900/90">
          Elige un juego. Son divertidos y te ayudan a recordar las señas.
        </p>
      </header>

      <div className="grid gap-8 md:grid-cols-2">
        <Link
          to="/juegos/memorama"
          className="flex flex-col items-center gap-4 rounded-3xl border-4 border-white bg-gradient-to-br from-violet-400 to-purple-700 p-10 text-white shadow-[0_10px_0_#5b21b6] transition hover:-translate-y-1 hover:brightness-110 active:translate-y-1 active:shadow-none"
        >
          <Grid3x3 className="h-16 w-16" strokeWidth={2.5} aria-hidden />
          <span className="font-display text-3xl font-bold">Memorama</span>
          <span className="text-center text-white/95">
            Junta parejas: imagen con su seña. ¡Memoriza y gana!
          </span>
        </Link>

        <Link
          to="/juegos/ahorcado"
          className="flex flex-col items-center gap-4 rounded-3xl border-4 border-white bg-gradient-to-br from-orange-400 to-rose-600 p-10 text-white shadow-[0_10px_0_#be123c] transition hover:-translate-y-1 hover:brightness-110 active:translate-y-1 active:shadow-none"
        >
          <Smile className="h-16 w-16" strokeWidth={2.5} aria-hidden />
          <span className="font-display text-3xl font-bold">Ahorcado amigo</span>
          <span className="text-center text-white/95">
            Adivina la palabra con pistas e imagen. Sin dibujos feos, súper amable.
          </span>
        </Link>
      </div>
    </div>
  );
}
