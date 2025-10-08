import { Dashboard } from "@/types/dashboard";

class DashboardService {
    public get default(): Dashboard {
        return {
            monthly: 0,
            yearly: 0,
            actives: 0,
            inactives: 0
        };
    }

    public async get(): Promise<Dashboard> {
        const res = await fetch("/api/dashboard");
        const data = await res.json();

        return data;
    };
}

export const dashboardService = new DashboardService();