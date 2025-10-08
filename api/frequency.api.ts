import { Frequency} from "@/types/frequency";

export const frequencies: Record<string, Frequency> = {
    weekly: { name: "Hebdomadaire", class: "bg-orange-100 text-orange-800" },
    monthly: { name: "Mensuel", class: "bg-purple-100 text-purple-800" },
    yearly: { name: "Annuel", class: "bg-yellow-100 text-yellow-800" },
    biennial: { name: "Tout les deux ans", class: "bg-green-100 text-green-800" },
};