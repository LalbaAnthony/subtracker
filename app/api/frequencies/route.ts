import { NextResponse } from 'next/server';
import { frequencyService } from '@/services/frequency.service';

export async function GET() {
    const frequencies = await frequencyService.getAll();
    return NextResponse.json({ data: frequencies }, { status: 200 });
}