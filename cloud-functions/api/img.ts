import { getStore } from "@edgeone/pages-blob";

/**
 * 图片代理：从 Blob 读取图片，透传 Content-Type / ETag。
 * 替代原项目的 /generated-images 静态服务。
 *
 * 用法：GET /api/img?key=gen/<conversationId>/<filename>
 */
export async function onRequest(context: any) {
  const url = new URL(context.request.url);
  const key = url.searchParams.get("key");

  if (!key) {
    return new Response(JSON.stringify({ error: "missing 'key' query parameter" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  // 防 SSRF：key 必须以 gen/ 或 uploads/ 开头
  if (!key.startsWith("gen/") && !key.startsWith("uploads/")) {
    return new Response(JSON.stringify({ error: "forbidden key prefix" }), {
      status: 403,
      headers: { "Content-Type": "application/json" },
    });
  }

  const store = getStore("ecom-images");
  // ⚠️ 不能用 getWithHeaders — 它返回 body:string，会把二进制按 UTF-8 解码再编码导致字节损坏
  // 改用 get(type:arrayBuffer) 拿原始字节 + getMetadata 拿 headers，两步分开
  const [bytes, meta] = await Promise.all([
    store.get(key, { type: "arrayBuffer" }),
    store.getMetadata(key),
  ]);
  if (!bytes) {
    return new Response(JSON.stringify({ error: `image not found: ${key}` }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }

  const headers: Record<string, string> = {
    "Cache-Control": "public, max-age=31536000, immutable",
  };
  if (meta?.contentType) headers["Content-Type"] = meta.contentType;
  for (const [k, v] of Object.entries(meta?.headers || {})) {
    if (k.toLowerCase() !== "cache-control") headers[k] = v;
  }

  return new Response(bytes, { status: 200, headers });
}
