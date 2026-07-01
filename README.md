# EcomImageChat — AI 电商视觉创作助手

> 用一句中文描述你的产品，30 秒拿到一张专业电商图。上传参考图还能改造（保留产品本身，换场景/姿态/风格）。

[![使用 EdgeOne Makers 部署](https://cdnstatic.tencentcs.com/edgeone/pages/deploy.svg)](https://console.cloud.tencent.com/edgeone/makers/new?repository-url=https%3A%2F%2Fgithub.com%2Fliangdabiao%2Fecom-details-image-ui&env=AI_GATEWAY_API_KEY&env=AI_GATEWAY_BASE_URL&env=AI_GATEWAY_MODEL&env=IMG_BASE_URL&env=IMG_API_KEY&env=IMG_MODEL&env=IMG_CHAT_MODEL&env-description=AI_GATEWAY_*%20%E2%86%92%20EdgeOne%20AI%20Gateway%20%E4%B8%BB%E8%81%8A%E5%A4%A9%20%7C%20IMG_*%20%E2%86%92%20Agnes%20AI%20%E5%9B%BE%E7%89%87%E8%AF%86%E5%88%AB%20%2B%20%E7%94%9F%E5%9B%BE)

- 在线体验（已部署）：**<https://ecom-image.liangdabiao.com/>**
- GitHub 仓库：**<https://github.com/liangdabiao/ecom-details-image-ui>**

点击上面的按钮，5 分钟部署一个你自己的实例到腾讯云 EdgeOne Makers（需要先准备好 EdgeOne AI Gateway 和 Agnes AI 的密钥，详见 [环境变量](#环境变量)）。

---

## 目录

- [这是什么](#这是什么)
- [能做什么（功能亮点）](#能做什么功能亮点)
- [普通用户使用指南](#普通用户使用指南)
- [开发者指南](#开发者指南)
  - [架构总览](#架构总览)
  - [技术栈](#技术栈)
  - [本地开发](#本地开发)
  - [部署到 EdgeOne Makers](#部署到-edgeone-makers)
  - [环境变量](#环境变量)
- [项目结构](#项目结构)
- [已知限制](#已知限制)
- [常见问题 FAQ](#常见问题-faq)
- [致谢](#致谢)

---

## 这是什么

EcomImageChat 是一个跑在腾讯云 **EdgeOne Makers** 边缘云平台上的 AI 电商视觉创作 Web 应用。

- 你用中文描述产品（"蓝色蓝牙耳机"、"米色陶瓷咖啡杯"）和需求（"白底主图"、"小红书氛围图"）
- AI 自动匹配 25 个电商场景模板（白底图、社媒、信息图、UGC 等），按 GPT-Image-2 铁律写 prompt
- 调用 **Agnes AI Image 2.1 Flash** 同步生图，约 15-30 秒返回一张图
- 上传参考图后，**强制走图生图**：保留产品本身的颜色/材质/印花/版型，只改造场景/姿态/光线/风格

底层基于 **Claude Agent SDK**，主聊天模型用 DeepSeek（走 Anthropic 兼容协议），图片识别用 Agnes-2.0-Flash，生图用 Agnes Image 2.1 Flash。

---

## 能做什么（功能亮点）

| 功能 | 说明 |
|------|------|
| 文生图 | 描述需求 → AI 写 prompt → 直接出图 |
| 图生图（参考图） | 上传产品图 → AI 用 Agnes vision 分析 → 强制图生图保留主体 |
| 25 个电商场景模板 | 白底主图 / 场景图 / 细节微距 / 小红书 / UGC / 模特展示 / 信息图 / 爆炸图 / 包装礼盒 / 多角度网格 等 |
| GPT-Image-2 铁律 | hex 颜色码、数字占比、显式留白、否定清单、平台预留空间、3 层信息架构 |
| 转化驱动力诊断 | 商品任务自动判断视觉驱动 / 痛点驱动 / 情感驱动，影响 prompt 走向 |
| 多角度镜头规则 | 多图任务自动避免连续相同角度、强制俯仰拍搭配 |
| Campaign Style Lock | 多图任务锁定色板/光线/字体/背景/构图，整套风格一致（PoC 单张生图模式下未触发，规则保留在 skill 里） |
| 实时进度 SSE | 上传、识别、提交、下载、存储每一步都通过 SSE 推到前端 |
| 单图约束 | 120 秒 wall-clock 限制下一次会话只生成 1 张图，保证响应稳定 |

---

## 普通用户使用指南

### 5 分钟上手

1. 打开 <https://ecom-image.liangdabiao.com/>
2. 在底部输入框描述你的需求，例如 `帮我生成一款蓝色蓝牙耳机的白底主图`
3. 点「发送」，等 15-30 秒
4. 看到工具进度条 → 最终图片

### 三种典型场景

**场景 1：从零文生图（最常用）**

直接描述产品 + 场景：

```
帮我生成一款蓝色蓝牙耳机的白底主图
```

```
设计一款咖啡杯的小红书风格氛围图，直接出图
```

```
为我做一个护肤品精华液的详情页信息图
```

带「生图 / 生成 / 出图」关键词会自动出图；不带的话只输出 prompt 文本（Brief 模式）。

**场景 2：上传参考图改造（图生图）**

1. 点输入框左边的 📎 按钮，选一张产品图（PNG/JPG/WEBP，≤8MB）
2. 看到缩略图后，描述要**改什么**：

```
保持产品构图，换成深绿色背景
```

```
换成 ins 风室内坐姿图，柔和自然光
```

```
改成小红书氛围，俯拍桌面，加一杯咖啡做道具
```

AI 会强制走图生图：保留产品本身的颜色/材质/印花，只改你说的部分。

**场景 3：让 AI 帮你写 prompt（不生图）**

```
帮我写一个蓝牙耳机的白底主图 prompt
```

不带「生图」关键词 → AI 只输出可执行的英文 Prompt + Visual Brief，你可以拿去别的工具用。

### 支持的画幅

| 比例 | 像素尺寸 | 用途 |
|---|---|---|
| 1:1 | `1024x1024` | 默认，电商主图 |
| 16:9 | `1024x768` | 横版 banner / 海报 |
| 3:4 | `768x1024` | 详情页竖版 |
| 4:5 | `819x1024` | 网页配图 |
| 2:3 | `768x1152` | 杂志风 |
| 9:16 | `720x1280` | 社媒竖图（小红书/抖音/INS Story） |

AI 会根据场景自动选择，你也可以在消息里指定（如「竖版 9:16」）。

---

## 开发者指南

### 架构总览

```
浏览器（React + Tailwind v4）
  │
  │  ① POST /chat（SSE 流式）  +  makers-conversation-id header
  │  ② POST /api/upload（multipart）—— 仅带参考图时
  │  ③ GET /api/img?key=<blobKey>—— 加载图片
  ▼
┌─────────────────────────────────────────────────────┐
│  EdgeOne Makers                                      │
│                                                      │
│  agents/chat.ts  (Agent Node Runtime)                │
│  ├─ 如有 imageKey：                                   │
│  │   1. Blob 读 upload bytes → base64 Data URI        │
│  │   2. callAgnesVision(agnes-2.0-flash)             │
│  │      → 结构化 JSON（产品/颜色/材质/构图/光线）       │
│  │   3. 把 JSON 拼到用户消息后                         │
│  ├─ query() → Claude Agent SDK                       │
│  │   ├─ 主聊天模型：DeepSeek（Anthropic 兼容）         │
│  │   ├─ systemPrompt = ECOM_SYSTEM_PROMPT             │
│  │   └─ MCP 工具：generate_image                      │
│  └─ 工具处理器：                                       │
│      ├─ 如有 imageKey → Blob 读 → base64              │
│      ├─ callAgnesImage(agnes-image-2.1-flash, ...)    │
│      │   ├─ 文生图：extra_body={response_format:url}  │
│      │   └─ 图生图：extra_body={image:[dataUri],...}   │
│      ├─ 下载图片字节                                  │
│      ├─ Blob store.set('gen/<convId>/<file>')         │
│      └─ SSE file_output 事件推前端                    │
│                                                      │
│  cloud-functions/api/upload.ts                       │
│  └─ multipart → Blob uploads/<convId>/<file>          │
│                                                      │
│  cloud-functions/api/img.ts                          │
│  └─ Blob get(type:arrayBuffer) + getMetadata         │
│     ⚠️ 不能用 getWithHeaders（返回 string，二进制会   │
│        被 UTF-8 解码/编码损坏）                        │
└─────────────────────────────────────────────────────┘
```

### 技术栈

- **平台**：腾讯云 EdgeOne Makers（Agent Node Runtime + Cloud Functions + Blob Storage）
- **AI 框架**：[Claude Agent SDK](https://github.com/anthropics/claude-agent-sdk) `^0.1.11`
- **主聊天模型**：`@makers/deepseek-v4-flash`（走 EdgeOne AI Gateway，Anthropic 兼容协议）
- **图片识别**：`agnes-2.0-flash`（OpenAI 兼容 chat completions，支持 vision）
- **图片生成**：`agnes-image-2.1-flash`（同步 API，支持文生图 + 图生图）
- **前端**：React 18 + Tailwind CSS v4 + Vite 6 + react-markdown
- **协议**：SSE（替代 WebSocket）+ fetch
- **存储**：`@edgeone/pages-blob` namespace `ecom-images`（两个前缀：`gen/` 生成图、`uploads/` 上传图）

### 本地开发

```bash
# 1. 装 CLI（>= 1.6.0）
npm install -g edgeone@latest
edgeone -v

# 2. 登录（China / Global）
edgeone login --site china
# 或 edgeone login --site global

# 3. 装依赖
npm install

# 4. 拉远端环境变量到本地 .env
edgeone makers env pull

# 5. 启动本地预览（带热重载）
edgeone makers dev
# 浏览器打开 http://localhost:8088/
```

类型检查：

```bash
npm run typecheck
```

### 部署到 EdgeOne Makers

#### 方式 A：一键部署（推荐新手）

点击下面的按钮，会跳转到 EdgeOne Makers 控制台并自动填好仓库地址和所需环境变量：

[![使用 EdgeOne Makers 部署](https://cdnstatic.tencentcs.com/edgeone/pages/deploy.svg)](https://console.cloud.tencent.com/edgeone/makers/new?repository-url=https%3A%2F%2Fgithub.com%2Fliangdabiao%2Fecom-details-image-ui&env=AI_GATEWAY_API_KEY&env=AI_GATEWAY_BASE_URL&env=AI_GATEWAY_MODEL&env=IMG_BASE_URL&env=IMG_API_KEY&env=IMG_MODEL&env=IMG_CHAT_MODEL&env-description=AI_GATEWAY_*%20%E2%86%92%20EdgeOne%20AI%20Gateway%20%E4%B8%BB%E8%81%8A%E5%A4%A9%20%7C%20IMG_*%20%E2%86%92%20Agnes%20AI%20%E5%9B%BE%E7%89%87%E8%AF%86%E5%88%AB%20%2B%20%E7%94%9F%E5%9B%BE)

**部署步骤：**

1. 点击按钮 → 跳转到 EdgeOne Makers 控制台（首次需要登录腾讯云账号）
2. 仓库地址已自动填好（`liangdabiao/ecom-details-image-ui`），框架会自动识别为 `claude-agent-sdk`
3. 在「环境变量」区填入你自己的密钥（控制台会列出 7 个变量名，必填 5 个）：
   - `AI_GATEWAY_API_KEY` — EdgeOne AI Gateway 密钥
   - `AI_GATEWAY_BASE_URL` — AI Gateway 入口
   - `AI_GATEWAY_MODEL` — 默认 `@makers/deepseek-v4-flash`
   - `IMG_BASE_URL` — Agnes 入口，填 `https://apihub.agnes-ai.com/v1`
   - `IMG_API_KEY` — 你的 Agnes API Key（在 [Agnes 控制台](https://agnes-ai.com/) 申请）
   - `IMG_MODEL` — 默认 `agnes-image-2.1-flash`
   - `IMG_CHAT_MODEL` — 默认 `agnes-2.0-flash`（图片识别用）
4. 选择部署区域（国内用户选中国大陆）
5. 点「部署」 → 等 1-2 分钟构建完成
6. 拿到 `*.edgeone.cool` 预览 URL，可以立即访问

**建议立刻做的事：**
- 在「域名管理」绑定自定义域名 + 部署 SSL 证书，去掉 `eo_token` 限制（详见 [FAQ](#常见问题-faq)）

#### 方式 B：CLI 手动部署（推荐开发者）

适合要改代码、本地预览、CI/CD 集成的场景：

```bash
# 1. 克隆仓库
git clone https://github.com/liangdabiao/ecom-details-image-ui.git
cd ecom-details-image-ui

# 2. 装 CLI 并登录
npm install -g edgeone@latest
edgeone login --site china

# 3. 装依赖
npm install

# 4. 拉环境变量（在控制台先配好）
edgeone makers env pull

# 5. 本地预览
edgeone makers dev

# 6. 部署
edgeone makers deploy --json
```

输出示例：

```json
{
  "status": "success",
  "url": "https://ecom-image-chat-xxx.edgeone.cool?eo_token=...",
  "consoleUrl": "https://console.cloud.tencent.com/edgeone/pages/project/..."
}
```

**生产域名建议：** 默认的 `*.edgeone.cool` 预览域名带 `eo_token` 保护（cookie 3 小时过期）。给生产用户用，建议在控制台 → 域名管理 → 绑定自定义域名 + 部署 SSL 证书，去掉 token 限制。

### 环境变量

控制台 → 项目设置 → 环境变量 中配置（**不要用 `edgeone makers env set` CLI，会静默失败**）：

| 变量 | 用途 | 示例 |
|---|---|---|
| `AI_GATEWAY_API_KEY` | EdgeOne AI Gateway 密钥（主聊天） | 控制台分配 |
| `AI_GATEWAY_BASE_URL` | AI Gateway 入口 | https://ai-gateway.edgeone.link/anthropic |
| `AI_GATEWAY_MODEL` | 主聊天模型（可选） | `@makers/deepseek-v4-flash` |
| `IMG_BASE_URL` | Agnes AI 入口 | `https://apihub.agnes-ai.com/v1` |
| `IMG_API_KEY` | Agnes API key | `sk-xxx` |
| `IMG_MODEL` | 图片生成模型 | `agnes-image-2.1-flash` |
| `IMG_CHAT_MODEL` | 图片识别模型（可选，默认 `agnes-2.0-flash`） | `agnes-2.0-flash` |

CLI 同步本地：`edgeone makers env pull`

---

## 项目结构

```
ecom-image-chat/
├── edgeone.json              # framework: claude-agent-sdk
├── agents/                   # Agent Node Runtime 入口
│   ├── _shared.ts            # SSE helper（createSSEResponse / sseEvent / logger）
│   ├── _model.ts             # AI_GATEWAY_* → ANTHROPIC_* 映射
│   ├── _skill.ts             # ECOM_SYSTEM_PROMPT（25 模板 + 铁律 + 图生图规则）
│   └── chat.ts               # 主入口：vision 预处理 + SDK + generate_image MCP 工具
├── cloud-functions/          # EdgeOne Cloud Functions
│   └── api/
│       ├── upload.ts         # multipart 上传 → Blob
│       └── img.ts            # Blob → 浏览器（图片代理）
├── src/                      # React 前端
│   ├── App.tsx               # 单文件 UI（消息列表 + 输入框 + 上传按钮）
│   ├── main.tsx
│   ├── types.ts              # ChatMessage / Attachment / SSEEvent 类型
│   └── index.css             # Tailwind v4 + 自写 prose 样式（替代 typography 插件）
├── index.html
├── vite.config.ts
├── tsconfig.json
├── package.json
└── README.md                 # 本文件
```

---

## 已知限制

1. **单张生图** — EdgeOne Cloud Function 120 秒 wall-clock 上限约束，一次会话只生成 1 张图。整套 PDP（9 张）需要前端拆分多次请求（PoC 未实现）。
2. **无文件持久画廊** — 不扫描 Blob 列表展示历史图片。需要可以加 `/api/images` 接口调用 `store.list({ prefix: 'gen/' })`。
3. **会话不恢复** — 每次刷新页面是新会话（虽然 `makers-conversation-id` header 已传入）。
4. **中文字渲染** — Agnes Image 模型对中文字准确率约 95%，建议放大核对笔画，复杂字（赢、鬱、餮）换简单同义字。
5. **生图速度** — 文生图 15-30 秒；图生图稍慢（base64 体积大 + img2img 模型本身耗时），偶发接近 120s 超时。
6. **图片大小** — 上传参考图限制 8MB。建议前端 canvas 压缩到 ≤1MB（目前未实现）。

---

## 常见问题 FAQ

**Q：上传参考图后，AI 没用它直接重新画了一张？**

A：那是历史 bug，已修复。当前规则：**只要上传了参考图，必走图生图，没有例外**。如果还遇到，检查工具进度条是否显示「mode=图生图(img2img)」。

**Q：图片加载失败 / 显示裂图？**

A：可能原因：
1. 旧 Blob 数据是历史损坏的（之前用错了 Blob API）→ 重新生成一张就好
2. 预览域名 eo_token 过期了（3 小时）→ 用自定义域名 `ecom-image.liangdabiao.com`
3. 自定义域名 SSL 证书没生效 → 控制台部署免费 DV 证书

**Q：可以改用真正的 Claude（不是 DeepSeek）吗？**

A：可以。把环境变量 `AI_GATEWAY_MODEL` 改成 `@makers/claude-sonnet-4-6` 或 `@makers/claude-opus-4-7`，重启即可。Claude 原生支持 vision，可以省掉 Agnes vision 预处理那一步（但当前代码还是会走 Agnes，因为更稳定）。

**Q：可以换其他生图 API 吗？**

A：可以。修改 `agents/chat.ts:callAgnesImage` 函数和 `IMG_*` 环境变量。需要支持：
- 同步 POST 返回图片 URL（避免 120s 超时）
- 图生图支持（如果保留参考图功能）

**Q：为什么不用 Claude Agent SDK 自带的 vision？**

A：本项目主聊天模型是 DeepSeek（无 vision），所以 vision 必须外包给 Agnes-2.0-Flash。如果你切换到真正的 Claude 模型，可以删掉 `callAgnesVision` 那段，直接在 `query()` 里传 image content block。

---

## 致谢

- [Claude Agent SDK](https://github.com/anthropics/claude-agent-sdk) — Anthropic 官方 Agent 框架
- [EdgeOne Makers](https://edgeone.cloud.tencent.com/) — 腾讯云边缘云 Serverless 平台
- [Agnes AI](https://agnes-ai.com/) — 多模态 AI 模型服务（图片识别 + 图片生成）
- 原始 ecom-details-image skill 的 prompt 工程体系来自 [claudesdk-skill](https://github.com/liangdabiao/claudesdk-skill)
- [linux.do](https://linux.do/) 社区佬友的讨论与启发

---

> GitHub 仓库持续维护中，欢迎 Issue / PR / Star：<https://github.com/liangdabiao/ecom-details-image-ui>
