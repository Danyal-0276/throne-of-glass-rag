"use client";

import dynamic from "next/dynamic";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
} from "react";
import { askStream, type SourceChunk } from "@/lib/api";
import { useSpoiler } from "@/lib/spoiler";
import { getCharacter } from "@/content/characters";
import SourceCards from "./SourceCards";
import {
  useArchiveThreads,
  type ChatMessage,
} from "./useArchiveThreads";

const EmberField = dynamic(() => import("@/components/EmberField"), {
  ssr: false,
});

const STARTERS = [
  "Who is Aelin Galathynius?",
  "Tell me about Rifthold",
  "What happened in Endovier?",
  "Who are the Thirteen?",
  "Explain the Wyrdkeys",
];

const FOLLOWUPS = [
  "Tell me more about that",
  "Which book does this happen in?",
  "Who else is involved?",
  "Summarize without major spoilers",
];

type Props = {
  initialQuery?: string;
  characterSlug?: string;
};

export default function ArchiveChat({ initialQuery, characterSlug }: Props) {
  const { maxBook } = useSpoiler();
  const {
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
  } = useArchiveThreads();

  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const primedRef = useRef(false);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [active?.messages, streaming]);

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 180)}px`;
  }, [input]);

  const stop = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
    setStreaming(false);
  }, []);

  const send = useCallback(
    async (questionRaw: string, opts?: { regenerateFrom?: ChatMessage[] }) => {
      const question = questionRaw.trim();
      if (!question || streaming) return;

      let thread = active;
      if (!thread) {
        thread = newThread();
      }
      const threadId = thread.id;

      const prior =
        opts?.regenerateFrom ??
        thread.messages.filter((m) => m.role === "user" || m.role === "assistant");

      const userMsg: ChatMessage = {
        id: uid(),
        role: "user",
        content: question,
      };
      const assistantId = uid();
      const assistantMsg: ChatMessage = {
        id: assistantId,
        role: "assistant",
        content: "",
        sources: [],
      };

      const baseMessages = opts?.regenerateFrom
        ? [...opts.regenerateFrom, userMsg, assistantMsg]
        : [...prior, userMsg, assistantMsg];

      const title =
        thread.messages.length === 0 || thread.title === "New inquiry"
          ? question.slice(0, 48)
          : thread.title;

      updateThread(threadId, (t) => ({
        ...t,
        title,
        messages: baseMessages,
      }));
      setInput("");
      setError(null);
      setStreaming(true);

      const history = prior
        .filter((m) => m.content)
        .map((m) => ({ role: m.role, content: m.content }));

      const controller = new AbortController();
      abortRef.current = controller;

      let full = "";
      let sources: SourceChunk[] = [];

      try {
        await askStream(
          {
            question,
            history,
            max_book: maxBook,
          },
          {
            onSources: (s) => {
              sources = s;
              updateThread(threadId, (t) => ({
                ...t,
                messages: t.messages.map((m) =>
                  m.id === assistantId ? { ...m, sources: s } : m,
                ),
              }));
            },
            onToken: (token) => {
              full += token;
              const snapshot = full;
              updateThread(threadId, (t) => ({
                ...t,
                messages: t.messages.map((m) =>
                  m.id === assistantId
                    ? { ...m, content: snapshot, sources }
                    : m,
                ),
              }));
            },
            onDone: () => {
              setStreaming(false);
              abortRef.current = null;
            },
            onError: (err) => {
              setError(err);
              updateThread(threadId, (t) => ({
                ...t,
                messages: t.messages.map((m) =>
                  m.id === assistantId
                    ? {
                        ...m,
                        content:
                          m.content ||
                          "The archive could not answer. Check that the API is running.",
                      }
                    : m,
                ),
              }));
              setStreaming(false);
              abortRef.current = null;
            },
          },
          controller.signal,
        );
      } catch (e) {
        if ((e as Error).name !== "AbortError") {
          setError((e as Error).message || "Stream interrupted");
        }
        setStreaming(false);
        abortRef.current = null;
      }
    },
    [active, streaming, maxBook, newThread, updateThread, uid],
  );

  useEffect(() => {
    if (!hydrated || primedRef.current) return;
    let q = initialQuery?.trim() || "";
    if (!q && characterSlug) {
      const c = getCharacter(characterSlug);
      if (c) q = c.askPrompt;
    }
    if (q) {
      primedRef.current = true;
      setInput(q);
      void send(q);
    }
  }, [hydrated, initialQuery, characterSlug, send]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    void send(input);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void send(input);
    }
  };

  const copyText = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      /* ignore */
    }
  };

  const regenerate = (msgIndex: number) => {
    if (!active || streaming) return;
    const msgs = active.messages;
    const assistant = msgs[msgIndex];
    if (!assistant || assistant.role !== "assistant") return;
    let userIdx = msgIndex - 1;
    while (userIdx >= 0 && msgs[userIdx].role !== "user") userIdx--;
    if (userIdx < 0) return;
    const question = msgs[userIdx].content;
    const prior = msgs.slice(0, userIdx);
    void send(question, { regenerateFrom: prior });
  };

  if (!hydrated || !active) {
    return (
      <div className="archive-shell">
        <div className="empty-archive">Opening the archive…</div>
      </div>
    );
  }

  const showStarters = active.messages.length === 0 && !streaming;

  return (
    <div className="archive-shell">
      <aside className={`archive-sidebar ${sidebarOpen ? "is-open" : ""}`}>
        <button type="button" className="btn" onClick={() => newThread()}>
          New inquiry
        </button>
        <div style={{ overflowY: "auto", flex: 1, display: "flex", flexDirection: "column", gap: "0.35rem" }}>
          {threads.map((t) => (
            <div key={t.id} style={{ display: "flex", gap: "0.25rem", alignItems: "center" }}>
              <button
                type="button"
                className={`thread-item ${t.id === activeId ? "is-active" : ""}`}
                onClick={() => {
                  setActiveId(t.id);
                  setSidebarOpen(false);
                }}
                style={{ flex: 1 }}
              >
                {t.title}
              </button>
              <button
                type="button"
                className="btn btn--ghost"
                style={{ padding: "0.35rem 0.45rem", fontSize: "0.7rem" }}
                title="Rename"
                onClick={() => {
                  const next = window.prompt("Rename thread", t.title);
                  if (next != null) renameThread(t.id, next);
                }}
              >
                ✎
              </button>
              <button
                type="button"
                className="btn btn--ghost"
                style={{ padding: "0.35rem 0.45rem", fontSize: "0.7rem" }}
                title="Delete"
                onClick={() => {
                  if (window.confirm("Delete this thread?")) deleteThread(t.id);
                }}
              >
                ×
              </button>
            </div>
          ))}
        </div>
        <p style={{ fontSize: "0.7rem", color: "rgba(232,220,200,0.45)", margin: 0 }}>
          Spoiler gate: book {maxBook}. Change in the nav.
        </p>
      </aside>

      <section className="archive-main">
        <EmberField count={55} />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0.65rem 1rem",
            borderBottom: "1px solid var(--border-soft)",
            zIndex: 2,
            position: "relative",
          }}
        >
          <button
            type="button"
            className="btn btn--ghost"
            style={{ display: "none" }}
            onClick={() => setSidebarOpen((v) => !v)}
            id="archive-sidebar-toggle"
          >
            Threads
          </button>
          <style>{`
            @media (max-width: 900px) {
              #archive-sidebar-toggle { display: inline-flex !important; }
            }
          `}</style>
          <h1
            className="font-display"
            style={{ margin: 0, fontSize: "1.15rem", color: "var(--ember-bright)" }}
          >
            The Archive
          </h1>
          <span style={{ fontSize: "0.75rem", color: "var(--gold)" }}>
            Through book {maxBook}
          </span>
        </div>

        <div className="messages">
          {showStarters && (
            <div className="empty-archive">
              <h2 className="font-display">Ask the tomes</h2>
              <p>
                Inquire about characters, places, and events — answers are drawn
                from the indexed archive and limited by your spoiler setting.
              </p>
            </div>
          )}

          {active.messages.map((m, idx) => (
            <div
              key={m.id}
              className={`msg ${m.role === "user" ? "msg--user" : "msg--assistant"}`}
            >
              <div style={{ whiteSpace: "pre-wrap", position: "relative", zIndex: 1 }}>
                {m.content || (streaming && m.role === "assistant" ? "…" : "")}
              </div>
              {m.role === "assistant" && m.sources && m.sources.length > 0 && (
                <SourceCards sources={m.sources} />
              )}
              {m.role === "assistant" && m.content && (
                <div className="msg__actions">
                  <button type="button" onClick={() => void copyText(m.content)}>
                    Copy
                  </button>
                  <button type="button" onClick={() => regenerate(idx)} disabled={streaming}>
                    Regenerate
                  </button>
                </div>
              )}
              {m.role === "assistant" &&
                m.content &&
                !streaming &&
                idx === active.messages.length - 1 && (
                  <div className="msg__actions" style={{ marginTop: "0.4rem" }}>
                    {FOLLOWUPS.map((f) => (
                      <button
                        key={f}
                        type="button"
                        className="followup-chip"
                        onClick={() => void send(f)}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                )}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {error && (
          <p
            style={{
              color: "#e8a05c",
              fontSize: "0.85rem",
              textAlign: "center",
              margin: "0 1rem 0.5rem",
              zIndex: 2,
              position: "relative",
            }}
          >
            {error}
          </p>
        )}

        <div className="composer">
          {showStarters && (
            <div className="starters">
              {STARTERS.map((s) => (
                <button
                  key={s}
                  type="button"
                  className="starter-chip"
                  onClick={() => void send(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          )}
          <form className="composer__row" onSubmit={onSubmit}>
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder="Ask the archive…"
              rows={1}
              disabled={streaming && !input}
              aria-label="Message the archive"
            />
            {streaming ? (
              <button type="button" className="btn" onClick={stop}>
                Stop
              </button>
            ) : (
              <button type="submit" className="btn" disabled={!input.trim()}>
                Send
              </button>
            )}
          </form>
        </div>
      </section>
    </div>
  );
}
