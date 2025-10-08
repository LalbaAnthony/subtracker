import { NextResponse } from 'next/server';
import { paymentService } from '@/services/payment.service';

export async function GET() {
    const payments = await paymentService.getAll();
    return NextResponse.json(payments, { status: 200 });
}