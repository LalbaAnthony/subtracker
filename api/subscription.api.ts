import { Subscription, SubscriptionCreation } from "@/types/subscription";
import { Pagination } from "@/types/pagination";

class SubscriptionApi {
    public get default(): SubscriptionCreation {
        return {
            name: "",
            price: 0,
            frequencyId: null,
            paymentId: null,
            typeId: null,
            nextBilling: new Date(),
            category: "",
        };
    }

    public async getAll(options: { search?: string; pagination: { page: number; limit: number } }): Promise<Subscription[]> {
        const params = new URLSearchParams();

        if (options.search) params.append("search", options.search);
        if (options.pagination?.page) params.append("page", String(options.pagination.page));
        if (options.pagination?.limit) params.append("limit", String(options.pagination.limit));

        const url = `/api/subscriptions?${params.toString()}`;

        const res = await fetch(url, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });

        const result = await res.json();
        return result?.data || [];
    }


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

export const subscriptionApi = new SubscriptionApi();