import { Dashboard } from "@/types/dashboard";

class DashboardApi {
    public get default(): Dashboard {
        return {
            monthly: 0,
            yearly: 0,
            actives: 0,
            inactives: 0,
            nextBilling: null,
        };
    }

    public async get(): Promise<Dashboard> {
        const res = await fetch("/api/dashboard");
        const result = await res.json();

        return result?.data || {};
    };
}

export const dashboardApi = new DashboardApi();