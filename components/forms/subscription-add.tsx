import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Undo2, Plus } from "lucide-react";
import { subscriptionApi } from "@/api/subscription.api";
import { Payment } from "@/types/payment";
import { Frequency } from "@/types/frequency";
import { Type } from "@/types/type";
import { Skeleton } from "../ui/skeleton";

interface Props {
  types: Type[];
  frequencies: Frequency[];
  payments: Payment[];
  loading?: boolean;
  asksRefresh?: () => void;
}

export default function SubscriptionAddForm({
  types,
  frequencies,
  payments,
  loading = true,
  asksRefresh,
}: Props) {
  const [form, setForm] = useState(subscriptionApi.default);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await subscriptionApi.create(form);
    setForm(subscriptionApi.default);
    if (asksRefresh) asksRefresh();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name" className="mb-2">
          Nom
        </Label>
        <Input
          id="name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Netflix, Spotify, Unity, ..."
          required
        />
      </div>

      <div className="flex gap-x-4">
        <div>
          <Label htmlFor="price" className="mb-2">
            Prix
          </Label>
          <Input
            id="price"
            type="number"
            step="0.01"
            value={form.price}
            onChange={(e) =>
              setForm({ ...form, price: parseInt(e.target.value) })
            }
            placeholder="9.99"
            required
          />
        </div>
        <div className="flex-1">
          <Label htmlFor="frequency" className="mb-2">
            Fréquence
          </Label>

          {loading ? (
            <Skeleton className="h-9 w-[75px] rounded-md" />
          ) : (
            <Select
              value={form.frequencyId?.toString() || ""}
              onValueChange={(v) =>
                setForm({ ...form, frequencyId: parseInt(v) })
              }
            >
              <SelectTrigger id="frequency" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {frequencies.map((freq) => (
                  <SelectItem key={freq.id} value={freq.id?.toString() || ""}>
                    {freq.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>
      </div>

      <div className="flex-1">
        <Label htmlFor="payment" className="mb-2">
          Paiement
        </Label>
        {loading ? (
          <Skeleton className="h-9 w-[75px] rounded-md" />
        ) : (
          <Select
            value={form.paymentId?.toString() || ""}
            onValueChange={(v) => setForm({ ...form, paymentId: parseInt(v) })}
          >
            <SelectTrigger id="payment" className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {payments.map((pay) => (
                <SelectItem key={pay.id} value={pay.id?.toString() || ""}>
                  {pay.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>

      <div className="flex gap-x-4">
        <div className="flex-1">
          <Label htmlFor="type" className="mb-2">
            Type
          </Label>
          {loading ? (
            <Skeleton className="h-9 w-[75px] rounded-md" />
          ) : (
            <Select
              value={form.typeId?.toString() || ""}
              onValueChange={(v) => setForm({ ...form, typeId: parseInt(v) })}
            >
              <SelectTrigger id="type" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {types.map((type) => (
                  <SelectItem key={type.id} value={type.id?.toString() || ""}>
                    {type.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>
        <div>
          <Label htmlFor="nextBilling" className="mb-2">
            Prochain paiement
          </Label>
          <Input
            id="nextBilling"
            type="date"
            value={form.nextBilling.toISOString().split("T")[0]}
            onChange={(e) =>
              setForm({ ...form, nextBilling: new Date(e.target.value) })
            }
            required
          />
        </div>
      </div>

      <div>
        <Label htmlFor="category" className="mb-2">
          Catégorie
        </Label>
        <Input
          id="category"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          placeholder="Streaming, Productivité, ..."
        />
      </div>

      <div className="flex flex-col sm:flex-row md:flex-row lg:flex-col gap-4">
        <Button
          type="button"
          variant="outline"
          className="w-full sm:w-32 md:w-1/2 lg:w-full"
          onClick={() => setForm(subscriptionApi.default)}
        >
          <Undo2 className="w-4 h-4 mr-2" />
          Annuler
        </Button>
        <Button type="submit" className="flex-1">
          <Plus className="w-4 h-4 mr-2" />
          Ajouter
        </Button>
      </div>
    </form>
  );
}
