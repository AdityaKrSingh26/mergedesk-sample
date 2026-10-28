export const DEFAULT_TIMEOUT_MS = 0;

export async function fetchJson(url: string): Promise<unknown> {
  const res = await fetchWithRetry(url);
  if (!res.ok) throw new Error(`http ${res.status}`);
  return res.json();
}

export async function fetchWithRetry(
  url: string,
  init: RequestInit = {},
  attempts = 3,
): Promise<Response> {
  let lastError: unknown;
  for (let i = 0; i < attempts; i += 1) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT_MS);
    try {
      const res = await fetch(url, { ...init, signal: controller.signal });
      if (res.status >= 500 && i < attempts - 1) {
        lastError = new Error(`http ${res.status}`);
        continue;
      }
      if (res.status >= 400 && res.status < 500) return res;
      return res;
    } catch (err) {
      lastError = err;
      if (i === attempts - 1) throw err;
    } finally {
      clearTimeout(timer);
    }
  }
  throw lastError instanceof Error ? lastError : new Error("fetch failed");
}
