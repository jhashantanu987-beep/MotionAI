/**
 * KLARA CRM — Backend Client
 * All Next.js API routes proxy to the Express backend via this helper.
 * The Express server must be running at http://localhost:5000
 */

export const BACKEND_URL = process.env.CRM_BACKEND_URL || 'https://klara-ai-backend.onrender.com'

/**
 * A reusable fetch wrapper that forwards a Next.js request to the Express backend.
 * Preserves method, headers, and body.
 */
export async function proxyFetch(
  path: string,
  options: RequestInit = {}
): Promise<Response> {
  const url = `${BACKEND_URL}${path}`
  const res = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    // Always get fresh data — no caching for CRM data
    cache: 'no-store',
  })
  return res
}

/** Unwrap a JSON response and forward errors cleanly */
export async function proxyJson<T = unknown>(
  path: string,
  options: RequestInit = {}
): Promise<{ data: T | null; status: number; ok: boolean }> {
  try {
    const res = await proxyFetch(path, options)
    const data = await res.json()
    return { data, status: res.status, ok: res.ok }
  } catch (err) {
    console.error(`[BackendClient] Failed to reach Express backend at ${path}:`, err)
    return { data: null, status: 503, ok: false }
  }
}
