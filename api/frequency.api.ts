import { Frequency } from "@/types/frequency";
import { get } from "@/utils/api";
class FrequencyApi {
    public async getAll(): Promise<Frequency[]> {
        const result = await get<Frequency[]>("/frequencies");
        return result.data.data as Frequency[];
    };
}

export const frequencyApi = new FrequencyApi();