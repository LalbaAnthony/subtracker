import { Dashboard } from "@/types/dashboard";
import { get } from "@/utils/api";

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
        const result = await get<Dashboard>("/dashboard");
        return result.data.data as Dashboard;
    };
}

export const dashboardApi = new DashboardApi();