import { NextRequest } from 'next/server'
import { proxy } from '@/lib/proxy'

export const GET  = (req: NextRequest) => proxy(req, '/champions', 'GET')
export const POST = async (req: NextRequest) => proxy(req, '/champions', 'POST', await req.json())
