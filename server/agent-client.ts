import { query } from "@anthropic-ai/claude-agent-sdk";
import path from "path";
import dotenv from "dotenv";
import { MessageQueue } from "./message-queue.js";
import { fileLog } from "./logger.js";

dotenv.config({ override: true });

export interface SDKMessage {
  type: string;
  subtype?: string;
  session_id?: string;
  message?: {
    role: string;
    content: any;
  };
  result?: string;
  total_cost_usd?: number;
  duration_ms?: number;
}

export class AgentSession {
  private queue: MessageQueue;
  private outputIterator: AsyncIterator<SDKMessage> | null = null;
  public sdkSessionId: string | null = null;
  private started = false;

  constructor() {
    this.queue = new MessageQueue();
  }

  private ensureStarted() {
    if (this.started) return;
    this.started = true;

    fileLog("Agent", "Starting SDK | MODEL:", process.env.MODEL || "sonnet", "| BASE_URL:", process.env.ANTHROPIC_BASE_URL || "(default)");

    try {
      const stream = query({
        prompt: this.queue as any,
        options: {
          cwd: path.resolve(process.cwd()),
          settingSources: ["project"],
          allowedTools: [
            "Skill", "Bash",
            "Read", "Write", "Glob", "Grep",
          ],
          systemPrompt: `你是 EcomImageChat，一个专业的 AI 电商视觉创作助手。

你拥有 1 个超级技能：

ecom-details-image — 电商视觉创作引擎
- 25 个专业电商场景模板（白底主图、场景图、信息图、海报等）
- GPT-Image-2 Prompt 铁律（hex颜色、数字占比、显式留白、否定清单）
- Campaign Style Lock 多图风格一致性系统
- 转化驱动力诊断（视觉/痛点/情感）
- 完整 PDP 详情页图片序列（5主图 + 7-9详情图）

两种模式：
- Brief/Prompt 模式：只输出 Prompt，不调用生图 API
- Generate 模式：用户明确要求「生图、生成图片、出图」时，调用 Python 脚本

工作原则：
1. 匹配正确的场景模板，基于模板 prompt_template 构建 Prompt
2. 遵守 GPT-Image-2 铁律：hex颜色、数字占比、显式留白、否定清单
3. 多图任务必须先建立 Campaign Style Lock
4. 商品/营销任务必须做转化驱动力诊断
5. 详情页图片必须是电商信息图格式（E-commerce infographic 开头）
6. 用中文回复用户
7. 生图脚本位置：.claude/skills/ecom-details-image/scripts/generate_image.py
8. 模板位置：.claude/skills/ecom-details-image/references/templates/
9. 生图配置：.claude/skills/ecom-details-image/.env

用户上传的文件在 uploads/ 目录下。`,
          maxTurns: 60,
          model: process.env.MODEL || "sonnet",
          permissionMode: "bypassPermissions",
          stderr: (data: string) => {
            fileLog("SDK.stderr", data.replace(/\n$/, ""));
          },
          env: {
            ...process.env,
            ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY,
            ANTHROPIC_BASE_URL: process.env.ANTHROPIC_BASE_URL,
          },
        },
      });

      this.outputIterator = stream[Symbol.asyncIterator]();
    } catch (e) {
      fileLog("Agent", "FAILED to start:", e);
      this.started = false;
    }
  }

  sendMessage(content: string) {
    fileLog("UserMsg", content);
    this.ensureStarted();
    this.queue.push(content);
  }

  async *getOutputStream(): AsyncGenerator<SDKMessage> {
    while (!this.outputIterator) {
      await new Promise((r) => setTimeout(r, 50));
    }

    while (true) {
      try {
        const { value, done } = await this.outputIterator.next();
        if (done) break;
        if (value?.type === "system" && value?.subtype === "init") {
          this.sdkSessionId = value.session_id ?? null;
          fileLog("Agent", "Session init:", this.sdkSessionId);
        } else {
          this.logSDKMessage(value);
        }
        yield value;
      } catch (e) {
        fileLog("Agent", "Stream error:", e);
        break;
      }
    }
  }

  private logSDKMessage(msg: SDKMessage) {
    if (msg.type === "assistant" && msg.message) {
      for (const block of msg.message.content) {
        if (block.type === "text" && block.text) {
          fileLog("AI", block.text.substring(0, 200));
        }
        if (block.type === "tool_use") {
          fileLog("ToolCall", block.name, JSON.stringify(block.input));
        }
      }
    }
    if (msg.type === "result") {
      fileLog("Result", msg.subtype || "", "cost:", msg.total_cost_usd, "duration:", msg.duration_ms + "ms");
    }
  }

  close() {
    this.queue.close();
  }
}
