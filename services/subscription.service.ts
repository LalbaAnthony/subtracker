import { prisma } from '@/lib/prisma';
import { Subscription, SubscriptionCreation } from '@/types/subscription';

class SubscriptionService {
    public async getAll(): Promise<Subscription[]> {
        const subscriptions = await prisma.subscription.findMany({
            orderBy: { createdAt: 'desc' }
        }) as Subscription[];
        return subscriptions;
    };

    public async delete(id: number): Promise<void> {
        await prisma.subscription.delete({ where: { id } });
    };

    public async create(subscription: SubscriptionCreation): Promise<Subscription> {
        const newSubscription = await prisma.subscription.create({
            data: {
                ...subscription,
                active: true,
            } as Subscription,
        });

        return newSubscription;
    };

    public async update(id: number, subscription: Partial<Subscription>): Promise<Subscription> {
        const updatedSubscription = await prisma.subscription.update({
            where: { id },
            data: {
                ...subscription,
                updatedAt: new Date(),
            }
        });

        return updatedSubscription;
    };
}

export const subscriptionService = new SubscriptionService();