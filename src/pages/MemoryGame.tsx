import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { memoryPairs } from '../data/lsmContent';
import { useFeedbackSound } from '../hooks/useFeedbackSound';
import { HelpCircle, RotateCcw } from 'lucide-react';

type CardKind = 'picture' | 'sign';

type Card = {
  uid: string;
  pairId: string;
  kind: CardKind;
  label: string;
  emoji: string;
  videoSrc: string;
};

function buildDeck(): Card[] {
  const deck: Card[] = [];
  memoryPairs.forEach((p) => {
    deck.push({
      uid: `${p.id}-pic`,
      pairId: p.id,
      kind: 'picture',
      label: p.label,
      emoji: p.pairEmoji,
      videoSrc: p.signVideoSrc,
    });
    deck.push({
      uid: `${p.id}-sign`,
      pairId: p.id,
      kind: 'sign',
      label: p.label,
      emoji: p.pairEmoji,
      videoSrc: p.signVideoSrc,
    });
  });
  return deck.sort(() => Math.random() - 0.5);
}

/**
 * Memorama: emparejar tarjeta visual con tarjeta de “seña” (placeholder de video).
 */
export function MemoryGame() {
  const { playFlip, playMatch } = useFeedbackSound();
  const [cards, setCards] = useState(() => buildDeck());
  const [flipped, setFlipped] = useState<string[]>([]);
  const [matched, setMatched] = useState<Set<string>>(new Set());
  const [busy, setBusy] = useState(false);
  const [moves, setMoves] = useState(0);

  const matchedPairs = matched.size / 2;
  const totalPairs = memoryPairs.length;
  const won = matchedPairs === totalPairs;

  const handleFlip = useCallback(
    (uid: string) => {
      if (busy || won) return;
      const card = cards.find((c) => c.uid === uid);
      if (!card || matched.has(uid) || flipped.includes(uid)) return;

      playFlip();
      const next = [...flipped, uid];
      setFlipped(next);

      if (next.length === 2) {
        setMoves((m) => m + 1);
        setBusy(true);
        const [a, b] = next;
        const ca = cards.find((c) => c.uid === a);
        const cb = cards.find((c) => c.uid === b);
        if (ca && cb && ca.pairId === cb.pairId && ca.kind !== cb.kind) {
          playMatch();
          setMatched((prev) => new Set([...prev, a, b]));
          setFlipped([]);
          setBusy(false);
        } else {
          setTimeout(() => {
            setFlipped([]);
            setBusy(false);
          }, 900);
        }
      }
    },
    [busy, won, cards, flipped, matched, playFlip, playMatch]
  );

  const restart = () => {
    setCards(buildDeck());
    setFlipped([]);
    setMatched(new Set());
    setBusy(false);
    setMoves(0);
  };

  return (
    <div className="space-y-8">
      <header className="flex flex-col gap-4 rounded-3xl border-4 border-white bg-violet-100 p-6 shadow-md md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="font-display text-3xl font-extrabold text-violet-950">Memorama</h1>
          <p className="mt-1 text-violet-900/90">
            Voltea dos cartas: una imagen y su seña. ¡Si coinciden, se quedan!
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <span className="rounded-full bg-white px-4 py-2 font-bold text-violet-900 shadow">
            Pares: {matchedPairs} / {totalPairs}
          </span>
          <span className="rounded-full bg-violet-600 px-4 py-2 font-bold text-white shadow">
            Intentos: {moves}
          </span>
          <button
            type="button"
            onClick={restart}
            className="inline-flex items-center gap-2 rounded-full border-4 border-violet-300 bg-white px-4 py-2 font-bold text-violet-800"
          >
            <RotateCcw className="h-4 w-4" aria-hidden />
            Reiniciar
          </button>
          <Link
            to="/juegos"
            className="inline-flex items-center rounded-full border-4 border-white bg-violet-200 px-4 py-2 font-bold text-violet-950"
          >
            Otros juegos
          </Link>
        </div>
      </header>

      {won && (
        <div className="rounded-3xl border-4 border-lime-400 bg-lime-100 p-6 text-center font-display text-2xl font-bold text-emerald-900 shadow-lg animate-bounce-in">
          ¡Ganaste! Lo hiciste genial 🎉
        </div>
      )}

      <ul className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:gap-4">
        {cards.map((card) => {
          const isUp = flipped.includes(card.uid) || matched.has(card.uid);
          const isMatched = matched.has(card.uid);

          return (
            <li key={card.uid}>
              <button
                type="button"
                onClick={() => handleFlip(card.uid)}
                disabled={busy || isMatched || won}
                className={`relative flex aspect-square w-full items-center justify-center rounded-2xl border-4 text-center transition focus:outline-none focus:ring-4 focus:ring-amber-300 disabled:cursor-default ${
                  isMatched
                    ? 'border-lime-500 bg-lime-50'
                    : isUp
                      ? 'border-indigo-300 bg-white'
                      : 'border-white bg-gradient-to-br from-fuchsia-400 to-purple-600 shadow-[0_6px_0_#6b21a8] hover:brightness-110 active:translate-y-1 active:shadow-none'
                }`}
              >
                {!isUp && (
                  <span className="flex flex-col items-center gap-2 p-2 text-white">
                    <HelpCircle className="h-10 w-10 md:h-12 md:w-12" aria-hidden />
                    <span className="text-xs font-bold md:text-sm">Toca</span>
                  </span>
                )}
                {isUp && card.kind === 'picture' && (
                  <span className="flex flex-col items-center gap-1 p-2">
                    <span className="text-5xl md:text-6xl" aria-hidden>
                      {card.emoji}
                    </span>
                    <span className="font-display text-sm font-bold text-indigo-900 md:text-base">
                      {card.label}
                    </span>
                  </span>
                )}
                {isUp && card.kind === 'sign' && (
                  <span className="flex w-full flex-col items-center gap-1 p-2">
                    <span className="flex aspect-video w-full items-center justify-center rounded-xl bg-gradient-to-br from-sky-400 to-indigo-500 text-3xl text-white shadow-inner">
                      🤟
                    </span>
                    <span className="text-xs font-bold text-slate-600">Seña: {card.label}</span>
                    <span className="sr-only">Video simulado en {card.videoSrc}</span>
                  </span>
                )}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
