import { NextResponse } from 'next/server';
import { subscriptionService } from '@/services/subscription.service';
import { paginate } from '@/utils/pagination';
import { requireAuth } from "@/lib/auth-api";

export async function GET(
    request: Request,
) {
    const { searchParams } = new URL(request.url);
    const params = Object.fromEntries(searchParams.entries());

    const page = Number(params?.page) || 1
    const limit = Number(params?.limit) || 10
    const search = String(params?.search || '')

    const user = await requireAuth();

    let subscriptions = [];

    try {
        const options = { userId: user.id, search };
        const count = await subscriptionService.count(options)
        const pagination = paginate(page, limit, count)
        subscriptions = await subscriptionService.getAll({ pagination, ...options });
    } catch (error) {
        return NextResponse.json({ error: 'Could not process the request: ' + error }, { status: 500 });
    }

    return NextResponse.json({ data: subscriptions }, { status: 200 });
}

export async function POST(request: Request) {
    const user = await requireAuth();

    let subscription = null;

    try {
        const data = await request.json();
        subscription = await subscriptionService.create(data, { userId: user.id });
    } catch (error) {
        return NextResponse.json({ error: 'Could not process the request: ' + error }, { status: 500 });
    }

    return NextResponse.json({ data: subscription }, { status: 200 });
}