import { NextResponse } from 'next/server';
import { typeService } from '@/services/type.service';

export async function GET() {
    const types = await typeService.getAll();
    return NextResponse.json({ data: types }, { status: 200 });
}