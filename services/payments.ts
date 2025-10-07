import { Payment } from "@/types/payment";

export const payments: Record<string, Payment> = {
    card: { name: "Carte Bancaire", class: "bg-yellow-100 text-yellow-800" },
    paypal: { name: "PayPal", class: "bg-blue-100 text-blue-800" },
    transfer: { name: "Virement Bancaire", class: "bg-purple-100 text-purple-800" },
};