import { Type } from '@/types/type';

// TODO: This could be fetched from a database in the future. But since these values are static, it's not necessary for now.
const types: Type[] = [
    { id: 1, name: "Automatique", class: "bg-green-100 text-green-800" },
    { id: 2, name: "Manuel", class: "bg-amber-100 text-amber-800" },
];

class TypeService {
    public async getAll(): Promise<Type[]> {
        return types;
    };

    public async getById(id: number): Promise<Type | undefined> {
        return types.find(type => type.id === id);
    }
}

export const typeService = new TypeService();