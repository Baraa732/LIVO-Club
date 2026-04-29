import { NextRequest } from 'next/server'
import { proxy } from '@/lib/proxy'

export const GET = (req: NextRequest) => proxy(req, '/tournament', 'GET')
export const PUT = async (req: NextRequest) => proxy(req, '/tournament', 'PUT', await req.json())
