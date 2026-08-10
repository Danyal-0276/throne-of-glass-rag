"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { BOOK_ORDER, BOOK_TITLES, formatBookLabel } from "@/content/timeline";

const STORAGE_KEY = "tog-max-book";
const MIN_BOOK = 0.5;
const MAX_BOOK = 7;

type SpoilerContextValue = {
  maxBook: number;
  setMaxBook: (n: number) => void;
  canReveal: (minBook: number) => boolean;
};

const SpoilerContext = createContext<SpoilerContextValue | null>(null);

function clampBook(n: number) {
  if (Number.isNaN(n)) return 1;
  return Math.min(MAX_BOOK, Math.max(MIN_BOOK, n));
}

export function SpoilerProvider({ children }: { children: ReactNode }) {
  const [maxBook, setMaxBookState] = useState(1);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const n = raw ? parseFloat(raw) : 1;
      if (n >= MIN_BOOK && n <= MAX_BOOK) setMaxBookState(n);
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  const setMaxBook = useCallback((n: number) => {
    const clamped = clampBook(n);
    setMaxBookState(clamped);
    try {
      localStorage.setItem(STORAGE_KEY, String(clamped));
    } catch {
      /* ignore */
    }
  }, []);

  const canReveal = useCallback(
    (minBook: number) => minBook <= maxBook,
    [maxBook],
  );

  const value = useMemo(
    () => ({ maxBook, setMaxBook, canReveal }),
    [maxBook, setMaxBook, canReveal],
  );

  if (!ready) {
    return (
      <SpoilerContext.Provider value={value}>{children}</SpoilerContext.Provider>
    );
  }

  return (
    <SpoilerContext.Provider value={value}>{children}</SpoilerContext.Provider>
  );
}

export function useSpoiler() {
  const ctx = useContext(SpoilerContext);
  if (!ctx) throw new Error("useSpoiler must be used within SpoilerProvider");
  return ctx;
}

export function SpoilerSelect({ className = "" }: { className?: string }) {
  const { maxBook, setMaxBook } = useSpoiler();

  return (
    <label className={`spoiler-select ${className}`}>
      <span className="spoiler-select__label">Read up to</span>
      <select
        value={String(maxBook)}
        onChange={(e) => setMaxBook(Number(e.target.value))}
        aria-label="Spoiler protection — highest book you've read"
      >
        {BOOK_ORDER.map((n) => (
          <option key={n} value={n}>
            {formatBookLabel(n)}. {BOOK_TITLES[n]}
          </option>
        ))}
      </select>
    </label>
  );
}
