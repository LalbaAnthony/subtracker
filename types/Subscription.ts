export interface Subscription {
    id: number;
    name: string;
    price: number;
    frequency: string;
    type: string;
    nextBilling: string;
    category?: string;
    active: boolean;
}