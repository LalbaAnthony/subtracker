export interface Subscription {
    id: number;
    name: string;
    price: number;
    frequency: string;
    payment: string;
    type: string;
    nextBilling: Date;
    category?: string;
    active: boolean;
}

export interface SubscriptionCreation {
    name: string;
    price: number;
    frequency: string;
    payment: string;
    type: string;
    nextBilling: Date;
    category?: string;
}