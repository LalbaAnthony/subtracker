import { NextResponse } from 'next/server';
import { subscriptionService } from '@/services/subscription.service';

export async function GET(request: Request) {
    let status = 500;
    let subscriptions = [];

    try {
        subscriptions = await subscriptionService.getAll();
    } catch (error) {
        return NextResponse.json({ error: 'Could not process request' + error }, { status: 500 });
    }

    status = subscriptions.length > 0 ? 200 : 204;

    return NextResponse.json(subscriptions, { status });
}

export async function POST(request: Request) {
    let status = 500;
    let subscription = null;

    try {
        const data = await request.json();
        subscription = await subscriptionService.create(data);
        status = subscription ? 201 : 400;
    } catch (error) {
        return NextResponse.json({ error: 'Could not process request' + error }, { status: 500 });
    }

    return NextResponse.json(subscription, { status });
}