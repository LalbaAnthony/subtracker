import { Type } from "@/types/type";

class TypeApi {
    public async getAll(): Promise<Type[]> {
        const res = await fetch("/api/types");
        const data = await res.json();

        return data;
    };
}

export const typeApi = new TypeApi();