export interface Subscription {
    id: number;
    name: string;
    price: number;
    nextBilling: Date;
    frequencyId?: number | null;
    paymentId?: number | null;
    typeId?: number | null;
    category?: string;
    active: boolean;
}

export interface SubscriptionCreation {
    name: string;
    price: number;
    nextBilling: Date;
    frequencyId?: number | null;
    paymentId?: number | null;
    typeId?: number | null;
    category?: string;
}