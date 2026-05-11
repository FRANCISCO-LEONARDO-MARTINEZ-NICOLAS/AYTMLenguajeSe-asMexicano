// PuzzleSet.tsx
// Un "set" es la zona de destino donde deben caer las 3 piezas correctas.
// Muestra slots vacíos con silueta hasta que cada pieza encaje.

import { PieceType } from './PuzzlePiece';
import { PuzzleItem } from '../../data/puzzleContent';

interface SlotProps {
  type: PieceType;
  filled: boolean;
  content?: string;
  accentColor: string;
}

const SLOT_LABELS: Record<PieceType, string> = {
  label: 'Letra',
  sign: 'Seña',
  image: 'Imagen',
};

const SLOT_BG: Record<PieceType, string> = {
  label: 'border-indigo-200 bg-indigo-50/60',
  sign: 'border-sky-200 bg-sky-50/60',
  image: 'border-lime-200 bg-lime-50/60',
};

function Slot({ type, filled, content, accentColor }: SlotProps) {
  return (
    <div
      className={[
        'flex h-[90px] w-[90px] flex-col items-center justify-center rounded-2xl border-4 border-dashed transition-all duration-300',
        filled
          ? `border-lime-400 bg-white shadow-md ring-2 ring-lime-300`
          : SLOT_BG[type],
      ].join(' ')}
      aria-label={`Slot ${SLOT_LABELS[type]}${filled ? ' — completado' : ''}`}
    >
      {filled && content ? (
        <span className="text-4xl leading-none">{content}</span>
      ) : (
        <span className="text-2xl opacity-20">
          {type === 'label' ? '?' : type === 'sign' ? '🤚' : '🖼️'}
        </span>
      )}
      <span
        className={`mt-1 h-1.5 w-8 rounded-full ${filled ? accentColor : 'bg-slate-200'} transition-colors duration-300`}
      />
    </div>
  );
}

interface Props {
  item: PuzzleItem;
  lockedTypes: Set<PieceType>;
}

export function PuzzleSet({ item, lockedTypes }: Props) {
  const slots: PieceType[] = ['label', 'sign', 'image'];
  const contents: Record<PieceType, string> = {
    label: item.label,
    sign: item.signEmoji,
    image: item.imageEmoji,
  };

  const allDone = slots.every((t) => lockedTypes.has(t));

  return (
    <div
      className={[
        'flex flex-col items-center gap-2 rounded-3xl border-4 p-3 transition-all duration-500',
        allDone
          ? 'border-lime-400 bg-lime-50 shadow-lg shadow-lime-200'
          : 'border-white bg-white/80 shadow-md',
      ].join(' ')}
      aria-label={`Set de ${item.label}`}
    >
      {/* Nombre del set */}
      <span
        className={[
          'rounded-full px-3 py-0.5 text-xs font-bold uppercase tracking-wider',
          allDone ? 'bg-lime-200 text-emerald-800' : 'bg-slate-100 text-slate-500',
        ].join(' ')}
      >
        {allDone ? '¡Completado! 🎉' : item.label}
      </span>

      {/* Slots en fila */}
      <div className="flex gap-2">
        {slots.map((t) => (
          <Slot
            key={t}
            type={t}
            filled={lockedTypes.has(t)}
            content={contents[t]}
            accentColor={item.accentColor}
          />
        ))}
      </div>
    </div>
  );
}