import { NextRequest } from 'next/server'
import { proxy } from '@/lib/proxy'

export const GET = (req: NextRequest) => proxy(req, '/rules', 'GET')
export const PUT = async (req: NextRequest) => proxy(req, '/rules', 'PUT', await req.json())
