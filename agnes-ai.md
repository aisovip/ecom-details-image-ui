
# Agnes AI API 在线文档


## 一、关于 Sapiens AI


Sapiens AI 是 Agnes AI 的母公司，专注于研发先进的多模态 AI 模型与基础设施，致力于为下一代智能应用、创意应用和交互式产品提供强大的 AI 能力支持。


我们的使命是：


**让世界级 AI 属于每一个人。**


通过 Agnes AI，我们希望降低高质量 AI 技术的使用门槛，让开发者、创作者、创业团队和企业都能够以更简单、更稳定、更低成本的方式，将先进的 AI 能力接入自己的产品与业务中。


我们相信，世界级 AI 不应该只属于少数大型机构，而应该成为每一位开发者都能使用、每一个产品都能集成、每一个用户都能受益的基础能力。


**Agnes AI，让世界级 AI 属于每一个人。**


---


## 二、Agnes AI API 简介


Agnes AI API 为开发者提供统一、稳定、易接入的多模态 AI 模型服务，支持文本、图像、视频等多种生成与理解能力。


开发者可以通过 Agnes AI API 快速构建 AI 原生应用，包括但不限于：

- AI 对话与文本生成
- 逻辑推理与内容理解
- 文生图与图像编辑
- 图生视频与视频生成
- 音视频同步生成
- Agent 工具与自动化工作流
- 创意内容生成与多模态交互应用

Agnes AI API 兼容 OpenAI 风格接口，方便开发者基于现有代码快速迁移和接入，减少开发成本，提高集成效率。


---


## 三、核心能力


Agnes AI API 目前主要支持以下核心能力：


### 1. 文本生成与推理


支持高质量文本生成、内容续写、摘要提取、逻辑推理、问答对话、代码辅助和 Agent 任务处理等场景。


适用场景包括：

- AI 聊天助手
- 内容创作
- 文档总结
- 智能问答
- 代码生成
- Agent 自动化任务

---


### 2. 图像生成与编辑


支持根据文本提示词生成高清图像，也支持对已有图片进行修改、优化和风格化处理。


适用场景包括：

- 文生图
- 图像编辑
- 商品图生成
- 创意海报生成
- 角色形象生成
- 社交媒体素材制作

---


### 3. 视频与音视频同步生成


支持生成高质量视频内容，并可支持音频与画面同步生成，减少后期制作流程，提升内容生产效率。


适用场景包括：

- AI 视频生成
- 图生视频
- 短视频创作
- 创意广告素材
- 角色动画
- 音视频同步内容生成

---


### 4. 多模态理解与创作


支持文本、图像、视频等多种模态能力组合，帮助开发者构建更智能、更自然的交互体验。


适用场景包括：

- 多模态 AI 助手
- 图片理解
- 视频理解
- 创意工作流
- AI 社交互动
- 教育、娱乐与生产力工具

---


## 四、模型能力概览


Agnes AI 提供多类型模型能力，包括文本模型、图像模型、视频模型和多模态模型。


其中，Sapiens AI 的模型体系包括高精度的 Claw 系列模型，以及面向创意生成场景的图像、视频和音视频模型。


这些模型可以帮助开发者快速完成从内容理解、文本生成，到图像生成、图像编辑、视频生成的完整 AI 能力接入。


---


## 五、接口兼容性


Agnes AI API 兼容 OpenAI 风格接口。


如果你已经使用过 OpenAI-Compatible API，通常只需要修改以下配置即可完成接入：

- Base URL
- API Key
- Model Name

这种兼容方式可以帮助开发者快速迁移现有项目，降低接入成本，并减少重复开发工作。


---


## 六、Base URL


所有 API 请求都应基于以下 Base URL 发起：


```plain text
https://apihub.agnes-ai.com/v1
```


请确保请求路径基于该地址拼接，避免因路径错误导致接口请求失败。


---


## 七、身份认证


所有 API 请求都需要通过 API Key 进行身份认证。


请在请求 Header 中携带以下参数，并将 `YOUR_API_KEY` 替换为你自己的有效 API Key：


```plain text
Authorization: Bearer YOUR_API_KEY
```


---


## 八、安全提醒


API Key 属于敏感信息，请妥善保管。


请勿将 API Key 暴露在以下位置：

- 公开代码仓库
- 前端客户端代码
- 截图或录屏内容
- 公开文档
- 可被他人访问的配置文件

如发现 API Key 泄露，建议立即在控制台删除或重置该 Key，以避免产生非授权调用。


---


## 九、快速开始


你可以按照以下步骤快速开始使用 Agnes AI API：


### 第一步：创建 API Key


登录 Agnes AI 控制台，进入 API Key 管理页面，创建并复制你的 API Key。


### 第二步：选择模型


根据你的使用场景选择对应模型，例如文本模型、图像模型、视频模型或多模态模型。


### 第三步：配置请求地址


将 API Base URL 配置为：


```plain text
https://apihub.agnes-ai.com/v1
```


### 第四步：发起 API 请求


在请求 Header 中加入 API Key，并按照 OpenAI-Compatible API 格式发起请求。


---


## 十、适用开发场景


Agnes AI API 适合用于以下产品和业务场景：

- AI 聊天应用
- AI 搜索与研究工具
- AI 写作与办公工具
- AI 图片生成工具
- AI 视频生成工具
- AI 角色与互动应用
- AI 社交产品
- Agent 自动化平台
- 创意内容生产平台
- 教育、娱乐、电商与营销工具

---


## 十一、文档说明


本文档用于帮助开发者快速了解 Agnes AI API 的基础能力、接入方式和使用规范。


如需查看具体模型参数、请求示例、返回格式和错误码说明，请继续阅读对应模型的详细接入文档。





# 快速开始


按照以下步骤，即可快速高效地开始使用 Agnes AI API。


## 前置条件


在发起任何 API 请求之前，请确保您已具备以下条件：

- 已激活的 Agnes AI Platform 账户
- 有效的 API Key（可在 Agnes AI 开发者控制台中生成）
- 账户余额，注册赠送0.1美元初始金额（不充值可享受免费账户权益，调用免费模型不扣费，有rpm限制）

## 第一步：创建账户


注册一个新的账户，或登录您现有的 Agnes AI Platform 账户。


在开发者控制台中，您可以管理 API Key、账单信息以及其他相关配置。


## 第二步：生成 API Key


为了验证您的 API 请求身份，请在 Agnes AI Platform 中创建一个 Secret API Key：


进入：


`Settings → API Keys → Create new secret key`


请妥善保存该密钥。后续所有 API 请求都将使用此密钥进行身份验证（详见 Authentication 章节）。


```assembly
Authorization: Bearer YOUR_API_KEY
```


## 第三步：充值账户余额


进入：


`Billing → Balance`


按照页面提示为账户充值。


注意：免费用户可以直接跳过充值。


## 第四步：发送第一个请求


下面是一个使用 `curl` 创建 Chat Completion 的示例请求（您也可以使用 Postman、Python requests 或其他 HTTP 客户端工具）：


```bash
curl https://apihub.agnes-ai.com/v1/chat/completions \
-H "Authorization: Bearer YOUR_API_KEY" \
-H "Content-Type: application/json" \
-d '{
    "model": "agnes-2.0-flash",
    "messages": [
      {
        "role": "user",
        "content": "Hello!"
      }
    ]
  }'
```


💡 在运行请求之前，请将 `YOUR_API_KEY` 替换为您的实际 API Key。


请求成功后，系统将返回与输入内容相对应的聊天补全结果。


## 第五步：后续步骤


完成首次请求后，您可以进一步探索以下内容，以充分发挥 Agnes AI API 的能力：

- 在开发者控制台的 `Models` 页面查看可用模型，并选择最适合您业务场景的模型。
- 阅读各个 API 接口的文档，了解请求参数、响应格式以及错误处理机制。
- 集成流式响应（Streaming Responses）、工具调用（Tool Calling）等高级功能，进一步增强应用能力与用户体验。


# Agnes-2.0-Flash


**Agnes-2.0-Flash** 是由 **Sapiens AI** 开发的一款快速、高效的语言模型，面向智能体工作流、工具调用、编程任务、推理、多轮对话、图片理解以及高频生产环境应用场景设计。


Agnes-2.0-Flash 在 **Claw-Eval** 基准测试中取得了强劲表现，在 **General Leaderboard** 中排名第 **9**，**Pass^3 分数为 60.9%**，展现出在主流语言模型中较强的自主智能体能力。


---


## 模型概述


Agnes-2.0-Flash 针对快速、可靠、低成本的语言生成、智能体任务执行和图片理解进行了优化。


该模型支持以下能力：


| 能力              | 说明                                   |
| --------------- | ------------------------------------ |
| Chat Completion | 为对话和应用生成高质量回复                        |
| 多轮对话            | 在多轮交互中保持上下文连续性                       |
| 图片 URL 输入       | 支持通过公网图片 URL 传入图片内容                  |
| 图片理解            | 支持基于图片的内容理解、截图分析和信息提取                |
| 工具调用            | 调用外部工具和函数，支持智能体工作流                   |
| 智能体工作流          | 支持规划、执行和多步骤任务完成                      |
| 编程任务            | 辅助代码生成、调试、解释和重构                      |
| 推理              | 处理结构化推理、任务拆解和决策                      |
| 流式输出            | 实时返回响应，提升用户体验                        |
| OpenAI 兼容 API   | 使用兼容 OpenAI Chat Completions API 的结构 |


---


## 适用场景


Agnes-2.0-Flash 适用于以下场景：


| 场景      | 示例用例                   |
| ------- | ---------------------- |
| AI 助手   | 通用问答、日常助手、效率支持         |
| 自主智能体   | 多步骤任务执行、规划和工具使用        |
| 编程助手    | 代码生成、调试、重构和解释          |
| 工作流自动化  | 任务拆解、流程自动化和执行规划        |
| 客户支持    | FAQ 问答、客服聊天机器人、服务自动化   |
| 搜索与问答   | 基于搜索的回答、摘要生成、信息提取      |
| 内容生成    | 营销文案、文章、产品描述、脚本        |
| 开发者工具   | API 助手、文档助手、编程 Copilot |
| AI 原生应用 | 消费级应用、效率工具、智能体应用       |
| 图片理解    | 图片描述、截图分析、视觉问答、信息提取    |


---


## API 信息


### Endpoint


| 项目                    | 说明                                              |
| --------------------- | ----------------------------------------------- |
| API Endpoint          | https://apihub.agnes-ai.com/v1/chat/completions |
| Request Method        | POST                                            |
| Content-Type          | application/json                                |
| Authentication        | Bearer Token                                    |
| Authentication Header | Authorization: Bearer YOUR_API_KEY              |


---


## 请求参数


| 参数                   | 类型              | 是否必填 | 说明                                       |
| -------------------- | --------------- | ---- | ---------------------------------------- |
| model                | string          | 是    | 模型名称，固定为 agnes-2.0-flash                 |
| messages             | array           | 是    | 对话消息数组，包括 system、user 和 assistant 消息     |
| messages[].content   | string / array  | 是    | 消息内容。可为纯文本字符串，也可为包含 text、image_url 的内容数组 |
| temperature          | number          | 否    | 控制输出随机性。较低值会生成更确定性的结果                    |
| top_p                | number          | 否    | 控制核采样。较低值会使输出更加聚焦                        |
| max_tokens           | number          | 否    | 响应中最多生成的 token 数                         |
| stream               | boolean         | 否    | 是否启用流式响应输出                               |
| tools                | array           | 否    | 用于工具调用工作流的工具定义                           |
| tool_choice          | string / object | 否    | 控制模型是否以及如何使用工具                           |
| chat_template_kwargs | object          | 否    | OpenAI 兼容请求中用于开启 Thinking 等扩展能力          |
| thinking             | object          | 否    | Anthropic 兼容请求中用于开启 Thinking 模式          |


---


## 图片 URL 输入支持


Agnes-2.0-Flash 支持通过图片 URL 输入图片内容。开发者可以在同一个 `messages` 请求中同时传入文本指令和图片 URL，让模型基于图片进行理解、分析、问答或信息提取。


支持的输入类型包括：


| 输入类型   | 支持方式      | 说明               |
| ------ | --------- | ---------------- |
| 文本     | text      | 普通文本指令或问题        |
| 图片 URL | image_url | 通过公网可访问的图片链接传入图片 |


### 图片内容结构


当使用图片 URL 输入时，`messages[].content` 应使用数组结构，每个内容块代表一种输入内容。


```json
{
  "role": "user",
  "content": [
    {
      "type": "text",
      "text": "Describe the content of this image."
    },
    {
      "type": "image_url",
      "image_url": {
        "url": "https://example.com/image.jpg"
      }
    }
  ]
}
```


---


## 调用示例


### 1. 基础 Chat Completion 请求


用于生成普通的聊天补全响应。


```bash
curl https://apihub.agnes-ai.com/v1/chat/completions \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "agnes-2.0-flash",
    "messages": [
      {
        "role": "system",
        "content": "You are a helpful AI assistant."
      },
      {
        "role": "user",
        "content": "Explain how autonomous agents use tools to complete tasks."
      }
    ],
    "temperature": 0.7,
    "max_tokens": 1024
  }'
```


---


### 2. 流式输出请求


用于启用流式输出。


```bash
curl https://apihub.agnes-ai.com/v1/chat/completions \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "agnes-2.0-flash",
    "messages": [
      {
        "role": "user",
        "content": "Write a short product introduction for an AI assistant app."
      }
    ],
    "stream": true
  }'
```


---


### 3. 工具调用请求


用于需要外部工具调用的智能体工作流。


```bash
curl https://apihub.agnes-ai.com/v1/chat/completions \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "agnes-2.0-flash",
    "messages": [
      {
        "role": "user",
        "content": "What is the weather like in Singapore today?"
      }
    ],
    "tools": [
      {
        "type": "function",
        "function": {
          "name": "get_weather",
          "description": "Get the current weather for a location",
          "parameters": {
            "type": "object",
            "properties": {
              "location": {
                "type": "string",
                "description": "The city and country"
              }
            },
            "required": ["location"]
          }
        }
      }
    ]
  }'
```


---


### 4. 图片 URL 输入请求


用于通过图片链接传入图片，并让模型理解或分析图片内容。


```bash
curl https://apihub.agnes-ai.com/v1/chat/completions \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "agnes-2.0-flash",
    "messages": [
      {
        "role": "user",
        "content": [
          {
            "type": "text",
            "text": "Describe the content of this image."
          },
          {
            "type": "image_url",
            "image_url": {
              "url": "https://example.com/image.jpg"
            }
          }
        ]
      }
    ]
  }'
```


---


## 响应格式


```json
{
  "id": "chatcmpl_xxx",
  "object": "chat.completion",
  "created": 1774432125,
  "model": "agnes-2.0-flash",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "Autonomous agents use tools by understanding the user's goal, breaking it into steps, selecting the right tools, executing actions, and using the results to complete the task."
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 35,
    "completion_tokens": 58,
    "total_tokens": 93
  }
}
```


---


## 响应字段说明


| 字段                        | 类型      | 说明                       |
| ------------------------- | ------- | ------------------------ |
| id                        | string  | 本次补全请求的唯一 ID             |
| object                    | string  | 对象类型，通常为 chat.completion |
| created                   | integer | 请求时间戳                    |
| model                     | string  | 本次请求使用的模型                |
| choices                   | array   | 生成的响应结果列表                |
| choices[].index           | integer | 响应结果的索引                  |
| choices[].message         | object  | Assistant 消息对象           |
| choices[].message.role    | string  | 消息发送者角色                  |
| choices[].message.content | string  | 模型生成的响应内容                |
| choices[].finish_reason   | string  | 生成停止原因                   |
| usage                     | object  | Token 使用信息               |
| usage.prompt_tokens       | integer | 输入 token 数量              |
| usage.completion_tokens   | integer | 输出 token 数量              |
| usage.total_tokens        | integer | 使用的 token 总数             |


---


## 为编码任务启用 Thinking


对于代码编写、调试、推理和 Agent 工作流，建议开启 Thinking 模式，以提升代码质量、任务拆解能力和问题解决效果。


### OpenAI 兼容请求


使用 OpenAI 兼容 API 格式时，在请求体中添加 `chat_template_kwargs.enable_thinking`：


```json
{
  "model": "agnes-2.0-flash",
  "messages": [
    {
      "role": "user",
      "content": "Help me write a Python script to process a CSV file."
    }
  ],
  "chat_template_kwargs": {
    "enable_thinking": true
  }
}
```


### Anthropic 兼容请求


使用 Anthropic 兼容 API 格式时，在请求体中添加 `thinking` 字段：


```json
{
  "model": "agnes-2.0-flash",
  "messages": [
    {
      "role": "user",
      "content": "Help me refactor this TypeScript function and explain the changes."
    }
  ],
  "thinking": {
    "type": "enabled",
    "budget_tokens": 2048
  }
}
```


`budget_tokens` 用于控制最大 Thinking token 预算。对于常见编码任务，建议从 `2048` 开始设置。对于更复杂的调试、重构或多步骤 Agent 任务，可以根据需要适当提高该值。


---


## 功能与兼容性


Agnes-2.0-Flash 支持以下能力：

- Chat Completion
- 多轮对话
- System Prompt
- 图片 URL 输入
- 图片理解
- 流式输出
- 工具调用
- 智能体工作流
- 编程任务
- 推理任务
- JSON 风格输出
- 兼容 OpenAI Chat Completions API 的请求结构

---


## 最佳实践


### Prompt 编写建议


为了获得更好的结果，建议提供清晰的指令、上下文和期望的输出格式。


### 示例：产品文案生成


```plain text
You are a product marketing expert. Write a concise App Store description for an AI assistant app. The tone should be clear, professional, and user-friendly.
```


### 示例：编程任务


对于编程任务，建议提供编程语言、框架、错误信息和期望行为。


```plain text
Help me debug this React component. The issue is that the button state does not update after clicking. Explain the cause and provide the corrected code.
```


### 示例：智能体工作流


对于智能体工作流，建议清晰描述目标、可用工具和任务约束。


```plain text
You are an autonomous research agent. Search for relevant information, summarize the key findings, and return the result in a structured format with source links.
```


### 示例：图片理解任务


对于图片理解任务，建议明确说明希望模型关注的内容，例如整体描述、文字提取、界面分析、物体识别或结构化输出。


```plain text
Analyze this screenshot. Identify the main UI elements, explain the possible issue, and provide suggestions to improve the user experience.
```


---


## 推荐 Prompt 结构


建议使用以下结构组织 Prompt：


```plain text
[Role] + [Task] + [Context] + [Requirements] + [Output Format]
```


### 示例


```plain text
You are a senior product manager. Analyze this feature idea for an AI assistant app. Consider user value, implementation complexity, risks, and return the result in a structured table.
```


### 图片理解 Prompt 示例


```plain text
You are an image analysis assistant. Analyze the provided image URL, summarize the key information, identify potential issues, and return the result in a structured table.
```


---


## 图片 URL 使用建议

- 图片 URL 必须可公网访问。
- 如果图片 URL 需要登录、鉴权或存在防盗链，模型可能无法读取。
- 建议使用标准图片格式，例如 JPG、JPEG、PNG 或 WebP。
- 对于截图、报错图、产品界面图，建议在文本中补充你希望模型重点关注的问题。
- 图片 URL 输入可以与工具调用、流式输出和 Agent 工作流结合使用。

---


## 模型限制


| 项目         | 数值    |
| ---------- | ----- |
| Context    | 256K  |
| Max Output | 65.5K |


---


## 价格


| 类型            | 价格                | 现价             |
| ------------- | ----------------- | -------------- |
| Input Tokens  | $0.03 / 1M tokens | $0 / 1M tokens |
| Output Tokens | $0.15 / 1M tokens | $0 / 1M tokens |


---


## 说明

- 使用 `agnes-2.0-flash` 作为模型名称。
- 基础 Chat Completion 请求必须包含 `model` 和 `messages`。
- `messages[].content` 可使用纯文本字符串，也可使用包含文本和图片 URL 的内容数组。
- 如需输入图片，请使用 `image_url` 并提供公网可访问的图片 URL。
- 如需启用流式响应，请将 `stream` 设置为 `true`。
- 对于工具调用工作流，请提供 `tools`，并可按需提供 `tool_choice`。
- `temperature` 用于控制随机性。较低值更适合确定性任务，较高值更适合创意生成。
- Agnes-2.0-Flash 适合需要快速响应、强任务完成能力、图片理解能力和可靠智能体表现的生产级应用。




# Agnes Image 2.1 Flash


## 模型概述


**Agnes Image 2.1 Flash** 是 Sapiens AI 升级推出的图像生成模型，支持 **文生图** 和 **图生图** 两种工作流。


相比之前版本，Agnes Image 2.1 Flash 在 **高信息密度图像** 生成方面进行了优化，更适合复杂视觉细节、丰富构图、密集元素和清晰语义对齐等场景。


Agnes Image 2.1 Flash 可用于根据文本提示词生成图像，也可基于已有图片进行风格转换、局部优化、场景重塑或视觉增强，并支持以图片 URL 或 Base64 数据形式返回生成结果。


---


# 核心能力


| 能力                | 说明                                 |
| ----------------- | ---------------------------------- |
| 文生图               | 根据自然语言提示词生成高质量图片                   |
| 图生图               | 根据提示词对已有图片进行转换、编辑或优化               |
| 高信息密度图像优化         | 更好处理复杂布局、丰富细节和密集视觉元素               |
| 构图保持              | 图生图时可尽量保持原图构图、主体结构和视角              |
| 灵活尺寸控制            | 支持自定义输出尺寸，例如 1024x768              |
| URL 返回            | 支持将生成结果以可访问图片 URL 返回               |
| Base64 返回         | 支持将生成结果以 Base64 数据返回               |
| URL 或 Data URI 输入 | 图生图支持公网图片 URL 或 Data URI Base64 输入 |


---


# 适用场景


Agnes Image 2.1 Flash 适用于以下场景：


| 场景      | 示例用途                   |
| ------- | ---------------------- |
| 创意设计    | 概念图、视觉探索、海报草图          |
| 营销内容    | 活动图、产品视觉、社交媒体素材        |
| 高密度视觉生成 | 复杂场景、丰富构图、密集元素画面       |
| 图片转换    | 风格迁移、场景重打光、背景转换        |
| 内容生产    | App 素材、缩略图、Banner、叙事视觉 |
| 产品视觉    | 产品图、展示图、商业视觉           |
| 社交媒体素材  | 封面图、横幅图、帖子配图           |


---


# API 信息


## Base URL


```plain text
https://apihub.agnes-ai.com
```


## 接口地址


| 项目           | 说明                                                |
| ------------ | ------------------------------------------------- |
| API Endpoint | https://apihub.agnes-ai.com/v1/images/generations |
| 请求方法         | POST                                              |
| Content-Type | application/json                                  |
| 认证方式         | Bearer Token                                      |
| 认证 Header    | Authorization: Bearer YOUR_API_KEY                |


---


# 模型名称


文生图和图生图均使用以下模型名称：


```plain text
agnes-image-2.1-flash
```


---


# 重要说明

- 请使用 `agnes-image-2.1-flash` 作为模型名称。
- 文生图请求中，`model`、`prompt`、`size` 为必填参数。
- 图生图请求中，请将输入图片放在顶层 `image` 数组中。
- `image` 支持公网图片 URL，也支持 Data URI Base64。
- 不要将 `response_format` 放在请求体顶层，否则可能返回 400 错误。
- 如需 URL 输出，请将 `"response_format": "url"` 放在 `extra_body` 中。
- 如需文生图 Base64 输出，可使用顶层参数 `"return_base64": true`。
- 如需图生图 Base64 输出，请在 `extra_body` 中设置 `"response_format": "b64_json"`。
- 图生图不需要传 `tags: ["img2img"]`。
- 公开文档中不要暴露临时 API Key，请统一使用 `YOUR_API_KEY`。

---


# 请求参数


| 参数                         | 类型       | 是否必填  | 说明                                |
| -------------------------- | -------- | ----- | --------------------------------- |
| model                      | string   | 是     | 模型名称，固定使用 agnes-image-2.1-flash   |
| prompt                     | string   | 是     | 图片生成或图片编辑提示词                      |
| size                       | string   | 是     | 输出图片尺寸，例如 1024x768                |
| image                      | string[] | 图生图必填 | 输入图片数组，支持公网 URL 或 Data URI Base64 |
| return_base64              | boolean  | 否     | 文生图需要返回 Base64 时使用                |
| extra_body                 | object   | 否     | 高级工作流扩展参数                         |
| extra_body.response_format | string   | 否     | 输出格式，常用值为 url 或 b64_json          |


---


# 调用示例


## 1. 文生图：URL 输出


用于根据文本提示词生成图片，并以图片 URL 形式返回结果。


```bash
curl https://apihub.agnes-ai.com/v1/images/generations \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "agnes-image-2.1-flash",
    "prompt": "A luminous floating city above a misty canyon at sunrise, cinematic realism",
    "size": "1024x768",
    "extra_body": {
      "response_format": "url"
    }
  }'
```


生成图片 URL 位于：


```plain text
data[0].url
```


---


## 2. 文生图：Base64 输出


用于将生成图片以 Base64 数据形式返回。


```bash
curl https://apihub.agnes-ai.com/v1/images/generations \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "agnes-image-2.1-flash",
    "prompt": "A clean product photo of a glass cube on a white studio background, soft shadows, high detail",
    "size": "1024x768",
    "return_base64": true
  }'
```


生成图片 Base64 位于：


```plain text
data[0].b64_json
```


---


## 3. 图生图：URL 输入，URL 输出


用于基于已有图片进行转换，并尽量保持原图构图。


```bash
curl https://apihub.agnes-ai.com/v1/images/generations \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "agnes-image-2.1-flash",
    "prompt": "Transform the scene into a rain-soaked cyberpunk night with neon reflections while preserving the original composition",
    "size": "1024x768",
    "extra_body": {
       "image": [
      "https://example.com/input-image.png"
    ],
      "response_format": "url"
    }
  }'
```


生成图片 URL 位于：


```plain text
data[0].url
```


---


## 4. 图生图：URL 输入，Base64 输出


用于输入图片为公网 URL，输出结果为 Base64 数据的场景。


```bash
curl https://apihub.agnes-ai.com/v1/images/generations \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "agnes-image-2.1-flash",
    "prompt": "Make the object orange while preserving the original composition",
    "size": "1024x768"
    "extra_body": {
      "image": [
      "https://example.com/input-image.png"
    ],
      "response_format": "b64_json"
    }
  }'
```


生成图片 Base64 位于：


```plain text
data[0].b64_json
```


---


## 5. 图生图：Data URI Base64 输入


图生图也支持使用 Data URI Base64 作为输入图片。


Data URI 格式：


```plain text
data:image/png;base64,BASE64_HERE
```


请求示例：


```bash
curl https://apihub.agnes-ai.com/v1/images/generations \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "agnes-image-2.1-flash",
    "prompt": "Make the object matte black while preserving the original composition",
    "size": "1024x768",
    "extra_body": {
       "image": [
      "data:image/png;base64,BASE64_HERE"
    ],
      "response_format": "b64_json"
    }
  }'
```


---


# 返回格式


## URL 输出


当 `extra_body.response_format` 设置为 `url` 时，返回格式如下：


```json
{
  "created": 1780000000,
  "data": [
    {
      "url": "https://storage.googleapis.com/agnes-aigc/xxx.png",
      "b64_json": null,
      "revised_prompt": null
    }
  ]
}
```


生成图片 URL：


```plain text
data[0].url
```


---


## Base64 输出


当启用 Base64 输出时，返回格式如下：


```json
{
  "created": 1780000000,
  "data": [
    {
      "url": null,
      "b64_json": "iVBORw0KGgoAAAANSUhEUgAA...",
      "revised_prompt": null
    }
  ]
}
```


生成图片 Base64：


```plain text
data[0].b64_json
```


---


# 推荐提示词结构


为了获得更好的图像生成效果，建议使用清晰的提示词结构：


```plain text
[主体] + [场景 / 环境] + [风格] + [光照] + [构图] + [质量要求]
```


## 示例


```plain text
A luminous floating city above a misty canyon at sunrise, cinematic realism, wide-angle composition, rich architectural details, soft golden light, high visual density
```


对于图生图任务，需要明确说明“要改变什么”和“要保留什么”。


```plain text
Transform the scene into a rain-soaked cyberpunk night with neon reflections while preserving the original composition and main subject layout.
```


---


# 最佳实践


## 文生图建议


生成复杂图片时，建议使用更具体的提示词，包含主体、环境、风格、光照、镜头角度和细节要求。


较好示例：


```plain text
A futuristic city marketplace filled with flying vehicles, holographic signs, dense crowds, neon lighting, cinematic realism, ultra-detailed, high-information-density composition
```


推荐包含以下元素：

- 主体
- 场景或环境
- 视觉风格
- 光照
- 镜头角度
- 构图
- 细节密度
- 质量要求

---


## 图生图建议


编辑已有图片时，建议同时说明转换要求和保留要求。


较好示例：


```plain text
Convert the image into a fantasy winter landscape, add snow, warm window lights, and a magical atmosphere, while preserving the original building structure and camera angle.
```


推荐结构：


```plain text
[修改要求] + [新风格 / 新场景] + [需要添加或移除的元素] + [需要保留的元素]
```


示例：


```plain text
Change the daytime street scene into a cinematic cyberpunk night scene, add neon signs and wet road reflections, while preserving the original street layout, camera angle, and main building shapes.
```


---


## 高信息密度图片建议


Agnes Image 2.1 Flash 针对复杂、细节丰富的视觉画面进行了优化。为了获得更好的结果，建议明确描述视觉层级。


推荐包含：

- 主体
- 背景环境
- 重要次要元素
- 风格和光照
- 构图约束
- 图生图时需要保留的内容

较好示例：


```plain text
A large fantasy harbor city built on cliffs, hundreds of small boats, layered stone bridges, glowing windows, distant mountains, cloudy sunset sky, cinematic fantasy realism, wide-angle composition, rich architectural details, high visual density
```


---


# 常见错误与排查


## 1. `response_format` 放在顶层导致报错


不要将 `response_format` 放在请求体顶层。


错误示例：


```json
{
  "model": "agnes-image-2.1-flash",
  "prompt": "A futuristic city",
  "size": "1024x768",
  "response_format": "url"
}
```


正确示例：


```json
{
  "model": "agnes-image-2.1-flash",
  "prompt": "A futuristic city",
  "size": "1024x768",
  "extra_body": {
    "response_format": "url"
  }
}
```


---


## 2. 图生图不需要 `tags`


不要传：


```json
{
  "tags": ["img2img"]
}
```


图生图只需要在 `image` 数组中提供输入图片。


正确示例：


```json
{
  "model": "agnes-image-2.1-flash",
  "prompt": "Make the object blue while preserving the original composition",
  "size": "1024x768",
  "extra_body": {
    "image": [
    "https://example.com/input.png"
  ],
    "response_format": "url"
  }
}
```


---


## 3. 输入图片 URL 不可访问


如果输入图片 URL 无法被服务端访问，请求可能失败。


建议：

- 使用公网可访问的 HTTPS 图片地址。
- 确保图片 URL 不需要登录、Cookie 或私有 Header。
- 如果图片无法公开访问，建议使用 Data URI Base64 输入。

---


## 4. 请求超时


图片生成可能需要数秒到几十秒，具体取决于提示词复杂度、图片尺寸和服务负载。


建议客户端超时时间设置为：


```plain text
60s 到 360s
```


---


## 5. 图生图请求缺少 `image`


图生图请求中，`image` 数组为必填。


错误示例：


```json
{
  "model": "agnes-image-2.1-flash",
  "prompt": "Make the image cyberpunk style",
  "size": "1024x768"
}
```


正确示例：


```json
{
  "model": "agnes-image-2.1-flash",
  "prompt": "Make the image cyberpunk style while preserving the original composition",
  "size": "1024x768",
  "extra_body": {
    "image": [
    "https://example.com/input.png"
  ],
    "response_format": "url"
  }
}
```


---


# 价格


| 类型   | 价格           |
| ---- | ------------ |
| 生成图片 | 0 $0.003 / 张 |


---


# 备注

- 模型名称固定使用 `agnes-image-2.1-flash`。
- API Endpoint 使用 `https://apihub.agnes-ai.com/v1/images/generations`。
- 文生图请求中，`model`、`prompt`、`size` 为必填。
- 图生图请求中，请将输入图片 URL 或 Data URI Base64 放在顶层 `image` 数组中。
- 需要图片 URL 输出时，使用 `extra_body.response_format: "url"`。
- 文生图需要 Base64 输出时，使用 `return_base64: true`。
- 图生图需要 Base64 输出时，使用 `extra_body.response_format: "b64_json"`。
- 不要将 `response_format` 放在请求体顶层。
- 不需要传 `tags: ["img2img"]`。
- 公开文档中不要暴露临时 API Key，请使用 `YOUR_API_KEY`。




# Agnes-Video-V2.0 API 接入指南


## 概述


Agnes-Video-V2.0 是一款面向生产环境的视频生成模型，支持 **文生视频**、**图生视频**、**多图视频生成** 和 **关键帧动画** 工作流。


开发者可以通过文本提示词、图片 URL 或多张参考图片生成高质量视频。该模型适用于故事创作、营销视频、产品演示、社交媒体内容、App 动态素材以及 AI 创意工作流。


Agnes-Video-V2.0 采用异步任务式 API。你需要先创建视频生成任务，然后使用返回的 `video_id` 或 `task_id` 查询视频结果。


---


## 支持能力


| 能力     | 说明                    |
| ------ | --------------------- |
| 文生视频   | 根据文本提示词直接生成视频         |
| 图生视频   | 将静态图片动画化为动态视频         |
| 多图视频生成 | 使用多张参考图片指导视频生成        |
| 关键帧动画  | 在多个关键帧之间生成平滑过渡        |
| 场景运动控制 | 通过提示词控制主体动作、镜头运动和场景动态 |
| 视觉一致性  | 在多帧之间保持主体、风格和场景一致     |
| 电影级输出  | 生成高质量电影级视频            |
| 异步 API | 先提交任务，再查询生成结果         |


---


## 适用场景


| 场景          | 示例                       |
| ----------- | ------------------------ |
| 故事创作        | 短片、角色场景、叙事片段             |
| 营销视频        | 产品广告、活动视频、推广内容           |
| 社交媒体内容      | Reels、Shorts、TikTok 风格视频 |
| 图像动画化       | 动画化人像、产品、角色或场景           |
| 产品演示        | 根据文本或图像生成产品展示视频          |
| 关键帧过渡       | 在不同视觉状态之间生成平滑转场          |
| 游戏 / App 素材 | 为数字产品生成动态视觉素材            |
| 沉浸式内容       | 生成电影级 AI 场景和氛围视频         |


---


## 准备工作


开始接入前，请确保你已经具备以下条件：

1. 已获得有效的 Agnes AI API Key。
2. 当前网络环境可以访问 Agnes AI API Gateway。
3. 已确认模型名称：`agnes-video-v2.0`。
4. 已准备好视频生成所需的文本提示词。
5. 如需使用图生视频、多图视频或关键帧动画，请准备可公网访问的图片 URL。

---


## API Endpoints


### 创建视频任务


| 项目             | 说明                                    |
| -------------- | ------------------------------------- |
| Endpoint       | https://apihub.agnes-ai.com/v1/videos |
| Method         | POST                                  |
| Content-Type   | application/json                      |
| Authentication | Bearer Token                          |
| Header         | Authorization: Bearer YOUR_API_KEY    |


---


### 查询视频结果：推荐方式


创建视频任务后，响应中会返回 `video_id`。


推荐使用 `video_id` 查询视频结果。


| 项目             | 说明                                                       |
| -------------- | -------------------------------------------------------- |
| Endpoint       | https://apihub.agnes-ai.com/agnesapi?video_id=<VIDEO_ID> |
| Method         | GET                                                      |
| Authentication | Bearer Token                                             |
| Header         | Authorization: Bearer YOUR_API_KEY                       |


---


### 查询视频结果：兼容旧方式


旧版任务查询接口仍然支持，用于兼容已有接入逻辑。


| 项目             | 说明                                              |
| -------------- | ----------------------------------------------- |
| Endpoint       | https://apihub.agnes-ai.com/v1/videos/{task_id} |
| Method         | GET                                             |
| Authentication | Bearer Token                                    |
| Header         | Authorization: Bearer YOUR_API_KEY              |


---


## 请求参数


### 创建视频任务参数


| 参数                  | 类型             | 是否必填 | 说明                         |
| ------------------- | -------------- | ---- | -------------------------- |
| model               | string         | 是    | 模型名称，使用 agnes-video-v2.0   |
| prompt              | string         | 是    | 视频内容的文本描述                  |
| image               | string / array | 否    | 图片 URL 或图片 URL 数组          |
| mode                | string         | 否    | 生成模式，例如 ti2vid 或 keyframes |
| height              | integer        | 否    | 视频高度，默认值为 768              |
| width               | integer        | 否    | 视频宽度，默认值为 1152             |
| num_frames          | integer        | 否    | 视频帧数，必须 ≤ 441，且满足 8n + 1   |
| frame_rate          | number         | 否    | 视频 FPS，支持范围为 1–60          |
| num_inference_steps | integer        | 否    | 推理步数                       |
| seed                | integer        | 否    | 随机种子，用于保证结果可复现             |
| negative_prompt     | string         | 否    | 负向提示词，用于描述需要避免的内容          |
| extra_body.image    | array          | 否    | 多图视频或关键帧模式中的输入图片 URL       |
| extra_body.mode     | string         | 否    | 额外模式设置，例如 keyframes        |


---


### 参数标准化说明


Agnes-Video-V2.0 会对部分视频生成参数进行标准化处理，以保证生成稳定性和输出一致性。当开发者传入的 `width`、`height` 或宽高比不完全匹配模型支持的标准规格时，系统会自动识别最接近的分辨率档位和宽高比，并映射为对应的标准输出尺寸。


当前模型支持 `480p`、`720p` 和 `1080p` 三个标准分辨率档位，推荐使用以下宽高比：


| 宽高比  | 推荐场景                                     |
| ---- | ---------------------------------------- |
| 16:9 | 横屏视频、产品演示、官网展示、YouTube 风格内容              |
| 9:16 | 竖屏短视频、移动端内容、TikTok / Reels / Shorts 风格内容 |
| 1:1  | 方形视频、社交媒体 Feed、角色或商品展示                   |
| 4:3  | 传统横向画幅、通用展示内容                            |
| 3:4  | 竖向展示、人物或商品主体突出的视频内容                      |


不同分辨率和宽高比会对应不同的实际输出尺寸和最大帧数限制。例如，接近 `720p / 16:9` 的输入尺寸会被标准化为对应的标准输出尺寸。


因此，请求中的原始 `width`、`height`、`num_frames` 等参数可能与实际执行时的标准参数不完全一致。开发者在展示任务信息、计算视频时长或排查生成问题时，应以接口返回结果中的 `size`、`seconds` 等字段为准。


---


## 创建视频任务


### 示例 1：文生视频


用于直接根据文本提示词生成视频。


```bash
curl -X POST https://apihub.agnes-ai.com/v1/videos \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "agnes-video-v2.0",
    "prompt": "A cinematic shot of a cat walking on the beach at sunset, soft ocean waves, warm golden lighting, realistic motion",
    "height": 768,
    "width": 1152,
    "num_frames": 121,
    "frame_rate": 24
  }'
```


---


### 示例 2：图生视频


用于将单张图片动画化。


```bash
curl -X POST https://apihub.agnes-ai.com/v1/videos \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "agnes-video-v2.0",
    "prompt": "The woman slowly turns around and looks back at the camera, natural facial expression, cinematic camera movement",
    "image": "https://example.com/image.png",
    "num_frames": 121,
    "frame_rate": 24
  }'
```


---


### 示例 3：多图视频生成


用于通过多张输入图片指导视频生成。


```bash
curl -X POST https://apihub.agnes-ai.com/v1/videos \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "agnes-video-v2.0",
    "prompt": "Create a smooth transformation scene between the two reference images, cinematic lighting, consistent character identity, natural motion",
    "extra_body": {
      "image": [
        "https://example.com/image1.png",
        "https://example.com/image2.png"
      ]
    },
    "num_frames": 121,
    "frame_rate": 24
  }'
```


---


### 示例 4：关键帧动画


用于在多个关键帧之间生成平滑动画。


```bash
curl -X POST https://apihub.agnes-ai.com/v1/videos \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "agnes-video-v2.0",
    "prompt": "Generate a smooth cinematic transition between the keyframes, maintaining visual consistency and natural camera movement",
    "extra_body": {
      "image": [
        "https://example.com/keyframe1.png",
        "https://example.com/keyframe2.png"
      ],
      "mode": "keyframes"
    },
    "num_frames": 121,
    "frame_rate": 24
  }'
```


---


## 创建任务响应


视频任务创建成功后，API 会返回任务信息。


响应中会同时包含 `task_id` 和 `video_id`。


其中，`video_id` 是推荐用于查询视频结果的 ID。


```json
{
  "id": "task_YOUR_TASK_ID",
  "task_id": "task_YOUR_TASK_ID",
  "video_id": "video_YOUR_VIDEO_ID",
  "object": "video",
  "model": "agnes-video-v2.0",
  "status": "queued",
  "progress": 0,
  "created_at": 1780457477,
  "seconds": "10.0",
  "size": "1280x768"
}
```


### 响应字段说明


| 字段         | 类型      | 说明               |
| ---------- | ------- | ---------------- |
| id         | string  | 任务 ID，可用于旧版查询接口  |
| task_id    | string  | 任务 ID，作用与 id 相同  |
| video_id   | string  | 视频 ID，推荐用于查询视频结果 |
| object     | string  | 对象类型，通常为 video   |
| model      | string  | 当前任务使用的模型        |
| status     | string  | 当前任务状态           |
| progress   | integer | 当前任务进度百分比        |
| created_at | integer | 任务创建时间戳          |
| seconds    | string  | 视频时长，单位为秒        |
| size       | string  | 视频分辨率            |


---


## 查询视频结果


### 推荐方式：使用 `video_id` 查询


创建视频任务后，使用返回的 `video_id` 查询视频结果。建议轮询间隔5s。


```bash
curl --location --request GET 'https://apihub.agnes-ai.com/agnesapi?video_id=<VIDEO_ID>' \
  --header 'Authorization: Bearer <API_KEY>'
```


示例：


```bash
curl --location --request GET 'https://apihub.agnes-ai.com/agnesapi?video_id=video_xxxxxx' \
  --header 'Authorization: Bearer <API_KEY>'
```


---


### 可选参数：`model_name`


查询视频结果时，也可以传入 `model_name` 显式指定模型名。


```bash
curl --location --request GET 'https://apihub.agnes-ai.com/agnesapi?video_id=<VIDEO_ID>&model_name=<MODEL>' \
  --header 'Authorization: Bearer <API_KEY>'
```


示例：


```bash
curl --location --request GET 'https://apihub.agnes-ai.com/agnesapi?video_id=video_xxxxxx&model_name=agnes-video-v2.0' \
  --header 'Authorization: Bearer <API_KEY>'
```


---


### 兼容方式：使用 `task_id` 查询


为了兼容旧版本，仍然可以使用 `task_id` 查询视频结果。


```bash
curl --location --request GET 'https://apihub.agnes-ai.com/v1/videos/<TASK_ID>' \
  --header 'Authorization: Bearer <API_KEY>'
```


示例：


```bash
curl --location --request GET 'https://apihub.agnes-ai.com/v1/videos/task_xxxxxx' \
  --header 'Authorization: Bearer <API_KEY>'
```


该方式仍然支持，但新的接入建议使用 `video_id` 查询方式。


---


## 查询结果响应


当任务完成后，API 会返回最终视频结果。


```json
{
  "id": "task_YOUR_TASK_ID",
  "video_id": "video_YOUR_VIDEO_ID",
  "model": "agnes-video-v2.0",
  "object": "video",
  "status": "completed",
  "progress": 100,
  "seconds": "10.0",
  "size": "1280x768",
  "remixed_from_video_id": "https://storage.googleapis.com/agnes-aigc/aigc/videos/2026/06/03/video_xxxxxx.mp4",
  "error": null
}
```


### 结果字段说明


| 字段                    | 类型            | 说明                                        |
| --------------------- | ------------- | ----------------------------------------- |
| id                    | string        | 任务 ID                                     |
| video_id              | string        | 视频 ID                                     |
| model                 | string        | 当前任务使用的模型                                 |
| object                | string        | 对象类型                                      |
| status                | string        | 任务状态                                      |
| progress              | integer       | 任务进度百分比                                   |
| seconds               | string        | 视频时长，单位为秒                                 |
| size                  | string        | 视频分辨率                                     |
| remixed_from_video_id | string        | 本字段为最终生成的视频 URL，仅在 status 为 completed 时可用 |
| error                 | object / null | 错误信息，任务失败时返回                              |


---


## 任务状态说明


| 状态          | 说明        |
| ----------- | --------- |
| queued      | 任务正在队列中等待 |
| in_progress | 视频正在生成中   |
| completed   | 视频已生成完成   |
| failed      | 视频生成失败    |


---


## 视频时长控制


Agnes-Video-V2.0 支持通过 `num_frames` 和 `frame_rate` 控制视频时长。


计算公式：


```plain text
seconds = num_frames / frame_rate
```


其中：

- `num_frames` 表示生成的视频总帧数；
- `frame_rate` 表示视频帧率，即每秒播放多少帧；
- `num_frames` 必须小于或等于 `441`；
- `num_frames` 必须满足 `8n + 1`；
- `frame_rate` 支持范围为 `1–60`。

### 常用时长参数


| 目标时长   | 推荐参数                            |
| ------ | ------------------------------- |
| 约 3 秒  | num_frames: 81, frame_rate: 24  |
| 约 5 秒  | num_frames: 121, frame_rate: 24 |
| 约 10 秒 | num_frames: 241, frame_rate: 24 |
| 约 18 秒 | num_frames: 441, frame_rate: 24 |


如果希望生成更长的视频，可以增加 `num_frames` 或降低 `frame_rate`。


如果希望画面更流畅，可以使用更高的 `frame_rate`，例如 `24` 或 `30`。但在相同 `num_frames` 下，`frame_rate` 越高，视频时长越短。


---


## 推荐参数


| 使用场景     | 推荐设置                                                      |
| -------- | --------------------------------------------------------- |
| 标准视频生成   | width: 1152, height: 768, num_frames: 121, frame_rate: 24 |
| 短视频社交内容  | num_frames: 81 或 121, frame_rate: 24                      |
| 更长视频     | 增加 num_frames 或降低 frame_rate                              |
| 更平滑运动    | 使用 frame_rate: 24 或 30                                    |
| 可复现结果    | 设置固定 seed                                                 |
| 关键帧过渡    | 使用 extra_body.mode: "keyframes"                           |
| 避免不需要的内容 | 使用 negative_prompt                                        |


---


## Prompt 最佳实践


### 文生视频 Prompt


文生视频任务建议描述主体、动作、环境、镜头运动、光照和视觉风格。


推荐结构：


```plain text
[主体] + [动作] + [场景] + [镜头运动] + [光照] + [风格]
```


示例：


```plain text
A young astronaut walking across a red desert planet, dust blowing in the wind, slow cinematic tracking shot, dramatic sunset lighting, realistic sci-fi style
```


---


### 图生视频 Prompt


图生视频任务建议描述哪些内容需要运动，同时说明哪些主体元素需要保持稳定。


示例：


```plain text
Animate the character with subtle breathing motion, hair moving gently in the wind, background lights flickering softly, while keeping the face and outfit consistent
```


---


### 多图视频 Prompt


多图视频任务建议描述输入图片之间的关系，以及画面如何过渡。


示例：


```plain text
Use the first image as the starting scene and the second image as the target scene. Create a smooth transformation with consistent lighting, natural motion, and cinematic pacing
```


---


### 关键帧动画 Prompt


关键帧动画任务建议清晰描述关键帧之间的过渡关系。


示例：


```plain text
Create a smooth transition from the first keyframe to the second keyframe, maintaining character identity, consistent camera angle, and natural motion between scenes
```


---


## 错误码


| 状态码 | 说明              |
| --- | --------------- |
| 400 | 请求无效，请检查请求参数    |
| 401 | 未授权，请检查 API Key |
| 404 | 任务或视频不存在        |
| 500 | 服务器错误           |
| 503 | 服务繁忙，请稍后重试      |


---


## 价格


| 类型             | 标准价格            | 当前价格        |
| -------------- | --------------- | ----------- |
| Video Duration | $0.005 / second | $0 / second |


---


## 注意事项

- 使用 `agnes-video-v2.0` 作为模型名称；
- 视频生成是异步任务；
- 需要先创建视频任务，再查询视频结果；
- 创建任务响应中会同时返回 `task_id` 和 `video_id`；
- 新接入建议使用 `video_id` 查询视频结果；
- 旧版 `task_id` 查询接口仍然支持；
- `video_url` 仅在 `status` 为 `completed` 时可用；
- `num_frames` 必须小于或等于 `441`；
- `num_frames` 必须满足 `8n + 1`，例如 `81`、`121`、`161`、`241` 或 `441`；
- 文生视频任务仅要求传入 `model` 和 `prompt`；
- 图生视频任务需要通过 `image` 提供图片 URL；
- 多图视频任务需要在 `extra_body.image` 中提供多个图片 URL；
- 关键帧动画需要设置 `extra_body.mode` 为 `keyframes`。



