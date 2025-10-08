import { NextResponse } from 'next/server';
import { dashboardService } from '@/services/dashboard.service';

export async function GET() {
    const dashboard = await dashboardService.get();
    return NextResponse.json({ data: dashboard });
}