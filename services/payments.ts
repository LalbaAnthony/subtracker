import { Payment } from "@/types/Payment";

export const payments: Record<string, Payment> = {
    card: { name: "Carte Bancaire", class: "bg-blue-100 text-blue-800" },
    paypal: { name: "PayPal", class: "bg-yellow-100 text-yellow-800" },
};