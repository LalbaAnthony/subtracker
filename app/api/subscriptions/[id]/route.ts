import { NextResponse } from 'next/server';
import { subscriptionService } from '@/services/subscription.service';
import { requireAuth } from '@/lib/auth-api';

export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    const user = await requireAuth();

    let subscription = null;

    try {
        const data = await request.json();
        subscription = await subscriptionService.update(parseInt(params.id), data, { userId: user.id });
    } catch (error) {
        return NextResponse.json({ error: 'Could not process the request: ' + error }, { status: 500 });
    }

    return NextResponse.json({ data: subscription }, { status: 200 });
}

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    const user = await requireAuth();

    try {
        await subscriptionService.delete(parseInt(params.id), { userId: user.id });
    } catch (error) {
        return NextResponse.json({ error: 'Could not process the request: ' + error }, { status: 500 });
    }

    return NextResponse.json({ data: null }, { status: 200 });
}