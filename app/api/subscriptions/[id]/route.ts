// app/api/subscriptions/[id]/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    const data = await request.json();
    const subscription = await prisma.subscription.update({
        where: { id: parseInt(params.id) },
        data
    });
    return NextResponse.json(subscription);
}

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    await prisma.subscription.delete({
        where: { id: parseInt(params.id) }
    });
    return NextResponse.json({ success: true });
}