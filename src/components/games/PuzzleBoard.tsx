// PuzzleBoard.tsx
// Tablero principal del juego de rompecabezas LSM.
// Gestiona: posiciones, snap magnético, detección de victoria, nueva partida.

import React, { useState, useMemo } from 'react';
import { puzzleItems } from '../../data/puzzleContent';
import { PuzzleRow } from './PuzzleRow';
import { PuzzlePiece } from './PuzzlePiece';

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function PuzzleBoard() {
  // Selecciona 4 items aleatorios
  const [items] = useState(() => shuffle(puzzleItems).slice(0, 4));
  // Estado de slots llenos por fila
  const [rows, setRows] = useState(() =>
    items.map(() => ({ letter: false, sign: false, image: false, dropped: {} as any }))
  );
  // Bandeja de piezas mezcladas
  const pieces = useMemo(() => {
    const arr: { type: 'letter' | 'sign' | 'image'; value: string; signVideo?: string; rowIdx: number }[] = [];
    items.forEach((item, idx) => {
      arr.push({ type: 'letter', value: item.label, rowIdx: idx });
      arr.push({ type: 'sign', value: 'seña', signVideo: item.signVideo, rowIdx: idx });
      arr.push({ type: 'image', value: item.imageEmoji, rowIdx: idx });
    });
    return shuffle(arr);
  }, [items]);
  // Estado de piezas usadas
  const [used, setUsed] = useState<boolean[]>(Array(12).fill(false));

  // Drag & drop handlers
  function handleDrop(rowIdx: number, type: 'letter' | 'sign' | 'image', value: string, signVideo?: string) {
    setRows((prev) => {
      const newRows = [...prev];
      if (!newRows[rowIdx][type]) {
        newRows[rowIdx][type] = true;
        if (!newRows[rowIdx].dropped) newRows[rowIdx].dropped = {};
        newRows[rowIdx].dropped[type] = type === 'sign' ? signVideo : value;
      }
      return newRows;
    });
  }

  function handleDragStart(type: 'letter' | 'sign' | 'image', value: string) {
    // Opcional: feedback visual
  }

  // Render
  return (
    <div className="flex flex-col gap-8">
      {/* Fichas horizontales */}
      {items.map((item, idx) => (
        <div
          key={item.id}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            const type = e.dataTransfer.getData('type') as 'letter' | 'sign' | 'image';
            const value = e.dataTransfer.getData('value');
            const signVideo = e.dataTransfer.getData('signVideo');
            // Solo acepta la pieza correcta en el slot correcto
            if (
              (type === 'letter' && value === item.label) ||
              (type === 'sign' && signVideo === item.signVideo) ||
              (type === 'image' && value === item.imageEmoji)
            ) {
              handleDrop(idx, type, value, signVideo);
            }
          }}
        >
          <PuzzleRow
            label={item.label}
            signVideo={item.signVideo}
            imageEmoji={item.imageEmoji}
            slots={rows[idx]}
            onDrop={() => {}}
            dropped={rows[idx].dropped}
          />
        </div>
      ))}
      {/* Bandeja de piezas */}
      <div className="flex flex-wrap justify-center gap-2 mt-8">
        {pieces.map((piece, i) =>
          !used[i] && !rows[piece.rowIdx][piece.type] ? (
            <PuzzlePiece
              key={i}
              type={piece.type}
              value={piece.type === 'sign' ? 'seña' : piece.value}
              signVideo={piece.signVideo}
              onDragStart={handleDragStart}
            />
          ) : null
        )}
      </div>
    </div>
  );
}