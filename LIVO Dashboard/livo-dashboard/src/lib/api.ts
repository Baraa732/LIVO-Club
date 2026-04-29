// ─── Backend Base URL ─────────────────────────────────────────────────────────
const BACKEND = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1'

// ─── Token Storage ────────────────────────────────────────────────────────────
const getToken = () =>
  typeof window !== 'undefined' ? localStorage.getItem('livo_token') : null

export const saveToken = (token: string) =>
  typeof window !== 'undefined' && localStorage.setItem('livo_token', token)

export const clearToken = () =>
  typeof window !== 'undefined' && localStorage.removeItem('livo_token')

// ─── HTTP Helpers ─────────────────────────────────────────────────────────────
function authHeaders(): HeadersInit {
  const token = getToken()
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  }
}

async function request<T>(method: string, path: string, body?: unknown): Promise<T> {
  const res = await fetch(`${BACKEND}${path}`, {
    method,
    headers: authHeaders(),
    cache: 'no-store',
    ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
  })

  if (res.status === 401) {
    clearToken()
    if (typeof window !== 'undefined') window.location.href = '/login'
    throw new Error('Unauthorized')
  }

  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: `${method} ${path} failed` }))
    throw new Error(err.message || `${method} ${path} failed`)
  }

  const json = await res.json()
  // Unwrap ApiResponse envelope { success, data, ... }
  return (json?.data !== undefined ? json.data : json) as T
}

const get  = <T>(path: string)                  => request<T>('GET',    path)
const put  = <T>(path: string, body: unknown)   => request<T>('PUT',    path, body)
const post = <T>(path: string, body: unknown)   => request<T>('POST',   path, body)
const del  = <T>(path: string, body?: unknown)  => request<T>('DELETE', path, body)

// ─── Auth ─────────────────────────────────────────────────────────────────────
export const authApi = {
  login: (email: string, password: string) =>
    request<{ access_token: string }>('POST', '/auth/login', { email, password }),
  me: () => get('/auth/me'),
}

// ─── Domain API ───────────────────────────────────────────────────────────────
export const api = {
  hero:       { get: () => get('/hero'),       save: (d: unknown) => put('/hero', d) },
  about:      { get: () => get('/about'),      save: (d: unknown) => put('/about', d) },
  events: {
    get:    ()                              => get('/events'),
    add:    (d: unknown)                    => post('/events', d),
    update: (id: string, data: unknown)     => put(`/events/${id}`, data),
    remove: (id: string)                    => del(`/events/${id}`),
  },
  games: {
    get:    ()                              => get('/games'),
    add:    (d: unknown)                    => post('/games', d),
    update: (id: string, data: unknown)     => put(`/games/${id}`, data),
    remove: (id: string)                    => del(`/games/${id}`),
  },
  teams: {
    get:    ()                              => get('/teams'),
    add:    (d: unknown)                    => post('/teams', d),
    update: (rank: number, data: unknown)   => put(`/teams/${rank}`, data),
    remove: (rank: number)                  => del(`/teams/${rank}`),
  },
  champions: {
    get:    ()                              => get('/champions'),
    add:    (d: unknown)                    => post('/champions', d),
    update: (id: string, data: unknown)     => put(`/champions/${id}`, data),
    remove: (id: string)                    => del(`/champions/${id}`),
  },
  gallery: {
    get:    ()                              => get('/gallery'),
    add:    (d: unknown)                    => post('/gallery', d),
    update: (id: number, data: unknown)     => put(`/gallery/${id}`, data),
    remove: (id: number)                    => del(`/gallery/${id}`),
  },
  rules:      { get: () => get('/rules'),      save: (d: unknown) => put('/rules', d) },
  cta:        { get: () => get('/cta'),        save: (d: unknown) => put('/cta', d) },
  tournament: { get: () => get('/tournament'), save: (d: unknown) => put('/tournament', d) },
}
