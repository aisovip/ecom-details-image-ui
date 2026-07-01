import { getStore } from "@edgeone/pages-blob";

/**
 * 参考图上传：接收 multipart/form-data，存入 Blob uploads/<convId>/<filename>，
 * 返回 { key, url, contentType, size }。
 *
 * 前端拿到 url 后通过 <img src="/api/img?key=..."> 显示，
 * 通过 /chat body.imageKey 把 key 传给 agents/chat.ts 做 vision + img2img。
 */
const MAX_BYTES = 8 * 1024 * 1024; // 8 MB
const ALLOWED = new Set(["image/png", "image/jpeg", "image/jpg", "image/webp", "image/gif"]);

function inferExt(contentType: string | null, filename: string | null): string {
  if (filename) {
    const m = filename.toLowerCase().match(/\.(png|jpe?g|webp|gif)$/);
    if (m) return m[1] === "jpg" ? "jpg" : m[1];
  }
  if (contentType === "image/png") return "png";
  if (contentType === "image/jpeg" || contentType === "image/jpg") return "jpg";
  if (contentType === "image/webp") return "webp";
  if (contentType === "image/gif") return "gif";
  return "png";
}

export async function onRequest(context: any) {
  if (context.request?.method !== "POST") {
    return new Response(JSON.stringify({ error: "method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json", Allow: "POST" },
    });
  }

  const conversationId = (context.request?.headers?.get?.("makers-conversation-id") || "anon").slice(0, 80);

  let formData: FormData;
  try {
    formData = await context.request.formData();
  } catch (e) {
    return new Response(JSON.stringify({ error: "invalid multipart form data" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const file = formData.get("file");
  if (!file || !(file instanceof File)) {
    return new Response(JSON.stringify({ error: "missing 'file' field" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const contentType = file.type || null;
  if (contentType && !ALLOWED.has(contentType)) {
    return new Response(
      JSON.stringify({ error: `unsupported content type: ${contentType}. allowed: ${[...ALLOWED].join(", ")}` }),
      { status: 415, headers: { "Content-Type": "application/json" } },
    );
  }

  const bytes = await file.arrayBuffer();
  if (bytes.byteLength > MAX_BYTES) {
    return new Response(
      JSON.stringify({ error: `file too large: ${bytes.byteLength} bytes > ${MAX_BYTES} (8 MB)` }),
      { status: 413, headers: { "Content-Type": "application/json" } },
    );
  }

  const ext = inferExt(contentType, file.name);
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const blobKey = `uploads/${conversationId}/${filename}`;

  const store = getStore("ecom-images");
  await store.set(blobKey, bytes);

  const publicUrl = `/api/img?key=${encodeURIComponent(blobKey)}`;
  return new Response(
    JSON.stringify({
      key: blobKey,
      url: publicUrl,
      contentType: contentType || `image/${ext}`,
      size: bytes.byteLength,
    }),
    { status: 200, headers: { "Content-Type": "application/json" } },
  );
}
