import { NextResponse } from 'next/server';
import { Frequency } from '@/types/frequency';

export async function GET() {
    // TODO: This could be fetched from a database in the future. But since these values are static, it's not necessary for now.
    const frequencies: Record<string, Frequency> = {
        weekly: { name: "Hebdomadaire", class: "bg-orange-100 text-orange-800" },
        monthly: { name: "Mensuel", class: "bg-purple-100 text-purple-800" },
        yearly: { name: "Annuel", class: "bg-yellow-100 text-yellow-800" },
        biennial: { name: "Tout les deux ans", class: "bg-green-100 text-green-800" },
    };

    return NextResponse.json(frequencies, { status: 200 });
}