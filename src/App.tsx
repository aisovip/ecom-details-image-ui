import { useState, useRef, useCallback, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import type { Attachment, ChatMessage, SSEEvent } from "./types";

function getOrCreateConversationId(): string {
  const KEY = "ecom_image_chat_id";
  let id = localStorage.getItem(KEY);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(KEY, id);
  }
  return id;
}

export default function App() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "你好，我是 **EcomImageChat**，AI 电商视觉创作助手。\n\n告诉我你的产品和图片需求，比如：\n- 「帮我**生成**一款蓝色蓝牙耳机的白底主图」\n- 「设计一款咖啡杯的小红书风格图，**直接出图**」\n- 「为我做一个护肤品的详情页信息图」\n\n带「生图 / 生成 / 出图」关键词会自动调用 GPT-Image-2。",
      timestamp: Date.now(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [attachment, setAttachment] = useState<Attachment | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const abortRef = useRef<AbortController | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const dispatch = useCallback((ev: SSEEvent) => {
    setMessages((prev) => {
      const next = [...prev];
      switch (ev.type) {
        case "ai_response": {
          const last = next[next.length - 1];
          if (last && last.role === "assistant" && !last.toolName && !last.images?.length) {
            next[next.length - 1] = {
              ...last,
              content: last.content + (ev.content || ""),
            };
          } else {
            next.push({
              id: crypto.randomUUID(),
              role: "assistant",
              content: ev.content || "",
              timestamp: Date.now(),
            });
          }
          break;
        }
        case "tool_call": {
          next.push({
            id: crypto.randomUUID(),
            role: "system",
            content: "",
            toolName: ev.name || "tool",
            toolStatus: "running",
            timestamp: Date.now(),
          });
          break;
        }
        case "tool_result": {
          for (let i = next.length - 1; i >= 0; i--) {
            const m = next[i];
            if (m.toolName === ev.name && m.toolStatus === "running") {
              next[i] = {
                ...m,
                toolStatus: "done",
                toolDetail: (m.toolDetail || "") + (ev.content || ""),
              };
              break;
            }
          }
          break;
        }
        case "file_output": {
          next.push({
            id: crypto.randomUUID(),
            role: "assistant",
            content: "",
            images: [
              {
                url: ev.url || "",
                filename: ev.filename || "",
                description: ev.description || "",
              },
            ],
            timestamp: Date.now(),
          });
          break;
        }
        case "usage": {
          const last = next[next.length - 1];
          if (last && last.role === "assistant") {
            next[next.length - 1] = {
              ...last,
              usage: { cost: ev.cost, duration_ms: ev.duration_ms },
            };
          }
          break;
        }
        case "error_message": {
          next.push({
            id: crypto.randomUUID(),
            role: "system",
            content: `错误：${ev.content || "未知错误"}`,
            timestamp: Date.now(),
          });
          break;
        }
      }
      return next;
    });
  }, []);

  const handleUpload = useCallback(async (file: File) => {
    if (!file || isUploading) return;
    const conversationId = getOrCreateConversationId();
    setIsUploading(true);
    try {
      const form = new FormData();
      form.append("file", file);
      const resp = await fetch("/api/upload", {
        method: "POST",
        headers: { "makers-conversation-id": conversationId },
        body: form,
      });
      if (!resp.ok) {
        const text = await resp.text().catch(() => "");
        dispatch({
          type: "error_message",
          content: `上传失败 HTTP ${resp.status}: ${text.slice(0, 200)}`,
        });
        return;
      }
      const json = await resp.json();
      setAttachment({
        key: json.key,
        url: json.url,
        filename: file.name,
        contentType: json.contentType,
      });
    } catch (e) {
      const err = e as Error;
      dispatch({ type: "error_message", content: `上传失败: ${err.message}` });
    } finally {
      setIsUploading(false);
    }
  }, [isUploading, dispatch]);

  const sendMessage = useCallback(async () => {
    const content = input.trim();
    if (!content || isThinking) return;

    const pendingAttachment = attachment;
    setInput("");
    setAttachment(null);
    setIsThinking(true);

    setMessages((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        role: "user",
        content,
        attachment: pendingAttachment || undefined,
        timestamp: Date.now(),
      },
    ]);

    const controller = new AbortController();
    abortRef.current = controller;
    const conversationId = getOrCreateConversationId();

    try {
      const resp = await fetch("/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "makers-conversation-id": conversationId,
        },
        body: JSON.stringify({
          message: content,
          ...(pendingAttachment ? { imageKey: pendingAttachment.key } : {}),
        }),
        signal: controller.signal,
      });

      if (!resp.ok || !resp.body) {
        const text = await resp.text().catch(() => "");
        dispatch({
          type: "error_message",
          content: `HTTP ${resp.status}: ${text.slice(0, 200)}`,
        });
        return;
      }

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        const events = buffer.split("\n\n");
        buffer = events.pop() || "";

        for (const raw of events) {
          const line = raw.trim();
          if (!line.startsWith("data: ")) continue;
          const data = line.slice(6).trim();
          if (data === "[DONE]") continue;
          try {
            const ev = JSON.parse(data) as SSEEvent;
            if (ev.type === "ping") continue;
            dispatch(ev);
          } catch {
            /* ignore malformed */
          }
        }
      }
    } catch (e) {
      const err = e as Error;
      if (err.name !== "AbortError") {
        dispatch({ type: "error_message", content: err.message });
      }
    } finally {
      setIsThinking(false);
      abortRef.current = null;
    }
  }, [input, isThinking, attachment, dispatch]);

  const stop = useCallback(() => {
    abortRef.current?.abort();
    setIsThinking(false);
  }, []);

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900">
      <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full">
        <header className="px-6 py-4 bg-white border-b border-slate-200 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold text-purple-700">EcomImageChat</h1>
            <p className="text-xs text-slate-500">AI 电商视觉创作助手 · EdgeOne Makers PoC</p>
          </div>
          <div className="text-xs text-slate-400">单张生图模式</div>
        </header>

        <div ref={scrollRef} className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
          {messages.map((m) => (
            <MessageBubble key={m.id} msg={m} />
          ))}
          {isThinking && (
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <span className="inline-block w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
              <span>AI 思考中 / 等待图片生成...</span>
            </div>
          )}
        </div>

        <div className="px-6 py-4 bg-white border-t border-slate-200">
          {attachment && (
            <div className="mb-2 flex items-center gap-3 px-3 py-2 rounded-lg bg-purple-50 border border-purple-200">
              <img
                src={attachment.url}
                alt={attachment.filename}
                className="w-12 h-12 object-cover rounded-md border border-slate-200"
              />
              <div className="flex-1 min-w-0">
                <div className="text-xs font-medium text-purple-900 truncate">{attachment.filename}</div>
                <div className="text-[11px] text-purple-600">已附加 · 调用生图时会作为参考图</div>
              </div>
              <button
                onClick={() => setAttachment(null)}
                disabled={isThinking || isUploading}
                className="text-xs px-2 py-1 rounded-md bg-white border border-purple-200 hover:bg-purple-100 text-purple-700"
              >
                移除
              </button>
            </div>
          )}

          <div className="flex gap-2 items-end">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg,image/webp,image/gif"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) handleUpload(f);
                e.target.value = "";
              }}
              disabled={isThinking || isUploading}
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={isThinking || isUploading}
              title="上传参考图"
              className="px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 disabled:bg-slate-50 disabled:opacity-50 text-slate-700 text-sm font-medium border border-slate-200"
            >
              {isUploading ? "..." : "📎"}
            </button>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
              placeholder={
                attachment
                  ? "描述要如何改造参考图，例如：保持产品构图，换成深绿色背景"
                  : "描述你的产品和图片需求，例如：帮我生成一款蓝色蓝牙耳机的白底主图"
              }
              rows={2}
              className="flex-1 resize-none px-4 py-2 rounded-lg border border-slate-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none text-sm"
              disabled={isThinking}
            />
            {isThinking ? (
              <button
                onClick={stop}
                className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white text-sm font-medium"
              >
                停止
              </button>
            ) : (
              <button
                onClick={sendMessage}
                disabled={!input.trim()}
                className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 disabled:bg-slate-300 text-white text-sm font-medium"
              >
                发送
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function MessageBubble({ msg }: { msg: ChatMessage }) {
  if (msg.role === "user") {
    return (
      <div className="flex justify-end">
        <div className="max-w-[85%] space-y-2">
          {msg.attachment && (
            <div className="flex justify-end">
              <img
                src={msg.attachment.url}
                alt={msg.attachment.filename}
                className="max-w-[200px] max-h-[200px] object-cover rounded-xl border-2 border-purple-300"
              />
            </div>
          )}
          {msg.content && (
            <div className="px-4 py-2.5 rounded-2xl bg-purple-600 text-white whitespace-pre-wrap break-words text-sm leading-relaxed">
              {msg.content}
            </div>
          )}
        </div>
      </div>
    );
  }

  if (msg.role === "system" && msg.toolName) {
    return (
      <div className="flex justify-start">
        <div className="max-w-[92%] px-3 py-2 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-900 font-mono">
          <div className="flex items-center gap-2">
            <span
              className={`inline-block w-2 h-2 rounded-full ${
                msg.toolStatus === "running"
                  ? "bg-amber-500 animate-pulse"
                  : msg.toolStatus === "error"
                    ? "bg-red-500"
                    : "bg-green-500"
              }`}
            />
            <span className="font-semibold">🔧 {msg.toolName}</span>
            {msg.usage ? (
              <span className="text-amber-700 ml-auto">
                cost=${msg.usage.cost?.toFixed(4) || "?"} · {(msg.usage.duration_ms ?? 0) / 1000}s
              </span>
            ) : null}
          </div>
          {msg.toolDetail && (
            <div className="mt-1 text-amber-800 whitespace-pre-wrap">{msg.toolDetail}</div>
          )}
        </div>
      </div>
    );
  }

  if (msg.role === "system") {
    return (
      <div className="flex justify-start">
        <div className="max-w-[92%] px-3 py-2 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700">
          {msg.content}
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-start">
      <div className="max-w-[92%] space-y-3">
        {msg.content && (
          <div className="px-5 py-4 rounded-2xl bg-white border border-slate-200 prose max-w-none">
            <ReactMarkdown
              components={{
                table: ({ children }) => (
                  <div className="prose-table-wrap">
                    <table>{children}</table>
                  </div>
                ),
              }}
            >
              {msg.content}
            </ReactMarkdown>
          </div>
        )}
        {msg.images?.map((img, i) => (
          <div key={i} className="rounded-2xl bg-white border border-slate-200 overflow-hidden">
            <img
              src={img.url}
              alt={img.filename}
              className="w-full max-w-md mx-auto block"
              loading="lazy"
            />
            <div className="px-4 py-2 text-xs text-slate-500 border-t border-slate-100 font-mono">
              {img.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
