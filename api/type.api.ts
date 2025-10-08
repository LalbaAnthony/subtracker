import { Type } from "@/types/type";

class TypeApi {
    public async getAll(): Promise<Type[]> {
        const res = await fetch("/api/types");
        const result = await res.json();

        return result?.data || [];
    };
}

export const typeApi = new TypeApi();