import { NextRequest } from 'next/server'
import { proxy } from '@/lib/proxy'

export const GET  = (req: NextRequest) => proxy(req, '/events', 'GET')
export const POST = async (req: NextRequest) => proxy(req, '/events', 'POST', await req.json())
