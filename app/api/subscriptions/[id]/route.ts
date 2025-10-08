import { NextResponse } from 'next/server';
import { subscriptionService } from '@/services/subscription.service';

export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    let status = 500;
    let subscription = null;

    try {
        const data = await request.json();
        subscription = await subscriptionService.update(parseInt(params.id), data);
        status = subscription ? 200 : 400;
    } catch (error) {
        return NextResponse.json({ error: 'Could not process request' + error }, { status: 500 });
    }

    return NextResponse.json(subscription, { status });
}

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    let status = 500;

    try {
        await subscriptionService.delete(parseInt(params.id));
        status = 200;
    } catch (error) {
        return NextResponse.json({ error: 'Could not process request' + error }, { status: 500 });
    }

    return NextResponse.json(null, { status });
}