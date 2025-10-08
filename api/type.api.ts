import { Type } from "@/types/type";
import { get } from "@/utils/api";
class TypeApi {
    public async getAll(): Promise<Type[]> {
        const result = await get<Type[]>("/dashboard");
        return result.data.data as Type[];
    };
}

export const typeApi = new TypeApi();