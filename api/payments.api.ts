import { Payment } from "@/types/payment";
import { get } from "@/utils/api";
class PaymentApi {
    public async getAll(): Promise<Payment[]> {
        const result = await get<Payment[]>("/frequencies");
        return result.data.data as Payment[];
    };
}

export const paymentApi = new PaymentApi();