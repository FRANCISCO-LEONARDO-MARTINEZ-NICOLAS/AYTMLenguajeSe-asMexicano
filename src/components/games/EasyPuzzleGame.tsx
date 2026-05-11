// EasyPuzzleGame.tsx
// Juego de asociación ultra sencillo: una ficha a la vez, piezas grandes, feedback positivo
import { useState, ReactNode } from 'react';
import { puzzleItems } from '../../data/puzzleContent';

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const POSITIVE_MSGS = [
  '¡Muy bien! 🌟',
  '¡Excelente! 🎉',
  '¡Sigue así! 💪',
  '¡Perfecto! 🎯',
];

export function EasyPuzzleGame() {
  const [order] = useState(() => shuffle(puzzleItems));
  const [idx, setIdx] = useState(0);
  const [slots, setSlots] = useState({ letter: false, sign: false, image: false });
  const [dropped, setDropped] = useState({ letter: '', sign: '', image: '' });
  const [msg, setMsg] = useState('');
  const [completed, setCompleted] = useState(false);

  const item = order[idx];
  // Mezcla piezas para la bandeja
  const pieces = shuffle([
    { type: 'letter', value: item.label },
    { type: 'sign', value: 'seña', signVideo: item.signVideo },
    { type: 'image', value: item.imageEmoji },
  ]);

  function handleDrop(type: 'letter' | 'sign' | 'image', value: string, signVideo?: string) {
    setSlots((prev) => ({ ...prev, [type]: true }));
    setDropped((prev) => ({ ...prev, [type]: type === 'sign' ? signVideo : value }));
    setMsg(POSITIVE_MSGS[Math.floor(Math.random() * POSITIVE_MSGS.length)]);
    setTimeout(() => setMsg(''), 1000);
    // Si ya están todos, mostrar celebración
    setTimeout(() => {
      if (Object.values({ ...slots, [type]: true }).every(Boolean)) {
        setCompleted(true);
        setTimeout(() => {
          setCompleted(false);
          setSlots({ letter: false, sign: false, image: false });
          setDropped({ letter: '', sign: '', image: '' });
          setIdx((i) => (i + 1) % order.length);
        }, 1500);
      }
    }, 800);
  }

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="relative flex items-center w-full max-w-xl mx-auto my-4">
        <div className="flex w-full h-[260px] items-center justify-center">
          {/* Letra */}
          <DropSlot
            filled={slots.letter}
            onDrop={(value: string) =>
              value === item.label && !slots.letter && handleDrop('letter', value, undefined)
            }
          >
            {slots.letter ? (
              <span className="text-6xl font-extrabold text-black drop-shadow-lg">{dropped.letter}</span>
            ) : (
              <span className="text-2xl text-gray-400">Letra</span>
            )}
          </DropSlot>
          {/* Video */}
          <DropSlot
            filled={slots.sign}
            onDrop={(_, signVideo) =>
              signVideo === item.signVideo && !slots.sign && handleDrop('sign', 'seña', signVideo)
            }
          >
            {slots.sign ? (
              <video
                src={item.signVideo}
                autoPlay
                loop
                muted
                playsInline
                className="rounded-3xl border-4 border-black bg-black shadow-2xl object-contain"
                style={{ maxHeight: 240, maxWidth: 340, width: '100%', height: '100%', display: 'block', margin: '0 auto' }}
              />
            ) : (
              <span className="text-2xl text-gray-400">Seña</span>
            )}
          </DropSlot>
          {/* Imagen */}
          <DropSlot
            filled={slots.image}
            onDrop={(value: string) =>
              value === item.imageEmoji && !slots.image && handleDrop('image', value, undefined)
            }
          >
            {slots.image ? (
              <span className="text-5xl drop-shadow-lg">{dropped.image}</span>
            ) : (
              <span className="text-2xl text-gray-400">Imagen</span>
            )}
          </DropSlot>
        </div>
        {completed && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-20 animate-pulse">
            <span className="text-3xl font-bold text-lime-700">¡Completado! 🎉</span>
          </div>
        )}
      </div>
      {/* Bandeja de piezas */}
      <div className="flex flex-wrap justify-center gap-8 mt-8">
        {pieces.map((piece, i) => {
          if ((piece.type === 'letter' && !slots.letter) || (piece.type === 'sign' && !slots.sign) || (piece.type === 'image' && !slots.image)) {
            return (
              <DraggablePiece
                key={i}
                type={piece.type}
                value={piece.value}
                signVideo={piece.signVideo}
              />
            );
          }
          return null;
        })}
      </div>
      {/* Mensaje positivo */}
      {msg && (
        <div className="fixed bottom-10 left-0 right-0 flex justify-center z-50">
          <span className="bg-lime-200 text-lime-900 px-6 py-3 rounded-2xl text-2xl font-bold shadow-lg animate-bounce">
            {msg}
          </span>
        </div>
      )}
    </div>
  );
}

// DropSlot: área grande para soltar piezas
interface DropSlotProps {
  filled: boolean;
  onDrop: (value: string, signVideo?: string) => void;
  children: ReactNode;
}

function DropSlot({ filled, onDrop, children }: DropSlotProps) {
  return (
    <div
      className={`flex-1 flex flex-col items-center justify-center mx-2 h-full transition-all duration-200 ${
        filled ? 'bg-lime-100 border-lime-400' : 'bg-white border-dashed border-gray-300'
      } border-4 rounded-2xl min-w-[140px] min-h-[220px]`}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        const value = e.dataTransfer.getData('value');
        const signVideo = e.dataTransfer.getData('signVideo');
        onDrop(value, signVideo);
      }}
    >
      <div className="flex items-center justify-center w-full h-full">{children}</div>
    </div>
  );
}

// DraggablePiece: pieza grande y fácil de arrastrar
interface DraggablePieceProps {
  type: string;
  value: string;
  signVideo?: string;
}

function DraggablePiece({ type, value, signVideo }: DraggablePieceProps) {
  return (
    <div
      className="w-28 h-28 flex items-center justify-center rounded-2xl border-4 border-black bg-white shadow-xl cursor-grab hover:scale-110 transition-transform text-4xl font-extrabold"
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData('type', type);
        e.dataTransfer.setData('value', value);
        if (signVideo) e.dataTransfer.setData('signVideo', signVideo);
      }}
    >
      {type === 'letter' && <span>{value}</span>}
      {type === 'sign' && signVideo && (
        <video
          src={signVideo}
          autoPlay
          loop
          muted
          playsInline
          className="rounded-3xl border-4 border-black bg-black shadow-2xl object-contain w-full h-full max-h-[180px] max-w-[180px] mx-auto block"
        />
      )}
      {type === 'image' && <span>{value}</span>}
    </div>
  );
}
