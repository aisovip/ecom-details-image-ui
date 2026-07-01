import { query, createSdkMcpServer } from "@anthropic-ai/claude-agent-sdk";
import type { SDKMessage } from "@anthropic-ai/claude-agent-sdk";
import { z } from "zod";
import { getStore } from "@edgeone/pages-blob";
import { resolveModelName, collectGatewayEnv } from "./_model";
import { createLogger, sseEvent, createSSEResponse } from "./_shared";
import { ECOM_SYSTEM_PROMPT } from "./_skill";

const logger = createLogger("chat");

// 防止 SDK 内部 stdout 写入在 EPIPE 时崩溃（EdgeOne 平台必需）
process.stdout?.on?.("error", (err: NodeJS.ErrnoException) => {
  if (err.code === "EPIPE") return;
  throw err;
});

interface ImgEnv {
  IMG_BASE_URL: string;
  IMG_MODEL: string;
  IMG_API_KEY: string;
  IMG_CHAT_MODEL: string;
}

function getImgEnv(env: Record<string, string | undefined>): ImgEnv | null {
  const base = env.IMG_BASE_URL;
  const model = env.IMG_MODEL;
  const key = env.IMG_API_KEY;
  if (!base || !model || !key) return null;
  return {
    IMG_BASE_URL: base.replace(/\/$/, ""),
    IMG_MODEL: model,
    IMG_API_KEY: key,
    IMG_CHAT_MODEL: env.IMG_CHAT_MODEL || "agnes-2.0-flash",
  };
}

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36";

interface SseQueue {
  push: (event: string) => void;
  drain: () => string;
  hasNext: () => boolean;
}

function makeSseQueue(): SseQueue {
  const buf: string[] = [];
  return {
    push: (e) => buf.push(e),
    drain: () => buf.splice(0).join(""),
    hasNext: () => buf.length > 0,
  };
}

function explainFetchError(e: unknown): string {
  const err = e as Error & { cause?: { code?: string; hostname?: string; message?: string } };
  const cause = err.cause;
  const parts = [
    `msg=${err.message}`,
    cause?.code ? `code=${cause.code}` : "",
    cause?.hostname ? `host=${cause.hostname}` : "",
    cause?.message ? `cause=${cause.message}` : "",
  ].filter(Boolean);
  return parts.join(" | ");
}

/**
 * 调用 Agnes AI Image 2.1 Flash 同步 API。
 * 一次 POST 请求直接返回图片 URL，无需轮询。
 * 文档：https://apihub.agnes-ai.com/v1/images/generations
 *
 * imageDataUri 提供时走图生图：extra_body.image = [dataUri]，否则走文生图。
 */
async function callAgnesImage(
  env: ImgEnv,
  prompt: string,
  size: string,
  signal: AbortSignal | undefined,
  onProgress: (msg: string) => void,
  imageDataUri?: string,
): Promise<{ imageUrl: string }> {
  const endpoint = `${env.IMG_BASE_URL}/images/generations`;
  const mode = imageDataUri ? "图生图(img2img)" : "文生图(txt2img)";
  onProgress(`提交到 ${endpoint} | model=${env.IMG_MODEL} | size=${size} | mode=${mode}`);

  const extraBody: Record<string, unknown> = { response_format: "url" };
  if (imageDataUri) extraBody.image = [imageDataUri];

  let resp: Response;
  try {
    resp = await fetch(endpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.IMG_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: env.IMG_MODEL,
        prompt,
        size,
        extra_body: extraBody,
      }),
      signal,
    });
  } catch (e) {
    throw new Error(`agnes submit fetch failed: ${explainFetchError(e)}`);
  }
  if (!resp.ok) {
    const detail = await resp.text();
    throw new Error(`agnes HTTP ${resp.status}: ${detail.slice(0, 300)}`);
  }
  const json: any = await resp.json();
  const imageUrl: string | undefined = json?.data?.[0]?.url;
  if (!imageUrl) {
    throw new Error(`agnes missing data[0].url: ${JSON.stringify(json).slice(0, 300)}`);
  }
  onProgress("图片已生成，下载中...");
  return { imageUrl };
}

/**
 * 调用 Agnes-2.0-Flash（OpenAI 兼容 chat completions）做图片识别。
 * 输入 Data URI base64 图片，输出结构化 JSON 文本。
 * 主聊天模型（DeepSeek via Claude API）没有 vision，所以这部分由 Agnes 代劳。
 */
async function callAgnesVision(
  env: ImgEnv,
  imageDataUri: string,
  signal: AbortSignal | undefined,
): Promise<string> {
  const endpoint = `${env.IMG_BASE_URL}/chat/completions`;
  const visionPrompt = `你是电商视觉分析助手。分析这张参考图，**只输出 JSON**（不要 markdown 代码块、不要其他文字），结构如下：
{
  "product": "产品类型中文描述（如：蓝色蓝牙耳机 / 米色陶瓷咖啡杯）",
  "colors": ["#RRGGBB 颜色名（最多 4 个主色）"],
  "material": "材质和纹理（如：磨砂塑料 / 光面陶瓷 / 拉丝金属）",
  "composition": "构图（角度、产品占比%、留白%、视角方向）",
  "lighting": "光线（方向、强度、色温 K）",
  "style": "风格（如：极简白底 / 小红书氛围 / 工业感）",
  "background": "背景描述（颜色 + 材质 + 道具）",
  "key_features": ["可见卖点/细节 2-4 条"],
  "summary": "整体一句话描述（≤60 字）"
}
要求：
- 颜色必须用 hex 码（如 #1A3A2E），不要写"深绿色"
- 如果不是产品图（如纯背景/纹理/人物），如实说明
- JSON 必须可解析，字段完整`;

  let resp: Response;
  try {
    resp = await fetch(endpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.IMG_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: env.IMG_CHAT_MODEL || "agnes-2.0-flash",
        temperature: 0.3,
        max_tokens: 800,
        messages: [
          {
            role: "user",
            content: [
              { type: "text", text: visionPrompt },
              { type: "image_url", image_url: { url: imageDataUri } },
            ],
          },
        ],
      }),
      signal,
    });
  } catch (e) {
    throw new Error(`agnes vision fetch failed: ${explainFetchError(e)}`);
  }
  if (!resp.ok) {
    const detail = await resp.text();
    throw new Error(`agnes vision HTTP ${resp.status}: ${detail.slice(0, 300)}`);
  }
  const json: any = await resp.json();
  const content: string | undefined = json?.choices?.[0]?.message?.content;
  if (!content) {
    throw new Error(`agnes vision missing content: ${JSON.stringify(json).slice(0, 300)}`);
  }
  return content;
}

/**
 * 从 Blob 读取图片字节并打包成 data:image/...;base64,... URI。
 * 用于把上传图传给 Agnes vision 和图生图（Agnes 服务器无 eo_token，只能走 base64）。
 *
 * ⚠️ 不能用 getWithHeaders（它返回 body:string，二进制会被 UTF-8 解码/编码损坏），
 *    必须用 get(type:arrayBuffer) 拿原始字节 + getMetadata 拿 contentType。
 */
async function blobToDataUri(
  store: ReturnType<typeof getStore>,
  key: string,
): Promise<{ dataUri: string; contentType: string }> {
  const [bytes, meta] = await Promise.all([
    store.get(key, { type: "arrayBuffer" }),
    store.getMetadata(key),
  ]);
  if (!bytes) throw new Error(`upload not found in blob: ${key}`);
  const contentType: string = meta?.contentType || `image/${inferExt(key)}`;
  const base64 = Buffer.from(bytes).toString("base64");
  return { dataUri: `data:${contentType};base64,${base64}`, contentType };
}

async function downloadImage(url: string, signal: AbortSignal | undefined): Promise<ArrayBuffer> {
  let resp: Response;
  try {
    resp = await fetch(url, { headers: { "User-Agent": UA }, signal });
  } catch (e) {
    throw new Error(`download fetch failed: ${explainFetchError(e)} | url=${url}`);
  }
  if (!resp.ok) throw new Error(`download image HTTP ${resp.status}`);
  return await resp.arrayBuffer();
}

function inferExt(url: string): string {
  const u = url.toLowerCase().split("?")[0];
  if (u.endsWith(".png")) return "png";
  if (u.endsWith(".jpg") || u.endsWith(".jpeg")) return "jpg";
  if (u.endsWith(".webp")) return "webp";
  if (u.endsWith(".gif")) return "gif";
  return "png";
}

export async function onRequest(context: any) {
  const ctxEnv: Record<string, string | undefined> = context.env ?? {};
  const body = context.request?.body ?? {};
  const message = typeof body.message === "string" ? body.message.trim() : "";
  const imageKey: string | undefined =
    typeof body.imageKey === "string" && body.imageKey.startsWith("uploads/")
      ? body.imageKey
      : undefined;

  if (!message) {
    return new Response(JSON.stringify({ error: "'message' is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const signal: AbortSignal | undefined = context.request?.signal;
  const conversationId: string = context.conversation_id || "anon";

  if (!ctxEnv.AI_GATEWAY_API_KEY || !ctxEnv.AI_GATEWAY_BASE_URL) {
    return new Response(
      JSON.stringify({
        error: "Missing AI_GATEWAY_API_KEY or AI_GATEWAY_BASE_URL. Configure them in the EdgeOne Makers console.",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
  const imgEnv = getImgEnv(ctxEnv);
  if (!imgEnv) {
    return new Response(
      JSON.stringify({
        error:
          "Missing IMG_BASE_URL / IMG_MODEL / IMG_API_KEY. Configure them in the EdgeOne Makers console.",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }

  const sseQueue = makeSseQueue();
  const imageStore = getStore("ecom-images");
  const safeImgEnv: ImgEnv = imgEnv;

  const customMcpServer = createSdkMcpServer({
    name: "ecom-tools",
    tools: [
      {
        name: "generate_image",
        description:
          "调用 Agnes Image 2.1 Flash 同步 API 生成单张电商图片。传入已应用 GPT-Image-2 全部 6 条铁律的最终英文 Prompt。工具会自动：POST 一次 → 拿到图片 URL → 下载 → 存入 Blob → 通过 SSE file_output 事件把公开 URL 推送给前端。一次只生成 1 张图。传入 imageKey 时走图生图（保留参考图构图），不传时走文生图。",
        inputSchema: {
          prompt: z
            .string()
            .describe(
              "最终图片 Prompt（建议英文）。必须已应用 GPT-Image-2 全部 6 条铁律：hex 颜色、数字占比、显式留白、否定清单、平台预留空间、3 层信息架构。图生图时必须在 prompt 末尾包含 'preserving the original composition and main subject layout'。",
            ),
          size: z
            .string()
            .default("1024x1024")
            .describe(
              "像素格式 WIDTHxHEIGHT。常用：1024x1024（1:1 主图默认）、1024x768（横版 16:9）、768x1024（竖版 3:4 详情页）、819x1024（4:5）、768x1152（2:3）、720x1280（9:16 社媒竖图）",
            ),
          imageKey: z
            .string()
            .optional()
            .describe(
              "参考图 Blob key（仅 uploads/ 前缀合法）。用户上传参考图后必传，强制走图生图：工具会读 Blob → base64 → 提交到 Agnes extra_body.image 数组。系统会在 prompt 里以 [系统注入] imageKey=xxx 形式告知，看到就必须传，没有例外。",
            ),
        },
        handler: async (args: Record<string, unknown>) => {
          const prompt = String(args.prompt ?? "");
          const size = String(args.size ?? "1024x1024");
          const toolImageKey = typeof args.imageKey === "string" ? args.imageKey : undefined;
          const startedAt = Date.now();
          try {
            let imageDataUri: string | undefined;
            if (toolImageKey) {
              if (!toolImageKey.startsWith("uploads/")) {
                throw new Error(`invalid imageKey prefix: ${toolImageKey}`);
              }
              sseQueue.push(
                sseEvent({
                  type: "tool_result",
                  name: "generate_image",
                  content: `读取参考图: ${toolImageKey}`,
                }),
              );
              ({ dataUri: imageDataUri } = await blobToDataUri(imageStore, toolImageKey));
            }

            const { imageUrl } = await callAgnesImage(
              imgEnv,
              prompt,
              size,
              signal,
              (m) => sseQueue.push(sseEvent({ type: "tool_result", name: "generate_image", content: m })),
              imageDataUri,
            );

            const bytes = await downloadImage(imageUrl, signal);
            const ext = inferExt(imageUrl);
            const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
            const blobKey = `gen/${conversationId}/${filename}`;
            await imageStore.set(blobKey, bytes);

            const publicUrl = `/api/img?key=${encodeURIComponent(blobKey)}`;
            const elapsedSec = Math.floor((Date.now() - startedAt) / 1000);
            sseQueue.push(
              sseEvent({
                type: "file_output",
                filename,
                url: publicUrl,
                description: `${size} | elapsed=${elapsedSec}s | cost=$${(0.003).toFixed(4)}`,
              }),
            );

            return {
              content: [
                {
                  type: "text" as const,
                  text: `图片已生成并存储。公开访问 URL：${publicUrl}（耗时 ${elapsedSec}s）。请向用户展示这张图片，并附上你的视觉简报说明。`,
                },
              ],
            };
          } catch (e) {
            const err = e as Error;
            logger.error("generate_image failed:", err.message);
            sseQueue.push(
              sseEvent({
                type: "error_message",
                content: `generate_image failed: ${err.message}`,
              }),
            );
            return {
              content: [{ type: "text" as const, text: `Error: ${err.message}` }],
              isError: true,
            };
          }
        },
      },
    ],
  });

  async function* run(sig: AbortSignal | undefined): AsyncGenerator<string> {
    logger.log("query start | conversationId=", conversationId, "| message=", message.slice(0, 80));

    // 如果带了参考图，先调 Agnes-2.0-Flash vision 分析图片，把结果作为上下文注入主聊天
    let finalPrompt = message;
    if (imageKey) {
      try {
        sseQueue.push(
          sseEvent({
            type: "tool_call",
            name: "vision_analyze",
            input: { imageKey },
          }),
        );
        const { dataUri } = await blobToDataUri(imageStore, imageKey);
        const visionResult = await callAgnesVision(safeImgEnv, dataUri, sig);
        sseQueue.push(
          sseEvent({
            type: "tool_result",
            name: "vision_analyze",
            content: visionResult.slice(0, 400),
          }),
        );
        finalPrompt = `${message}

[系统注入] 用户上传了参考图，imageKey=${imageKey}

[参考图分析结果 by Agnes-2.0-Flash vision]
${visionResult}

⚠️ 铁律：**必须走图生图**。调用 generate_image 时**必传** imageKey="${imageKey}" 参数。没有例外，无需判断场景是否相似、姿态是否变化、风格是否不同。

用户上传参考图的唯一目的就是让模型看着它改造。即使要求"全新场景 / 不同姿态 / 换风格"，主体（产品本身：颜色、材质、印花、版型）必须保持一致。

prompt 写法：
- **保留**（不写在 prompt 里，模型自动从参考图读取）：产品类型、颜色 hex、材质、印花/纹理、版型
- **改造**（写在 prompt 里描述）：场景、姿态、光线、风格、构图
- prompt 末尾固定加：preserving the original product identity, pattern, colors and material
- ❌ 不要写 "preserving the original composition" —— 构图可变

例：用户要"ins 风室内坐姿图"，参考图是户外街拍站姿 → prompt 描述「Convert to an Instagram-style indoor shot, model sitting on a beige linen sofa near a large window with soft diffused natural light, warm minimal interior, plants in the background, ... preserving the original product identity, pattern, colors and material」`;

      } catch (e) {
        const err = e as Error;
        logger.error("vision preprocess failed:", err.message);
        sseQueue.push(
          sseEvent({
            type: "tool_result",
            name: "vision_analyze",
            content: `vision 失败: ${err.message}（将继续走主聊天，但无图分析上下文）`,
          }),
        );
        finalPrompt = `${message}

[系统注入] 用户上传了参考图 imageKey=${imageKey}，但 vision 分析失败。
⚠️ 仍**必须**走图生图：调用 generate_image 时**必传** imageKey="${imageKey}"。
prompt 末尾固定加：preserving the original product identity, pattern, colors and material
告诉用户 vision 暂时不可用，但仍按文字需求尝试改造。`;
      }
    }

    const stream = query({
      prompt: finalPrompt,
      options: {
        model: resolveModelName(ctxEnv),
        env: {
          ...collectGatewayEnv(ctxEnv),
          CLAUDE_CONFIG_DIR: "/tmp/claude-agent-sdk",
          CLAUDE_CODE_TMPDIR: "/tmp",
        },
        systemPrompt: ECOM_SYSTEM_PROMPT,
        maxTurns: 30,
        mcpServers: {
          "ecom-tools": customMcpServer,
        },
        allowedTools: ["mcp__ecom-tools__generate_image"],
        permissionMode: "bypassPermissions",
        abortController: sig ? ({ signal: sig } as any) : undefined,
      },
    });

    for await (const msg of stream as AsyncIterable<SDKMessage>) {
      if (sig?.aborted) break;

      // 先抽干 side channel
      while (sseQueue.hasNext()) yield sseQueue.drain();

      // 处理 SDK 消息
      if (msg.type === "assistant" && msg.message) {
        for (const block of (msg.message as any).content || []) {
          if (block.type === "text" && block.text) {
            yield sseEvent({ type: "ai_response", content: block.text });
          }
          if (block.type === "tool_use") {
            yield sseEvent({
              type: "tool_call",
              name: block.name,
              input: block.input,
            });
          }
        }
      }
      if (msg.type === "result") {
        yield sseEvent({
          type: "usage",
          subtype: (msg as any).subtype,
          cost: (msg as any).total_cost_usd,
          duration_ms: (msg as any).duration_ms,
        });
      }
    }

    while (sseQueue.hasNext()) yield sseQueue.drain();
    yield "data: [DONE]\n\n";
    logger.log("query done | conversationId=", conversationId);
  }

  return createSSEResponse(run, signal);
}
