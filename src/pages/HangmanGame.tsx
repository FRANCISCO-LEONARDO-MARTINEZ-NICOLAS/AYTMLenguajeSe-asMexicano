import { useCallback, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { HANGMAN_LETTERS, hangmanWords } from '../data/lsmContent';
import { useFeedbackSound } from '../hooks/useFeedbackSound';
import { Heart, RotateCcw } from 'lucide-react';

const MAX_WRONG = 6;

/**
 * Ahorcado infantil: pista con emoji, letras en botones, vidas con corazones.
 */
export function HangmanGame() {
  const { playCorrect, playWrong } = useFeedbackSound();
  const [wordIndex, setWordIndex] = useState(() =>
    Math.floor(Math.random() * hangmanWords.length)
  );
  const puzzle = hangmanWords[wordIndex];
  const letters = useMemo(() => puzzle.word.split(''), [puzzle.word]);

  const [guessed, setGuessed] = useState<Set<string>>(new Set());
  const [wrongCount, setWrongCount] = useState(0);

  const normalizedWordLetters = useMemo(() => {
    const set = new Set<string>();
    letters.forEach((ch) => set.add(ch));
    return set;
  }, [letters]);

  const allFound = useMemo(() => {
    for (const ch of normalizedWordLetters) {
      if (!guessed.has(ch)) return false;
    }
    return true;
  }, [guessed, normalizedWordLetters]);

  const lost = wrongCount >= MAX_WRONG;
  const won = allFound && !lost;

  const heartsLeft = MAX_WRONG - wrongCount;

  const pickLetter = useCallback(
    (L: string) => {
      if (won || lost || guessed.has(L)) return;
      const next = new Set(guessed);
      next.add(L);
      setGuessed(next);
      if (normalizedWordLetters.has(L)) {
        playCorrect();
      } else {
        setWrongCount((w) => w + 1);
        playWrong();
      }
    },
    [guessed, lost, normalizedWordLetters, playCorrect, playWrong, won]
  );

  const nextWord = () => {
    setWordIndex((i) => (i + 1) % hangmanWords.length);
    setGuessed(new Set());
    setWrongCount(0);
  };

  const randomWord = () => {
    let next = wordIndex;
    if (hangmanWords.length > 1) {
      while (next === wordIndex) {
        next = Math.floor(Math.random() * hangmanWords.length);
      }
    }
    setWordIndex(next);
    setGuessed(new Set());
    setWrongCount(0);
  };

  return (
    <div className="space-y-8">
      <header className="rounded-3xl border-4 border-white bg-orange-100 p-6 shadow-md">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="font-display text-3xl font-extrabold text-orange-950">Ahorcado amigo</h1>
            <p className="mt-1 text-orange-900/90">Mira la pista y adivina la palabra letra por letra.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={randomWord}
              className="inline-flex items-center gap-2 rounded-full border-4 border-orange-300 bg-white px-4 py-2 font-bold text-orange-900"
            >
              <RotateCcw className="h-4 w-4" aria-hidden />
              Otra palabra
            </button>
            <Link
              to="/juegos"
              className="inline-flex items-center rounded-full border-4 border-white bg-orange-200 px-4 py-2 font-bold text-orange-950"
            >
              Otros juegos
            </Link>
          </div>
        </div>
      </header>

      <section className="rounded-3xl border-4 border-white bg-white p-6 shadow-xl">
        <div className="flex flex-col items-center gap-6 md:flex-row md:items-start md:justify-between">
          <div className="flex flex-col items-center gap-3">
            <span className="text-8xl drop-shadow" aria-hidden>
              {puzzle.hintEmoji}
            </span>
            <p className="max-w-xs text-center text-lg font-medium text-slate-600">{puzzle.hintText}</p>
          </div>

          <div className="flex flex-1 flex-col items-center gap-6">
            <div className="flex flex-wrap justify-center gap-2" aria-label="Vidas restantes">
              {Array.from({ length: MAX_WRONG }).map((_, i) => (
                <Heart
                  key={i}
                  className={`h-10 w-10 ${i < heartsLeft ? 'fill-rose-400 text-rose-600' : 'fill-slate-200 text-slate-300'}`}
                  aria-hidden
                />
              ))}
            </div>

            <div
              className="flex flex-wrap justify-center gap-3 font-display text-4xl font-bold tracking-widest text-indigo-900 md:text-5xl"
              aria-live="polite"
            >
              {letters.map((ch, idx) => (
                <span
                  key={`${idx}-${ch}`}
                  className="inline-flex min-w-[2rem] justify-center rounded-xl border-b-4 border-indigo-300 bg-indigo-50 px-2"
                >
                  {guessed.has(ch) ? ch : '_'}
                </span>
              ))}
            </div>

            {won && (
              <p className="rounded-2xl bg-lime-200 px-6 py-4 font-display text-2xl font-bold text-emerald-900">
                ¡Correcto! La palabra era {puzzle.word}
              </p>
            )}
            {lost && (
              <p className="rounded-2xl bg-amber-100 px-6 py-4 font-display text-xl font-bold text-amber-950">
                ¡No pasa nada! La palabra era {puzzle.word}. ¿Probamos otra?
              </p>
            )}

            <div className="grid w-full max-w-2xl grid-cols-7 gap-2 sm:grid-cols-9">
              {HANGMAN_LETTERS.map((L) => {
                const used = guessed.has(L);
                const inWord = normalizedWordLetters.has(L);
                const disable = won || lost || used;
                return (
                  <button
                    key={L}
                    type="button"
                    disabled={disable}
                    onClick={() => pickLetter(L)}
                    className={`rounded-xl border-4 py-3 text-lg font-bold transition focus:outline-none focus:ring-4 focus:ring-amber-300 disabled:cursor-default ${
                      used
                        ? inWord
                          ? 'border-lime-400 bg-lime-100 text-lime-900'
                          : 'border-slate-200 bg-slate-100 text-slate-400 line-through'
                        : 'border-white bg-gradient-to-br from-sky-400 to-blue-600 text-white shadow-[0_4px_0_#1d4ed8] hover:brightness-110 active:translate-y-0.5 active:shadow-none'
                    }`}
                  >
                    {L}
                  </button>
                );
              })}
            </div>

            {(won || lost) && (
              <button
                type="button"
                onClick={nextWord}
                className="rounded-2xl border-4 border-indigo-200 bg-indigo-600 px-8 py-4 font-display text-xl font-bold text-white shadow-[0_6px_0_#3730a3] hover:brightness-110"
              >
                Siguiente palabra
              </button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
