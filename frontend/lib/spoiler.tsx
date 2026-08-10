"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
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
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const currentTitle = BOOK_TITLES[maxBook] ?? "Unknown";

  return (
    <div
      className={`spoiler-select ${open ? "is-open" : ""} ${className}`}
      ref={rootRef}
    >
      <button
        type="button"
        className="spoiler-select__trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Spoiler protection: read up to book ${formatBookLabel(maxBook)}, ${currentTitle}`}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="spoiler-select__meta">
          <span className="spoiler-select__label">Spoilers</span>
          <span className="spoiler-select__value">
            <span className="spoiler-select__book">
              {formatBookLabel(maxBook)}
            </span>
            <span className="spoiler-select__title">{currentTitle}</span>
          </span>
        </span>
        <span className="spoiler-select__chevron" aria-hidden>
          <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
            <path
              d="M1 1l4 4 4-4"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            className="spoiler-select__menu"
            role="listbox"
            aria-label="Highest book you have read"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            <li className="spoiler-select__hint">Reveal through</li>
            {BOOK_ORDER.map((n) => {
              const active = n === maxBook;
              return (
                <li key={n} role="option" aria-selected={active}>
                  <button
                    type="button"
                    className="spoiler-select__option"
                    data-active={active}
                    onClick={() => {
                      setMaxBook(n);
                      setOpen(false);
                    }}
                  >
                    <span className="spoiler-select__option-num">
                      {formatBookLabel(n)}
                    </span>
                    <span className="spoiler-select__option-title">
                      {BOOK_TITLES[n]}
                    </span>
                    {active && (
                      <span className="spoiler-select__check" aria-hidden>
                        ✓
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
