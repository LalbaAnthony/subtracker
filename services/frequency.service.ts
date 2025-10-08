import { Frequency } from '@/types/frequency';

// TODO: This could be fetched from a database in the future. But since these values are static, it's not necessary for now.
const frequencies: Frequency[] = [
    { id: 1, days: 7, name: "Hebdomadaire", class: "bg-orange-100 text-orange-800" },
    { id: 2, days: 31, name: "Mensuel", class: "bg-purple-100 text-purple-800" },
    { id: 3, days: 365, name: "Annuel", class: "bg-yellow-100 text-yellow-800" },
    { id: 4, days: 365 * 2, name: "Deux ans", class: "bg-green-100 text-green-800" },
];

class FrequencyService {
    public async getAll(): Promise<Frequency[]> {
        return frequencies;
    };

    public async getById(id: number): Promise<Frequency | undefined> {
        return frequencies.find(frequency => frequency.id === id);
    }
}

export const frequencyService = new FrequencyService();