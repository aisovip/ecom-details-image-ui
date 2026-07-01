export interface ImageOutput {
  url: string;
  filename: string;
  description: string;
}

export interface Attachment {
  key: string;
  url: string;
  filename: string;
  contentType: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  images?: ImageOutput[];
  attachment?: Attachment;
  toolName?: string;
  toolStatus?: "running" | "done" | "error";
  toolDetail?: string;
  usage?: { cost?: number; duration_ms?: number };
  timestamp: number;
}

export interface SSEEvent {
  type:
    | "ai_response"
    | "tool_call"
    | "tool_result"
    | "file_output"
    | "usage"
    | "ping"
    | "error_message"
    | "suggest_actions";
  content?: string;
  name?: string;
  input?: unknown;
  filename?: string;
  url?: string;
  description?: string;
  cost?: number;
  duration_ms?: number;
  subtype?: string;
  actions?: Array<{ id: string; emoji: string; title: string; description: string }>;
}
