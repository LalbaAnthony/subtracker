export interface Subscription {
    id: number;
    name: string;
    price: number;
    userId: string;
    nextBilling: Date;
    frequencyId?: number | null | undefined;
    paymentId?: number | null | undefined;
    typeId?: number | null | undefined;
    category?: string | null;
    active: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface SubscriptionCreation extends Record<string, unknown> {
    name: string;
    price: number;
    nextBilling: Date;
    frequencyId?: number | null | undefined;
    paymentId?: number | null | undefined;
    typeId?: number | null | undefined;
    category?: string | null;
}