export type color = `#${string}`;

export interface Type {
    name: string;
    color: color;
}
export interface Frequency {
    name: string;
    color: color;
}

export interface Subscription {
    id: number;
    name: string;
    price: number;
    frequency: string;
    type: string;
    nextBilling: Date;
    category?: string;
    active: boolean;
}

export interface SubscriptionCreation {
    name: string;
    price: number;
    frequency: string;
    type: string;
    nextBilling: Date;
    category?: string;
}