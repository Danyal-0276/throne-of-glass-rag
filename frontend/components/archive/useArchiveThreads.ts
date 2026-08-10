"use client";

import { useCallback, useEffect, useState } from "react";

export type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  sources?: import("@/lib/api").SourceChunk[];
};

export type ChatThread = {
  id: string;
  title: string;
  createdAt: number;
  updatedAt: number;
  messages: ChatMessage[];
};

const STORAGE_KEY = "tog-archive-threads";

function uid() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

export function createEmptyThread(title = "New inquiry"): ChatThread {
  const now = Date.now();
  return {
    id: uid(),
    title,
    createdAt: now,
    updatedAt: now,
    messages: [],
  };
}

export function useArchiveThreads() {
  const [threads, setThreads] = useState<ChatThread[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as ChatThread[];
        if (Array.isArray(parsed) && parsed.length) {
          setThreads(parsed);
          setActiveId(parsed[0].id);
          setHydrated(true);
          return;
        }
      }
    } catch {
      /* ignore */
    }
    const t = createEmptyThread();
    setThreads([t]);
    setActiveId(t.id);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(threads));
    } catch {
      /* ignore */
    }
  }, [threads, hydrated]);

  const active = threads.find((t) => t.id === activeId) ?? threads[0] ?? null;

  const newThread = useCallback(() => {
    const t = createEmptyThread();
    setThreads((prev) => [t, ...prev]);
    setActiveId(t.id);
    return t;
  }, []);

  const deleteThread = useCallback(
    (id: string) => {
      setThreads((prev) => {
        const next = prev.filter((t) => t.id !== id);
        if (!next.length) {
          const t = createEmptyThread();
          setActiveId(t.id);
          return [t];
        }
        if (activeId === id) setActiveId(next[0].id);
        return next;
      });
    },
    [activeId],
  );

  const renameThread = useCallback((id: string, title: string) => {
    const trimmed = title.trim() || "Untitled";
    setThreads((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, title: trimmed, updatedAt: Date.now() } : t,
      ),
    );
  }, []);

  const updateThread = useCallback(
    (id: string, updater: (t: ChatThread) => ChatThread) => {
      setThreads((prev) =>
        prev.map((t) => (t.id === id ? updater({ ...t, updatedAt: Date.now() }) : t)),
      );
    },
    [],
  );

  return {
    threads,
    active,
    activeId,
    setActiveId,
    hydrated,
    newThread,
    deleteThread,
    renameThread,
    updateThread,
    uid,
  };
}
