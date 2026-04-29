import { NextRequest } from 'next/server'
import { proxy } from '@/lib/proxy'

type Ctx = { params: Promise<{ id: string }> }

export const PUT = async (req: NextRequest, { params }: Ctx) => {
  const { id } = await params
  return proxy(req, `/gallery/${id}`, 'PUT', await req.json())
}
export const DELETE = async (req: NextRequest, { params }: Ctx) => {
  const { id } = await params
  return proxy(req, `/gallery/${id}`, 'DELETE')
}
