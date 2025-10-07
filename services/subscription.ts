import { Subscription, SubscriptionCreation } from "@/types/Subscription";

class SubscriptionService {
    public default(): SubscriptionCreation {
        return {
            name: "",
            price: 0,
            frequency: "monthly",
            payment: "card",
            type: "auto",
            nextBilling: new Date(),
            category: "",
        };
    }

    public async getAll(): Promise<Subscription[]> {
        const res = await fetch("/api/subscriptions");
        const data = await res.json();

        return data;
    };

    public async delete(id: number): Promise<void> {
        await fetch(`/api/subscriptions/${id}`, { method: "DELETE" });
    };

    public async create(subscription: SubscriptionCreation): Promise<Subscription> {
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
    };
}

export const subscriptionService = new SubscriptionService();