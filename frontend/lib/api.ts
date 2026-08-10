export type HistoryTurn = {
  role: "user" | "assistant" | string;
  content: string;
};

export type SourceChunk = {
  text: string;
  source: string;
  distance: number;
  book_number?: number | null;
  chunk_index?: number | null;
};

export type AskStreamHandlers = {
  onSources?: (sources: SourceChunk[], expandedQuery?: string | null) => void;
  onToken?: (token: string) => void;
  onDone?: () => void;
  onError?: (error: string) => void;
};

const API_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ||
  "http://localhost:8000";

export function getApiUrl() {
  return API_URL;
}

export async function askStream(
  body: {
    question: string;
    history?: HistoryTurn[];
    max_book?: number;
  },
  handlers: AskStreamHandlers,
  signal?: AbortSignal,
): Promise<void> {
  const res = await fetch(`${API_URL}/ask/stream`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "text/event-stream" },
    body: JSON.stringify(body),
    signal,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    handlers.onError?.(text || `Request failed (${res.status})`);
    return;
  }

  if (!res.body) {
    handlers.onError?.("No response body from archive.");
    return;
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  const dispatch = (event: string, dataRaw: string) => {
    let data: Record<string, unknown> = {};
    try {
      data = dataRaw ? JSON.parse(dataRaw) : {};
    } catch {
      data = { raw: dataRaw };
    }

    if (event === "sources") {
      handlers.onSources?.(
        (data.sources as SourceChunk[]) || [],
        (data.expanded_query as string | null | undefined) ?? null,
      );
    } else if (event === "token") {
      const token = (data.token as string) ?? "";
      if (token) handlers.onToken?.(token);
    } else if (event === "done") {
      handlers.onDone?.();
    } else if (event === "error") {
      handlers.onError?.((data.error as string) || "Unknown stream error");
    }
  };

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });

    const parts = buffer.split("\n\n");
    buffer = parts.pop() ?? "";

    for (const part of parts) {
      if (!part.trim()) continue;
      let event = "message";
      const dataLines: string[] = [];
      for (const line of part.split("\n")) {
        if (line.startsWith("event:")) event = line.slice(6).trim();
        else if (line.startsWith("data:")) dataLines.push(line.slice(5).trim());
      }
      dispatch(event, dataLines.join("\n"));
    }
  }

  if (buffer.trim()) {
    let event = "message";
    const dataLines: string[] = [];
    for (const line of buffer.split("\n")) {
      if (line.startsWith("event:")) event = line.slice(6).trim();
      else if (line.startsWith("data:")) dataLines.push(line.slice(5).trim());
    }
    dispatch(event, dataLines.join("\n"));
  }
}

export async function healthCheck(): Promise<{
  status: string;
  chunks?: number;
}> {
  const res = await fetch(`${API_URL}/health`);
  if (!res.ok) throw new Error(`Health check failed (${res.status})`);
  return res.json();
}
