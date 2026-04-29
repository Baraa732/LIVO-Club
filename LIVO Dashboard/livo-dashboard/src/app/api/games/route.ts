import { NextRequest } from 'next/server'
import { proxy } from '@/lib/proxy'

export const GET  = (req: NextRequest) => proxy(req, '/games', 'GET')
export const POST = async (req: NextRequest) => proxy(req, '/games', 'POST', await req.json())
