import { useCallback, useMemo, useState } from 'react';
import { ArrowLeft, PartyPopper, RefreshCw, Star } from 'lucide-react';
import { VideoPlaceholder } from '../components/VideoPlaceholder';
import { practiceCategories, type PracticeCategory, type PracticeOption, type PracticeQuestion } from '../data/lsmContent';
import { useFeedbackSound } from '../hooks/useFeedbackSound';

function shuffleArray<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function OptionContent({ opt }: { opt: PracticeOption }) {
  if (opt.stars !== undefined) {
    if (opt.stars === 0) return <span className="text-2xl font-bold text-slate-400">0</span>;
    return (
      <div className="flex flex-wrap justify-center gap-0.5" aria-label={`${opt.stars} estrellas`}>
        {Array.from({ length: opt.stars }).map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" aria-hidden />
        ))}
      </div>
    );
  }
  return <span aria-hidden>{opt.emoji ?? '❓'}</span>;
}

export function Practice() {
  const { playCorrect, playWrong } = useFeedbackSound();
  const [stage, setStage] = useState<'select' | 'quiz' | 'result'>('select');
  const [selectedCategory, setSelectedCategory] = useState<PracticeCategory | null>(null);
  const [shuffledQuestions, setShuffledQuestions] = useState<PracticeQuestion[]>([]);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [answered, setAnswered] = useState(false);
  const [pickedId, setPickedId] = useState<string | null>(null);

  const total = shuffledQuestions.length;
  const question = shuffledQuestions[index];

  const shuffledOptions = useMemo(() => {
    if (!question) return [];
    return shuffleArray(question.options);
  }, [question]);

  const handlePick = useCallback(
    (optionId: string, correct: boolean) => {
      if (answered) return;
      setPickedId(optionId);
      setAnswered(true);
      if (correct) {
        setFeedback('correct');
        setScore((s) => s + 1);
        playCorrect();
      } else {
        setFeedback('wrong');
        playWrong();
      }
    },
    [answered, playCorrect, playWrong]
  );

  const startCategory = (cat: PracticeCategory) => {
    setSelectedCategory(cat);
    setShuffledQuestions(shuffleArray(cat.questions));
    setIndex(0);
    setScore(0);
    setFeedback('idle');
    setAnswered(false);
    setPickedId(null);
    setStage('quiz');
  };

  const next = () => {
    setFeedback('idle');
    setAnswered(false);
    setPickedId(null);
    if (index + 1 >= total) {
      setStage('result');
    } else {
      setIndex((i) => i + 1);
    }
  };

  if (stage === 'select') {
    return (
      <div className="space-y-6">
        <header className="rounded-3xl border-4 border-white bg-lime-100 p-6 text-center shadow-md">
          <h1 className="font-display text-3xl font-extrabold text-emerald-900 md:text-4xl">Practicar</h1>
          <p className="mt-2 text-lg text-emerald-900/90">Elige una categoría para comenzar</p>
        </header>
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {practiceCategories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => startCategory(cat)}
              className="rounded-3xl border-4 border-white bg-white/95 p-6 text-center shadow-md transition hover:-translate-y-1 hover:shadow-xl"
            >
              <p className="text-4xl" aria-hidden>{cat.emoji}</p>
              <p className="mt-2 font-display text-lg font-extrabold text-indigo-900">{cat.title}</p>
              <p className="text-sm text-slate-500">{cat.description}</p>
              <p className="mt-2 text-xs font-bold text-emerald-700">{cat.questions.length} preguntas</p>
            </button>
          ))}
        </section>
      </div>
    );
  }

  if (stage === 'result') {
    const pct = total ? Math.round((score / total) * 100) : 0;
    return (
      <div className="space-y-6">
        <header className="rounded-3xl border-4 border-white bg-lime-100 p-6 text-center shadow-md">
          <h1 className="font-display text-3xl font-extrabold text-emerald-900 md:text-4xl">Resultado final</h1>
          <p className="mt-1 text-emerald-700">{selectedCategory?.title}</p>
        </header>
        <section className="rounded-3xl border-4 border-white bg-white/95 p-8 text-center shadow-xl">
          <p className="text-5xl">{pct >= 80 ? '🏆' : pct >= 50 ? '🌟' : '💪'}</p>
          <p className="mt-2 text-lg font-bold text-slate-700">
            Aciertos: {score} de {total} ({pct}%)
          </p>
          <div className="mt-5 flex justify-center gap-3">
            <button
              type="button"
              onClick={() => (selectedCategory ? startCategory(selectedCategory) : setStage('select'))}
              className="rounded-2xl border-4 border-indigo-200 bg-indigo-600 px-6 py-3 font-bold text-white"
            >
              Repetir categoría
            </button>
            <button
              type="button"
              onClick={() => setStage('select')}
              className="rounded-2xl border-4 border-slate-200 bg-white px-6 py-3 font-bold text-slate-700"
            >
              Elegir otra
            </button>
          </div>
        </section>
      </div>
    );
  }

  if (!question) return null;

  return (
    <div className="space-y-8">
      <header className="rounded-3xl border-4 border-white bg-lime-100 p-6 text-center shadow-md">
        <div className="mb-3 flex justify-start">
          <button
            type="button"
            onClick={() => setStage('select')}
            className="inline-flex items-center gap-1 rounded-xl border-2 border-emerald-300 bg-white px-3 py-2 text-sm font-bold text-emerald-800 hover:bg-emerald-50"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Volver
          </button>
        </div>
        <h1 className="font-display text-3xl font-extrabold text-emerald-900 md:text-4xl">
          {selectedCategory?.emoji} {selectedCategory?.title}
        </h1>
        <p className="mt-2 text-lg text-emerald-900/90">Mira la seña y elige la opción correcta</p>
        <div className="mt-4 inline-flex flex-wrap items-center justify-center gap-3">
          <span className="rounded-full bg-white px-4 py-2 font-bold text-emerald-800 shadow">Puntos: {score} / {total}</span>
          <span className="rounded-full bg-emerald-600 px-4 py-2 font-bold text-white shadow">Pregunta {index + 1} de {total}</span>
        </div>
      </header>

      <section className="grid gap-8 rounded-3xl border-4 border-white bg-white/95 p-6 shadow-xl md:grid-cols-2 md:items-start">
        <div>
          <p className="mb-2 font-bold text-slate-500">Seña a interpretar</p>
          <p className="mb-3 font-display text-xl font-bold text-indigo-800">{question.topic}</p>
          <VideoPlaceholder videoSrc={question.signVideoSrc} title={question.topic} size="md" />
          <p className="mt-4 text-lg font-medium text-slate-700">{question.prompt}</p>
        </div>

        <div>
          <p className="mb-3 font-bold text-slate-500">Elige una imagen</p>
          <div className="grid grid-cols-2 gap-4">
            {shuffledOptions.map((opt) => {
              const isCorrectPick = answered && opt.correct;
              const isWrongPick = answered && pickedId === opt.id && !opt.correct;
              const dim = answered && !opt.correct && !isCorrectPick;

              return (
                <button
                  key={opt.id}
                  type="button"
                  disabled={answered}
                  onClick={() => handlePick(opt.id, opt.correct)}
                  className={`flex min-h-[120px] flex-col items-center justify-center gap-2 rounded-3xl border-4 p-4 text-5xl transition focus:outline-none focus:ring-4 focus:ring-amber-300 disabled:cursor-default ${
                    isCorrectPick
                      ? 'border-lime-500 bg-lime-100 shadow-[0_8px_0_#16a34a]'
                      : isWrongPick
                        ? 'border-rose-400 bg-rose-50'
                        : dim
                          ? 'border-slate-200 opacity-50'
                          : 'border-white bg-gradient-to-br from-amber-50 to-orange-50 shadow-md hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0.5'
                  }`}
                  aria-label={opt.alt}
                  title={opt.alt}
                >
                  <OptionContent opt={opt} />
                  <span className="text-center text-xs font-bold text-slate-600">{opt.label ?? opt.alt}</span>
                  <span className="sr-only">{opt.alt}</span>
                </button>
              );
            })}
          </div>

          {feedback === 'correct' && (
            <p className="mt-6 flex items-center justify-center gap-2 rounded-2xl bg-lime-200 py-4 font-display text-xl font-bold text-emerald-900">
              <PartyPopper className="h-8 w-8" aria-hidden />
              ¡Muy bien!
            </p>
          )}
          {feedback === 'wrong' && (
            <p className="mt-6 rounded-2xl bg-amber-100 py-4 text-center font-display text-xl font-bold text-amber-950">
              ¡Intenta de nuevo! En la siguiente seguro lo logras.
            </p>
          )}

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={next}
              disabled={!answered}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl border-4 border-indigo-200 bg-indigo-600 px-6 py-4 font-bold text-white shadow-[0_6px_0_#3730a3] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50 active:translate-y-1 active:shadow-none"
            >
              <RefreshCw className="h-5 w-5" aria-hidden />
              {index + 1 < total ? 'Siguiente pregunta' : 'Ver resultado'}
            </button>
            <button
              type="button"
              onClick={() => setStage('select')}
              className="rounded-2xl border-4 border-slate-200 bg-white px-5 py-4 font-bold text-slate-700 shadow-sm hover:bg-slate-50"
            >
              Cambiar categoría
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
