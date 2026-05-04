import { useCallback, useRef } from 'react';

/**
 * Tonos simples con Web Audio API (sin archivos externos).
 * Respeta preferencia del usuario: si reduce movimiento/sonido del SO, igual suena;
 * para silenciar del todo se puede añadir un toggle en UI más adelante.
 */
export function useFeedbackSound() {
  const ctxRef = useRef<AudioContext | null>(null);

  const getCtx = useCallback(() => {
    if (!ctxRef.current) {
      ctxRef.current = new AudioContext();
    }
    return ctxRef.current;
  }, []);

  const playTone = useCallback(
    (freq: number, duration: number, type: OscillatorType = 'sine') => {
      try {
        const ctx = getCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = type;
        osc.frequency.value = freq;
        gain.gain.value = 0.12;
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + duration);
      } catch {
        /* sin audio en algunos entornos */
      }
    },
    [getCtx]
  );

  const playCorrect = useCallback(() => {
    playTone(523.25, 0.12, 'triangle');
    setTimeout(() => playTone(659.25, 0.14, 'triangle'), 90);
    setTimeout(() => playTone(783.99, 0.18, 'triangle'), 200);
  }, [playTone]);

  const playWrong = useCallback(() => {
    playTone(200, 0.15, 'sawtooth');
    setTimeout(() => playTone(180, 0.2, 'sawtooth'), 120);
  }, [playTone]);

  const playFlip = useCallback(() => {
    playTone(440, 0.06, 'square');
  }, [playTone]);

  const playMatch = useCallback(() => {
    playTone(880, 0.1, 'sine');
    setTimeout(() => playTone(1174.66, 0.15, 'sine'), 80);
  }, [playTone]);

  return { playCorrect, playWrong, playFlip, playMatch };
}
