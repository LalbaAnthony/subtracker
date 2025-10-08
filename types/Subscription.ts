export interface Subscription {
    id: number;
    name: string;
    price: number;
    nextBilling: Date;
    frequencyId?: number | null | undefined;
    paymentId?: number | null | undefined;
    typeId?: number | null | undefined;
    category?: string | null | undefined;
    active: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface SubscriptionCreation {
    name: string;
    price: number;
    nextBilling: Date;
    frequencyId?: number | null | undefined;
    paymentId?: number | null | undefined;
    typeId?: number | null | undefined;
    category?: string | null | undefined;
}