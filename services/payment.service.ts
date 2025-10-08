import { Payment } from '@/types/payment';

// TODO: This could be fetched from a database in the future. But since these values are static, it's not necessary for now.
const payments: Payment[] = [
    { id: 1, name: "Carte Bancaire", class: "bg-yellow-100 text-yellow-800" },
    { id: 2, name: "PayPal", class: "bg-blue-100 text-blue-800" },
    { id: 3, name: "Virement Bancaire", class: "bg-purple-100 text-purple-800" },
];

class PaymentService {
    public async getAll(): Promise<Payment[]> {
        return payments;
    };

    public async getById(id: number): Promise<Payment | undefined> {
        return payments.find(payment => payment.id === id);
    }
}

export const paymentService = new PaymentService();