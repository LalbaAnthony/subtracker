import { NextResponse } from 'next/server';
import { Payment } from '@/types/payment';

export async function GET() {
    // TODO: This could be fetched from a database in the future. But since these values are static, it's not necessary for now.
    const payments: Record<string, Payment> = {
        card: { name: "Carte Bancaire", class: "bg-yellow-100 text-yellow-800" },
        paypal: { name: "PayPal", class: "bg-blue-100 text-blue-800" },
        transfer: { name: "Virement Bancaire", class: "bg-purple-100 text-purple-800" },
    };

    return NextResponse.json(payments, { status: 200 });
}