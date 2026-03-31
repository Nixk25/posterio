"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";

type SoundContextType = {
  isMuted: boolean;
  toggleMute: () => void;
  playClick: () => void;
  playHover: () => void;
  playSuccess: () => void;
};

const SoundContext = createContext<SoundContextType>({
  isMuted: true,
  toggleMute: () => {},
  playClick: () => {},
  playHover: () => {},
  playSuccess: () => {},
});

export const SoundProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMuted, setIsMuted] = useState(true);
  const isMutedRef = useRef(true);
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("posterio-muted");
    if (stored === "false") {
      setIsMuted(false);
      isMutedRef.current = false;
    }
  }, []);

  const getAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext();
    }
    if (audioContextRef.current.state === "suspended") {
      audioContextRef.current.resume();
    }
    return audioContextRef.current;
  }, []);

  const playTone = useCallback((frequency: number, duration: number, volume: number = 0.08) => {
    if (isMutedRef.current) return;
    try {
      const ctx = getAudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.value = frequency;
      gain.gain.value = volume;
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + duration);
    } catch {
      // Silently fail if AudioContext is not available
    }
  }, [getAudioContext]);

  const toggleMute = useCallback(() => {
    const next = !isMutedRef.current;
    isMutedRef.current = next;
    setIsMuted(next);
    localStorage.setItem("posterio-muted", String(next));
    if (!next) {
      playTone(600, 0.1, 0.05);
    }
  }, [playTone]);

  const playClick = useCallback(() => playTone(800, 0.08, 0.06), [playTone]);
  const playHover = useCallback(() => playTone(600, 0.05, 0.03), [playTone]);
  const playSuccess = useCallback(() => {
    playTone(523, 0.1, 0.06);
    setTimeout(() => playTone(659, 0.1, 0.06), 80);
    setTimeout(() => playTone(784, 0.15, 0.06), 160);
  }, [playTone]);

  // Global click sound on all interactive elements
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      if (isMutedRef.current) return;
      const target = e.target as HTMLElement;
      const interactive = target.closest("button, a, [role='button'], input[type='checkbox'], input[type='radio'], [tabindex]");
      if (interactive) {
        playClick();
      }
    };

    document.addEventListener("click", handleGlobalClick);
    return () => document.removeEventListener("click", handleGlobalClick);
  }, [playClick]);

  return (
    <SoundContext.Provider value={{ isMuted, toggleMute, playClick, playHover, playSuccess }}>
      {children}
    </SoundContext.Provider>
  );
};

export const useSound = () => useContext(SoundContext);
