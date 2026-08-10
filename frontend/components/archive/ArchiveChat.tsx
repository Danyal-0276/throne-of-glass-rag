"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
} from "react";
import Link from "next/link";
import { askStream, type SourceChunk } from "@/lib/api";
import { useSpoiler } from "@/lib/spoiler";
import { getCharacter } from "@/content/characters";
import SourceCards from "./SourceCards";
import {
  useArchiveThreads,
  type ChatMessage,
} from "./useArchiveThreads";

const STARTERS = [
  "Who is Aelin Galathynius?",
  "Tell me about Rifthold",
  "What happened in Endovier?",
  "Who are the Thirteen?",
  "Explain the Wyrdkeys",
];

const FOLLOWUPS = [
  "Tell me more",
  "Which book?",
  "Who else is involved?",
  "Keep spoilers light",
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
    el.style.height = `${Math.min(el.scrollHeight, 200)}px`;
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
      setSidebarOpen(false);

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
      {sidebarOpen && (
        <button
          type="button"
          className="archive-scrim"
          aria-label="Close sidebar"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside className={`archive-sidebar ${sidebarOpen ? "is-open" : ""}`}>
        <Link href="/" className="archive-home">
          ← Throne of Glass
        </Link>
        <button type="button" className="archive-new" onClick={() => newThread()}>
          <span aria-hidden>+</span> New chat
        </button>
        <div className="archive-thread-list">
          {threads.map((t) => (
            <div
              key={t.id}
              className={`thread-row ${t.id === activeId ? "is-active" : ""}`}
            >
              <button
                type="button"
                className="thread-item"
                onClick={() => {
                  setActiveId(t.id);
                  setSidebarOpen(false);
                }}
              >
                {t.title}
              </button>
              <div className="thread-row__ops">
                <button
                  type="button"
                  title="Rename"
                  onClick={() => {
                    const next = window.prompt("Rename chat", t.title);
                    if (next != null) renameThread(t.id, next);
                  }}
                >
                  ✎
                </button>
                <button
                  type="button"
                  title="Delete"
                  onClick={() => {
                    if (window.confirm("Delete this chat?")) deleteThread(t.id);
                  }}
                >
                  ×
                </button>
              </div>
            </div>
          ))}
        </div>
        <p className="archive-sidebar__hint">Spoiler gate: book {maxBook}</p>
      </aside>

      <section className="archive-main">
        <header className="archive-topbar">
          <button
            type="button"
            className="archive-icon-btn archive-topbar__menu"
            onClick={() => setSidebarOpen((v) => !v)}
            aria-label="Chats"
          >
            ☰
          </button>
          <div className="archive-topbar__title">
            <span className="archive-topbar__name">Archive</span>
            <span className="archive-topbar__meta">Through book {maxBook}</span>
          </div>
          <button
            type="button"
            className="archive-icon-btn"
            onClick={() => newThread()}
            aria-label="New chat"
          >
            +
          </button>
        </header>

        <div className="messages">
          {showStarters ? (
            <div className="empty-archive">
              <p className="empty-archive__kicker">Throne of Glass</p>
              <h2>How can I help you today?</h2>
              <p>
                Ask about characters, places, and events. Answers stay within
                your spoiler setting.
              </p>
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
            </div>
          ) : (
            active.messages.map((m, idx) => (
              <div
                key={m.id}
                className={`msg-row ${m.role === "user" ? "msg-row--user" : "msg-row--assistant"}`}
              >
                <div className="msg-row__inner">
                  <div className="msg-avatar" aria-hidden>
                    {m.role === "user" ? "You" : "A"}
                  </div>
                  <div className="msg-body">
                    <div className="msg-label">
                      {m.role === "user" ? "You" : "Archive"}
                    </div>
                    <div className="msg-text">
                      {m.content ||
                        (streaming && m.role === "assistant" ? (
                          <span className="msg-typing">Thinking…</span>
                        ) : (
                          ""
                        ))}
                      {streaming &&
                        m.role === "assistant" &&
                        m.content &&
                        idx === active.messages.length - 1 && (
                          <span className="msg-caret" aria-hidden />
                        )}
                    </div>
                    {m.role === "assistant" &&
                      m.sources &&
                      m.sources.length > 0 && (
                        <SourceCards sources={m.sources} />
                      )}
                    {m.role === "assistant" && m.content && (
                      <div className="msg__actions">
                        <button
                          type="button"
                          onClick={() => void copyText(m.content)}
                        >
                          Copy
                        </button>
                        <button
                          type="button"
                          onClick={() => regenerate(idx)}
                          disabled={streaming}
                        >
                          Regenerate
                        </button>
                      </div>
                    )}
                    {m.role === "assistant" &&
                      m.content &&
                      !streaming &&
                      idx === active.messages.length - 1 && (
                        <div className="followups">
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
                </div>
              </div>
            ))
          )}
          <div ref={bottomRef} />
        </div>

        {error && <p className="archive-error">{error}</p>}

        <div className="composer">
          <form className="composer__shell" onSubmit={onSubmit}>
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder="Message the archive…"
              rows={1}
              disabled={streaming && !input}
              aria-label="Message the archive"
            />
            {streaming ? (
              <button type="button" className="composer__send" onClick={stop}>
                Stop
              </button>
            ) : (
              <button
                type="submit"
                className="composer__send"
                disabled={!input.trim()}
                aria-label="Send"
              >
                ↑
              </button>
            )}
          </form>
          <p className="composer__footnote">
            Unofficial fan archive. Answers are drawn from indexed passages.
          </p>
        </div>
      </section>
    </div>
  );
}
