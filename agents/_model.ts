const DEFAULT_MODEL = "@makers/deepseek-v4-flash";

export function resolveModelName(env: Record<string, string | undefined>): string {
  return env.AI_GATEWAY_MODEL || DEFAULT_MODEL;
}

export function collectGatewayEnv(
  env: Record<string, string | undefined>,
): Record<string, string> {
  const result: Record<string, string> = {};
  if (env.AI_GATEWAY_BASE_URL) result.ANTHROPIC_BASE_URL = env.AI_GATEWAY_BASE_URL;
  if (env.AI_GATEWAY_API_KEY) result.ANTHROPIC_API_KEY = env.AI_GATEWAY_API_KEY;
  if (env.AI_GATEWAY_SMALL_MODEL || env.AI_GATEWAY_MODEL) {
    result.ANTHROPIC_SMALL_FAST_MODEL =
      env.AI_GATEWAY_SMALL_MODEL || env.AI_GATEWAY_MODEL || "";
  }
  if (env.ANTHROPIC_CUSTOM_HEADERS) {
    result.ANTHROPIC_CUSTOM_HEADERS = env.ANTHROPIC_CUSTOM_HEADERS;
  }
  return result;
}
