import { NextRequest } from 'next/server'
import { proxy } from '@/lib/proxy'

export const GET = (req: NextRequest) => proxy(req, '/cta', 'GET')
export const PUT = async (req: NextRequest) => proxy(req, '/cta', 'PUT', await req.json())
