import { NextRequest } from 'next/server'
import { proxy } from '@/lib/proxy'

export const GET = (req: NextRequest) => proxy(req, '/about', 'GET')
export const PUT = async (req: NextRequest) => proxy(req, '/about', 'PUT', await req.json())
