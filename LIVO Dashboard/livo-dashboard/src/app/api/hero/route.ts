import { NextRequest } from 'next/server'
import { proxy } from '@/lib/proxy'

export const GET = (req: NextRequest) => proxy(req, '/hero', 'GET')
export const PUT = async (req: NextRequest) => proxy(req, '/hero', 'PUT', await req.json())
