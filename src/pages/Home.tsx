import { BookOpen, Gamepad2, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * Pantalla principal: título y accesos grandes a las secciones.
 */
export function Home() {
  return (
    <div className="space-y-10 text-center">
      <div className="mx-auto max-w-3xl rounded-[2rem] border-4 border-white bg-white/90 p-8 shadow-xl">
        <p className="mb-2 inline-flex items-center gap-2 rounded-full bg-amber-200 px-4 py-1 font-bold text-amber-900">
          <Sparkles className="h-5 w-5" aria-hidden />
          ¡Bienvenido!
        </p>
        <h1 className="font-display text-4xl font-extrabold tracking-tight text-indigo-700 md:text-5xl">
          Aprende Lengua de Señas Mexicana
        </h1>
        <p className="mt-4 text-lg text-slate-600 md:text-xl">
          Explora el diccionario, practica con retos visuales y juega al memorama o al ahorcado
          amigable. ¡Todo desde tu navegador!
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Link
          to="/diccionario"
          className="group flex min-h-[160px] flex-col items-center justify-center gap-3 rounded-3xl border-4 border-white bg-gradient-to-br from-sky-400 to-blue-600 p-8 text-white shadow-[0_10px_0_#1d4ed8] transition hover:-translate-y-1 hover:brightness-110 active:translate-y-1 active:shadow-none"
        >
          <BookOpen className="h-14 w-14 transition group-hover:rotate-6" strokeWidth={2.5} aria-hidden />
          <span className="font-display text-2xl font-bold">Diccionario</span>
          <span className="text-sm font-medium text-white/90">Letras, números, colores y cuerpo</span>
        </Link>

        <Link
          to="/practicar"
          className="group flex min-h-[160px] flex-col items-center justify-center gap-3 rounded-3xl border-4 border-white bg-gradient-to-br from-lime-400 to-emerald-600 p-8 text-white shadow-[0_10px_0_#047857] transition hover:-translate-y-1 hover:brightness-110 active:translate-y-1 active:shadow-none"
        >
          <Sparkles className="h-14 w-14 transition group-hover:scale-110" strokeWidth={2.5} aria-hidden />
          <span className="font-display text-2xl font-bold">Practicar</span>
          <span className="text-sm font-medium text-white/90">Elige la respuesta correcta con imágenes</span>
        </Link>

        <Link
          to="/juegos"
          className="group flex min-h-[160px] flex-col items-center justify-center gap-3 rounded-3xl border-4 border-white bg-gradient-to-br from-fuchsia-400 to-purple-600 p-8 text-white shadow-[0_10px_0_#7e22ce] transition hover:-translate-y-1 hover:brightness-110 active:translate-y-1 active:shadow-none"
        >
          <Gamepad2 className="h-14 w-14 transition group-hover:rotate-12" strokeWidth={2.5} aria-hidden />
          <span className="font-display text-2xl font-bold">Juegos</span>
          <span className="text-sm font-medium text-white/90">Memorama y ahorcado para niños</span>
        </Link>
      </div>
    </div>
  );
}
