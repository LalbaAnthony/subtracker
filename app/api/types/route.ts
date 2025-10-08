import { NextResponse } from 'next/server';
import { Type } from '@/types/type';

export async function GET() {
    // TODO: This could be fetched from a database in the future. But since these values are static, it's not necessary for now.
    const types: Record<string, Type> = {
        auto: { name: "Automatique", class: "bg-green-100 text-green-800" },
        manual: { name: "Manuel", class: "bg-amber-100 text-amber-800" },
    };

    return NextResponse.json(types, { status: 200 });
}