import { Payment } from "@/types/payment";

class PaymentApi {
    public async getAll(): Promise<Payment[]> {
        const res = await fetch("/api/payments");
        const data = await res.json();

        return data;
    };
}

export const paymentApi = new PaymentApi();