import { Frequency } from "@/types/frequency";

class FrequencyApi {
    public async getAll(): Promise<Frequency[]> {
        const res = await fetch("/api/frequencies");
        const result = await res.json();

        return result?.data || [];
    };
}

export const frequencyApi = new FrequencyApi();