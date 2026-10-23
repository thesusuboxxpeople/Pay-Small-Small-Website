/** Public API URL, exposed to the browser. Never pass secrets here. */
export function publicEndpoint(value: string | undefined, fallback?: string): string | undefined {
  const endpoint = (value ?? fallback)?.trim();
  if (!endpoint) return undefined;
  // Same-origin paths or HTTPS URLs only; reject protocol-relative paths and credentials.
  if (endpoint.startsWith("/") && !endpoint.startsWith("//") && !endpoint.includes("\\") && !/[\s#]/.test(endpoint)) return endpoint;
  try {
    const url = new URL(endpoint);
    if (url.protocol === "https:" && !url.username && !url.password && !url.hash && !/[\s\\]/.test(endpoint)) return endpoint;
  } catch { /* Fail the build rather than deploying a broken upload destination. */ }
  throw new Error("API endpoints must be same-origin paths or HTTPS URLs without embedded credentials.");
}
