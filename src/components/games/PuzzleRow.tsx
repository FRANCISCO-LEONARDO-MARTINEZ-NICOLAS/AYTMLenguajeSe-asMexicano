// PuzzleRow.tsx
// Componente de ficha horizontal con slots para letra, video y emoji imagen
import React from 'react';

interface PuzzleRowProps {
  label: string;
  signVideo: string;
  imageEmoji: string;
  slots: { letter: boolean; sign: boolean; image: boolean };
  onDrop: (type: 'letter' | 'sign' | 'image', value: any) => void;
  dropped: { letter?: string; sign?: string; image?: string };
}

export function PuzzleRow({ label, signVideo, imageEmoji, slots, onDrop, dropped }: PuzzleRowProps) {
  return (
    <div className="relative flex items-center w-full max-w-2xl mx-auto my-4">
      {/* SVG de fondo con "dientes" y "huecos" */}
      <svg width="420" height="120" viewBox="0 0 420 120" className="absolute left-0 top-0 z-0">
        <rect x="0" y="0" width="420" height="120" rx="32" fill="#fff" stroke="#222" strokeWidth="6" />
        {/* Puedes agregar más detalles SVG aquí para los "dientes" */}
      </svg>
      {/* Slots */}
      <div className="relative z-10 flex w-full h-[120px]">
        {/* Letra */}
        <div className="flex-1 flex items-center justify-center">
          {slots.letter ? (
            <span className="text-6xl font-extrabold text-black drop-shadow-lg">{dropped.letter}</span>
          ) : (
            <div className="w-20 h-20 flex items-center justify-center border-2 border-dashed border-gray-400 rounded-xl bg-gray-50">Letra</div>
          )}
        </div>
        {/* Video */}
        <div className="flex-1 flex items-center justify-center">
          {slots.sign ? (
            <video src={signVideo} width={80} height={80} controls className="rounded-xl border-2 border-black bg-black" />
          ) : (
            <div className="w-20 h-20 flex items-center justify-center border-2 border-dashed border-gray-400 rounded-xl bg-gray-50">Seña</div>
          )}
        </div>
        {/* Imagen */}
        <div className="flex-1 flex items-center justify-center">
          {slots.image ? (
            <span className="text-5xl drop-shadow-lg">{imageEmoji}</span>
          ) : (
            <div className="w-20 h-20 flex items-center justify-center border-2 border-dashed border-gray-400 rounded-xl bg-gray-50">Imagen</div>
          )}
        </div>
      </div>
    </div>
  );
}
