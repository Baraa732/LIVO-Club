import { NextRequest } from 'next/server'
import { proxy } from '@/lib/proxy'

type Ctx = { params: Promise<{ rank: string }> }

export const PUT = async (req: NextRequest, { params }: Ctx) => {
  const { rank } = await params
  return proxy(req, `/teams/${rank}`, 'PUT', await req.json())
}
export const DELETE = async (req: NextRequest, { params }: Ctx) => {
  const { rank } = await params
  return proxy(req, `/teams/${rank}`, 'DELETE')
}
