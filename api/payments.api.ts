import { Payment } from "@/types/payment";

class PaymentApi {
    public async getAll(): Promise<Payment[]> {
        const res = await fetch("/api/payments");
        const result = await res.json();

        return result?.data || [];
    };
}

export const paymentApi = new PaymentApi();