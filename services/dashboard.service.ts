import { Dashboard } from "@/types/dashboard";
import { prisma } from '@/lib/prisma';
import { Subscription } from '@/types/subscription';
import { frequencyService } from "./frequency.service";

class DashboardService {
    private async computeMonthly(subscriptions: Subscription[]): Promise<number> {
        subscriptions = subscriptions
            .filter(s => s.active)
            .filter(s => s.price > 0);

        const frequencies = await frequencyService.getAll();

        let total = 0;

        for (const subscription of subscriptions) {
            if (!subscription.frequencyId) continue;

            const frequency = frequencies.find(f => f.id === subscription.frequencyId);
            if (!frequency) continue;

            const monthly = (subscription.price * 31) / frequency.days;
            total += monthly;
        }

        return total;
    }

    private computeYearly(monthly: number): number {
        return monthly * 12;
    }

    private async computeNextBilling(subscriptions: Subscription[]): Promise<Date | null> {
        subscriptions = subscriptions
            .filter(s => s.active)
            .filter(s => s.price > 0)
            .filter(s => s.nextBilling !== null);

        if (subscriptions.length === 0) return null;

        let next = subscriptions[0].nextBilling;

        for (const subscription of subscriptions) {
            if (subscription.nextBilling < next) {
                next = subscription.nextBilling;
            }
        }

        return next;
    }

    public async get(): Promise<Dashboard> {
        const dashboard: Dashboard = {
            monthly: 0,
            yearly: 0,
            actives: 0,
            inactives: 0,
            nextBilling: null,
        };

        const subscriptions = await prisma.subscription.findMany() as Subscription[];

        dashboard.actives = subscriptions.filter(s => s.active).length;
        dashboard.inactives = subscriptions.filter(s => !s.active).length;
        dashboard.monthly = await this.computeMonthly(subscriptions);
        dashboard.yearly = this.computeYearly(dashboard.monthly);
        dashboard.nextBilling = await this.computeNextBilling(subscriptions);

        dashboard.monthly = parseFloat(dashboard.monthly.toFixed(2));
        dashboard.yearly = parseFloat(dashboard.yearly.toFixed(2));

        return dashboard;
    }
}

export const dashboardService = new DashboardService();