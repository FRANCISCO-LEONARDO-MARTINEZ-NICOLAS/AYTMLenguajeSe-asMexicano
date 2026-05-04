import { ArrowLeft, HandHeart } from 'lucide-react';
import { Link, Outlet, useLocation } from 'react-router-dom';

/**
 * Marco común: marca, navegación y botón atrás accesible.
 */
export function Layout() {
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  return (
    <div className="min-h-screen bg-kid-gradient bg-fixed font-body text-slate-800">
      <header className="sticky top-0 z-40 border-b-4 border-white/80 bg-white/90 shadow-md backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3">
          <Link
            to="/"
            className="flex items-center gap-2 rounded-2xl px-2 py-1 font-display text-xl font-bold text-indigo-700 transition hover:scale-[1.02] hover:text-fuchsia-600 md:text-2xl"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-300 to-orange-400 text-white shadow-[0_4px_0_#c2410c]">
              <HandHeart className="h-7 w-7" aria-hidden />
            </span>
            <span className="hidden sm:inline">Lengua de Señas Mexicana(LSM)</span>
          </Link>

          <nav className="flex flex-wrap items-center gap-2 text-sm font-bold md:text-base" aria-label="Principal">
            <Link
              className="rounded-xl bg-sky-500 px-3 py-2 text-white shadow-[0_4px_0_#0369a1] transition hover:brightness-110 active:translate-y-0.5 active:shadow-none"
              to="/diccionario"
            >
              Diccionario
            </Link>
            <Link
              className="rounded-xl bg-lime-500 px-3 py-2 text-white shadow-[0_4px_0_#3f6212] transition hover:brightness-110 active:translate-y-0.5 active:shadow-none"
              to="/practicar"
            >
              Practicar
            </Link>
            <Link
              className="rounded-xl bg-fuchsia-500 px-3 py-2 text-white shadow-[0_4px_0_#a21caf] transition hover:brightness-110 active:translate-y-0.5 active:shadow-none"
              to="/juegos"
            >
              Juegos
            </Link>
          </nav>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 pb-16 pt-6">
        {!isHome && (
          <div className="mb-6">
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-2xl border-4 border-white bg-amber-100 px-4 py-2 font-bold text-amber-900 shadow-[0_4px_0_rgba(0,0,0,0.08)] transition hover:bg-amber-200 active:translate-y-0.5"
            >
              <ArrowLeft className="h-5 w-5" aria-hidden />
              Volver al inicio
            </Link>
          </div>
        )}

        <main className="animate-fade-in">
          <Outlet />
        </main>
      </div>

      <footer className="border-t-4 border-white/70 bg-white/80 py-6 text-center text-sm text-slate-600">
        <p className="font-medium">
          Aprende Lengua de Señas Mexicana · Para primaria · Andrea Yarizet Tecolt Montes 
        </p>
      </footer>
    </div>
  );
}
