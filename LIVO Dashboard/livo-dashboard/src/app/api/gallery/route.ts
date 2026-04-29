import { NextRequest } from 'next/server'
import { proxy } from '@/lib/proxy'

export const GET  = (req: NextRequest) => proxy(req, '/gallery', 'GET')
export const POST = async (req: NextRequest) => proxy(req, '/gallery', 'POST', await req.json())
