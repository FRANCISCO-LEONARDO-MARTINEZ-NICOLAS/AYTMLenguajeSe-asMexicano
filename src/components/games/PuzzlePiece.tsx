// PuzzlePiece.tsx
// Pieza individual del rompecabezas — arrastrable con mouse y touch

import React from 'react';

interface PuzzlePieceProps {
  type: 'letter' | 'sign' | 'image';
  value: string;
  signVideo?: string;
  onDragStart: (type: 'letter' | 'sign' | 'image', value: string) => void;
}

export function PuzzlePiece({ type, value, signVideo, onDragStart }: PuzzlePieceProps) {
  return (
    <div
      className="w-20 h-20 m-2 flex items-center justify-center rounded-xl border-4 border-black bg-white shadow-lg cursor-grab hover:scale-105 transition-transform"
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData('type', type);
        e.dataTransfer.setData('value', value);
        if (signVideo) e.dataTransfer.setData('signVideo', signVideo);
        onDragStart(type, value);
      }}
    >
      {type === 'letter' && <span className="text-4xl font-extrabold text-black">{value}</span>}
      {type === 'sign' && signVideo && (
        <video src={signVideo} width={60} height={60} className="rounded" />
      )}
      {type === 'image' && <span className="text-3xl">{value}</span>}
    </div>
  );
}