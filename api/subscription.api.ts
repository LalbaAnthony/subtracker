import { Subscription, SubscriptionCreation } from "@/types/subscription";
import { del, get, post } from "@/utils/api";

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
        const result = await get<Subscription[]>("/subscriptions", {
            search: options.search,
            paginattion: JSON.stringify(options.pagination)
        });
        return result.data.data as Subscription[];
    }

    public async delete(id: number): Promise<void> {
        await del(`/subscriptions/${id}`);
    };

    public async toggle(id: number): Promise<void> {
        await post(`/subscriptions/${id}/toggle`);
    }

    public async create(subscription: SubscriptionCreation): Promise<Subscription> {
        const result = await post<Subscription>("/subscriptions", subscription);
        return result.data.data as Subscription;
    };
}

export const subscriptionApi = new SubscriptionApi();