import { NextRequest, NextResponse } from 'next/server'

export const BACKEND = process.env.BACKEND_URL || 'http://localhost:4000/api/v1'

export function forwardHeaders(req: NextRequest): HeadersInit {
  const auth = req.headers.get('authorization')
  const headers: HeadersInit = { 'Content-Type': 'application/json' }
  if (auth) (headers as Record<string, string>)['Authorization'] = auth
  return headers
}

export async function proxy(
  req: NextRequest,
  path: string,
  method: string,
  body?: unknown,
): Promise<NextResponse> {
  try {
    const res = await fetch(`${BACKEND}${path}`, {
      method,
      headers: forwardHeaders(req),
      ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
    })
    const data = await res.json().catch(() => ({}))
    return NextResponse.json(data, { status: res.status })
  } catch {
    return NextResponse.json({ message: 'Backend unavailable' }, { status: 503 })
  }
}
