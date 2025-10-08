import { prisma } from '@/lib/prisma';
import { Pagination } from '@/types/pagination';
import { Subscription, SubscriptionCreation } from '@/types/subscription';

class SubscriptionService {
    public async count(options: { search?: string }): Promise<number> {
        const { search } = options;

        const count = await prisma.subscription.count({
            where: {
                name: search ? { contains: search } : undefined,
            },
        });

        return count;
    }

    public async getAll(options: { search?: string; pagination: Pagination }): Promise<Subscription[]> {
        const { search, pagination } = options;
        const { offset, limit } = pagination

        const subscriptions = await prisma.subscription.findMany({
            where: {
                name: search ? { contains: search } : undefined,
            },
            skip: offset,
            take: limit,
            orderBy: [{ typeId: 'asc', }, { frequencyId: 'asc', }, { paymentId: 'asc', }, { nextBilling: 'asc', }],
        });

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
            } as SubscriptionCreation,
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

    public async toggle(id: number): Promise<void> {
        const subscription = await prisma.subscription.findUnique({ where: { id } });
        if (!subscription) throw new Error('Subscription not found');

        await prisma.subscription.update({
            where: { id },
            data: { active: !subscription.active, updatedAt: new Date() },
        });
    }
}

export const subscriptionService = new SubscriptionService();