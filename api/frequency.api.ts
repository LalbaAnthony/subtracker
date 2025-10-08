import { Frequency } from "@/types/frequency";

class FrequencyApi {
    public async getAll(): Promise<Frequency[]> {
        const res = await fetch("/api/frequencies");
        const data = await res.json();

        return data;
    };
}

export const frequencyApi = new FrequencyApi();