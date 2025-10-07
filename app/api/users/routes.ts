import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
    return NextResponse.json({})
}

export async function POST(req: Request) {
    return NextResponse.json({})
}
