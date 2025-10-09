import { NextResponse } from 'next/server';
import { subscriptionService } from '@/services/subscription.service';
import { requireAuth } from '@/lib/auth-api';

export async function POST(
    request: Request,
    { params }: { params: { id: string } }
) {
    const user = await requireAuth();

    try {
        await subscriptionService.toggle(parseInt(params.id), { userId: user.id });
    } catch (error) {
        return NextResponse.json({ error: 'Could not process the request: ' + error }, { status: 500 });
    }

    return NextResponse.json({ data: null }, { status: 200 });
}