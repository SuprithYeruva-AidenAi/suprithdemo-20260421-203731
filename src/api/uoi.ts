// src/api/uoi.ts
// Typed UOI data client. The BFF at /api/uoi/data/* injects the service
// bearer server-side, so this module does NOT handle tokens or auth — it
// only POSTs JSON and surfaces typed errors the UI can render.
//
// USE THIS for every dashboard call. Do NOT use raw fetch for UOI data.

// Sandpack-safe base URL resolution. NEVER use import.meta.env here —
// Sandpack is not Vite and `import.meta` throws at module load.
//
// Resolution order (first match wins):
//   1. window.__UOI_API_BASE__              runtime host-page override
//   2. ?api=<url> URL query param           testing helper — also written
//      to localStorage so a single visit with the param pins the base for
//      later loads. Set `?api=` (empty) to clear. Primary use case: view
//      the Jenkins-deployed app from your laptop and point it at
//      http://localhost:8080 (your local :8080 → :5000 proxy) so you can
//      demo end-to-end before pushing the backend to the public server.
//   3. localStorage["__uoi_api_base"]       persisted from a prior ?api=
//   4. http://localhost:5000                hostname is localhost — your
//      laptop's dev backend talks to the real UOI sandbox, so `npm run
//      preview` Just Works with no cert/CORS dance.
//   5. https://agent.mck.aidendigital.com   default — shared public BFF
//      behind TLS. Sandpack + Jenkins-deployed React both hit this, so
//      Network tab shows real UOI traffic in every environment.
const UOI_BASE_STORAGE_KEY = "__uoi_api_base";
function _resolveUoiBase(): string {
  if (typeof window === "undefined") return "https://agent.mck.aidendigital.com";
  const w = window as any;
  if (w.__UOI_API_BASE__) return w.__UOI_API_BASE__ as string;

  try {
    const q = new URLSearchParams(window.location.search || "");
    if (q.has("api")) {
      const val = (q.get("api") || "").trim().replace(/\/$/, "");
      if (val) {
        try { window.localStorage.setItem(UOI_BASE_STORAGE_KEY, val); } catch { /* private mode */ }
        return val;
      }
      // `?api=` with no value clears the persisted override.
      try { window.localStorage.removeItem(UOI_BASE_STORAGE_KEY); } catch { /* ignore */ }
    }
    const stored = window.localStorage.getItem(UOI_BASE_STORAGE_KEY);
    if (stored) return stored;
  } catch { /* localStorage may throw in sandboxed iframes */ }

  const host = window.location.hostname || "";
  if (host === "localhost" || host === "127.0.0.1" || host === "0.0.0.0") {
    return "http://localhost:5000";
  }
  return "https://agent.mck.aidendigital.com";
}
const API_BASE: string = _resolveUoiBase();

export class UOIUpstreamError extends Error {
  status: number;
  code: string;
  constructor(status: number, code: string, msg: string) {
    super(msg);
    this.name = "UOIUpstreamError";
    this.status = status;
    this.code = code;
  }
}

export class UOITimeoutError extends Error {
  constructor(msg = "The service timed out. Please try again.") {
    super(msg);
    this.name = "UOITimeoutError";
  }
}

export class UOIUnavailableError extends Error {
  constructor(msg = "The service is temporarily unavailable.") {
    super(msg);
    this.name = "UOIUnavailableError";
  }
}

async function postJson<T>(path: string, body: unknown, signal?: AbortSignal): Promise<T> {
  let res: Response;
  try {
    res = await fetch(`${API_BASE}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify(body ?? {}),
      credentials: "omit",
      signal,
    });
  } catch (e: any) {
    if (e?.name === "AbortError") throw e;
    throw new UOIUnavailableError("Could not reach the service. Check your connection.");
  }
  const text = await res.text();
  let data: any = null;
  try { data = text ? JSON.parse(text) : null; } catch { /* non-JSON upstream */ }

  if (res.ok) return (data ?? {}) as T;

  const detail = data?.detail ?? data ?? {};
  const code: string = detail.error_code ?? "upstream_error";
  const msg: string = detail.error ?? `Request failed (${res.status})`;

  if (res.status === 504 || code === "upstream_timeout") throw new UOITimeoutError(msg);
  if (res.status === 503 || code === "circuit_open") throw new UOIUnavailableError(msg);
  throw new UOIUpstreamError(res.status, code, msg);
}

async function getJson<T>(path: string, signal?: AbortSignal): Promise<T> {
  let res: Response;
  try {
    res = await fetch(`${API_BASE}${path}`, {
      method: "GET",
      headers: { "Accept": "application/json" },
      credentials: "omit",
      signal,
    });
  } catch (e: any) {
    if (e?.name === "AbortError") throw e;
    throw new UOIUnavailableError("Could not reach the service. Check your connection.");
  }
  const text = await res.text();
  let data: any = null;
  try { data = text ? JSON.parse(text) : null; } catch { /* non-JSON upstream */ }
  if (res.ok) return (data ?? {}) as T;
  const detail = data?.detail ?? data ?? {};
  const code: string = detail.error_code ?? "upstream_error";
  const msg: string = detail.error ?? `Request failed (${res.status})`;
  if (res.status === 504 || code === "upstream_timeout") throw new UOITimeoutError(msg);
  if (res.status === 503 || code === "circuit_open") throw new UOIUnavailableError(msg);
  throw new UOIUpstreamError(res.status, code, msg);
}

// ── Dashboard summary ─────────────────────────────────────────────────────
// Fan-out over the four product codes (TR01/HM01/MO01/DH01) handled server-side.
export interface ProductSummary {
  product_code: string;
  product_name: string;
  total: number;
  items: Array<Record<string, unknown>>;
  error: string | null;
}
export interface DashboardSummary {
  products: ProductSummary[];
  generated_at: number;
  trace_id: string;
}
export function fetchDashboardSummary(signal?: AbortSignal): Promise<DashboardSummary> {
  return getJson<DashboardSummary>("/api/uoi/data/dashboard/summary", signal);
}

// ── Named data endpoints ──────────────────────────────────────────────────
export interface QueryProposalBody {
  productCode?: string;
  pageSize?: number;
  pageNum?: number;
  [k: string]: unknown;
}
export function queryProposal<T = Record<string, unknown>>(
  body: QueryProposalBody, signal?: AbortSignal,
): Promise<T> {
  return postJson<T>("/api/uoi/data/queryProposal", body, signal);
}

export function loadQuote<T = Record<string, unknown>>(
  body: Record<string, unknown>, signal?: AbortSignal,
): Promise<T> {
  return postJson<T>("/api/uoi/data/loadQuote", body, signal);
}

export function fetchOrderData<T = Record<string, unknown>>(
  body: Record<string, unknown>, signal?: AbortSignal,
): Promise<T> {
  return postJson<T>("/api/uoi/data/fetchOrderData", body, signal);
}

export function fetchMasterData<T = Record<string, unknown>>(
  body: Record<string, unknown>, signal?: AbortSignal,
): Promise<T> {
  return postJson<T>("/api/uoi/data/fetchMasterData", body, signal);
}

export function printDocument<T = Record<string, unknown>>(
  body: Record<string, unknown>, signal?: AbortSignal,
): Promise<T> {
  return postJson<T>("/api/uoi/data/printDocument", body, signal);
}

// Escape hatch — prefer named endpoints above.
export function uoiPassthrough<T = Record<string, unknown>>(
  upstreamPath: string, body: Record<string, unknown>, signal?: AbortSignal,
): Promise<T> {
  const clean = upstreamPath.replace(/^\/+/, "");
  return postJson<T>(`/api/uoi/data/passthrough/${clean}`, body, signal);
}
