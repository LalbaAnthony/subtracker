// app/api/subscriptions/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    const subscriptions = await prisma.subscription.findMany({
        orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(subscriptions);
}

export async function POST(request: Request) {
    const data = await request.json();
    const subscription = await prisma.subscription.create({ data });
    return NextResponse.json(subscription, { status: 201 });
}