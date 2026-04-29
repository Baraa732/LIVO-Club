const BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1'

async function get<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    next: { revalidate: 60 }, // ISR: revalidate every 60s
  })
  if (!res.ok) throw new Error(`GET ${path} failed: ${res.status}`)
  const json = await res.json()
  // Unwrap NestJS ApiResponse envelope
  return (json?.data !== undefined ? json.data : json) as T
}

export const websiteApi = {
  hero:       () => get<Record<string, unknown>>('/hero'),
  about:      () => get<Record<string, unknown>>('/about'),
  events:     () => get<unknown[]>('/events'),
  games:      () => get<unknown[]>('/games'),
  teams:      () => get<unknown[]>('/teams'),
  champions:  () => get<unknown[]>('/champions'),
  gallery:    () => get<unknown[]>('/gallery'),
  rules:      () => get<unknown[]>('/rules'),
  cta:        () => get<Record<string, unknown>>('/cta'),
  tournament: () => get<Record<string, unknown>>('/tournament'),
}
