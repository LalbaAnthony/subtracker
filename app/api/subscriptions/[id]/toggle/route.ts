import { NextResponse } from 'next/server';
import { subscriptionService } from '@/services/subscription.service';

export async function POST(
    request: Request,
    { params }: { params: { id: string } }
) {

    try {
        await subscriptionService.toggle(parseInt(params.id));
    } catch (error) {
        return NextResponse.json({ error: 'Could not process the request: ' + error }, { status: 500 });
    }

    return NextResponse.json({ data: null }, { status: 200 });
}