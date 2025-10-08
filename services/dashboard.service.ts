import { Dashboard } from "@/types/dashboard";
import { prisma } from '@/lib/prisma';
import { Subscription } from '@/types/subscription';

class DashboardService {
    public async compute(): Promise<Dashboard> {
        const dashboard: Dashboard = {
            monthly: 0,
            yearly: 0,
            actives: 0,
            inactives: 0
        };

        const subscriptions = await prisma.subscription.findMany() as Subscription[];

        dashboard.actives = subscriptions.filter(s => s.active).length;
        dashboard.inactives = subscriptions.filter(s => !s.active).length;
        dashboard.monthly = subscriptions
            .filter(s => s.active)
            .reduce((acc, s) => {
                const monthly =
                    s.frequency === 'biennial' ? s.price / 24 :
                        s.frequency === 'yearly' ? s.price / 12 :
                            s.frequency === 'monthly' ? s.price :
                                s.frequency === 'weekly' ? s.price * 4.33 :
                                    s.price;
                return acc + monthly;
            }, 0);
        dashboard.yearly = dashboard.monthly * 12;

        dashboard.monthly = parseFloat(dashboard.monthly.toFixed(2));
        dashboard.yearly = parseFloat(dashboard.yearly.toFixed(2));

        return dashboard;
    }
}

export const dashboardService = new DashboardService();