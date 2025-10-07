import { Subscription, SubscriptionCreation, Frequency, Type } from "@/types/Subscription";

export const defaultSubscription: SubscriptionCreation = {
    name: "",
    price: 0,
    frequency: "monthly",
    type: "auto",
    nextBilling: new Date(),
    category: "",
};

export const frequencies: Record<string, Frequency> = {
    daily: { name: "Quotidien", color: "#10b981" },
    weekly: { name: "Hebdomadaire", color: "#3b82f6" },
    monthly: { name: "Mensuel", color: "#8b5cf6" },
    yearly: { name: "Annuel", color: "#f59e0b" },
    biennial: { name: "Tout les deux ans", color: "#ef4444" },
};

export const types: Record<string, Type> = {
    auto: { name: "Automatique", color: "#8b5cf6" },
    manual: { name: "Manuel", color: "#ec4899" },
};

export async function fetchSubscriptions(): Promise<Subscription[]> {
    const res = await fetch("/api/subscriptions");
    const data = await res.json();

    return data;
};

export async function deleteSubscription(id: number): Promise<void> {
    await fetch(`/api/subscriptions/${id}`, { method: "DELETE" });
};

export async function createSubscription(subscription: SubscriptionCreation): Promise<Subscription> {
    const res = await fetch("/api/subscriptions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            ...subscription,
            active: true,
        } as Subscription),
    });
    const data = await res.json();

    return data;
}
