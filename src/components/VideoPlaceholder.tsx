import { Play } from 'lucide-react';
import { useMemo, useRef, useState } from 'react';

type Props = {
  /** Ruta esperada del video (p. ej. en `public/videos/`) */
  videoSrc: string;
  title: string;
  /** Tamaño visual */
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  /**
   * Si el componente va dentro de otro botón/enlace, el overlay no debe ser `<button>`
   * (evita HTML inválido). Usa `true` en tarjetas clicables del diccionario.
   */
  nonInteractiveOverlay?: boolean;
};

/**
 * Reproductor con fallback: intenta cargar el video local;
 * si falla o no existe, muestra un placeholder animado amigable.
 */
export function VideoPlaceholder({
  videoSrc,
  title,
  size = 'md',
  className = '',
  nonInteractiveOverlay = false,
}: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  const dims = useMemo(() => {
    switch (size) {
      case 'sm':
        return 'aspect-video max-h-36';
      case 'lg':
        return 'aspect-video max-h-[min(70vh,520px)]';
      default:
        return 'aspect-video max-h-52';
    }
  }, [size]);

  const showPlaceholder = !loaded || failed;

  const handlePlayOverlay = () => {
    const el = videoRef.current;
    if (el && loaded && !failed) {
      void el.play().catch(() => undefined);
    }
  };

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border-4 border-white shadow-[0_8px_0_rgba(0,0,0,0.08)] ${dims} ${className}`}
    >
      {!failed && (
        <video
          ref={videoRef}
          className={`h-full w-full object-cover ${loaded ? 'relative z-10 block' : 'sr-only'}`}
          src={videoSrc}
          controls={loaded}
          playsInline
          preload="metadata"
          onLoadedData={() => setLoaded(true)}
          onError={() => setFailed(true)}
        >
          Tu navegador no reproduce video embebido.
        </video>
      )}

      {showPlaceholder &&
        (nonInteractiveOverlay ? (
          <div
            className="pointer-events-none absolute inset-0 z-20 flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-sky-400 via-indigo-400 to-fuchsia-400 p-4 text-white"
            aria-hidden
          >
            <span className="rounded-full bg-white/25 p-4 shadow-inner ring-4 ring-white/40">
              <Play className="h-10 w-10 fill-white text-white md:h-14 md:w-14" aria-hidden />
            </span>
            <span className="max-w-[95%] text-center font-display text-lg font-bold drop-shadow md:text-2xl">
              {title}
            </span>
            <span className="rounded-full bg-black/20 px-3 py-1 text-xs font-medium md:text-sm">
              Video de práctica LSM
            </span>
          </div>
        ) : (
          <button
            type="button"
            onClick={handlePlayOverlay}
            className="absolute inset-0 z-20 flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-sky-400 via-indigo-400 to-fuchsia-400 p-4 text-white transition hover:brightness-105 focus:outline-none focus:ring-4 focus:ring-amber-300"
            aria-label={`Ver seña: ${title}`}
          >
            <span className="rounded-full bg-white/25 p-4 shadow-inner ring-4 ring-white/40 transition hover:scale-105 active:scale-95">
              <Play className="h-10 w-10 fill-white text-white md:h-14 md:w-14" aria-hidden />
            </span>
            <span className="max-w-[95%] text-center font-display text-lg font-bold drop-shadow md:text-2xl">
              {title}
            </span>
            <span className="rounded-full bg-black/20 px-3 py-1 text-xs font-medium md:text-sm">
              {loaded ? 'Toca el video de arriba' : 'Video de práctica LSM'}
            </span>
            <span className="sr-only">Ruta sugerida para tu archivo: {videoSrc}</span>
          </button>
        ))}
    </div>
  );
}
