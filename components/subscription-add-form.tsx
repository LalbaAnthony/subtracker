"use client";

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
import { Plus } from "lucide-react";
import { subscriptionService } from "@/services/subscription";
import { types } from "@/services/type";
import { frequencies } from "@/services/frequency";
import { payments } from "@/services/payments";

export default function SubscriptionAddForm({
  asksReload,
}: {
  asksReload: () => void;
}) {
  const [form, setForm] = useState(subscriptionService.default);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await subscriptionService.create(form);
    setForm(subscriptionService.default);
    asksReload();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name" className="mb-1">
          Nom
        </Label>
        <Input
          id="name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Netflix"
          required
        />
      </div>

      <div className="flex gap-x-4">
        <div>
          <Label htmlFor="price" className="mb-1">
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
          <Label htmlFor="frequency" className="mb-1">
            Fréquence
          </Label>
          <Select
            value={form.frequency}
            onValueChange={(v) => setForm({ ...form, frequency: v })}
          >
            <SelectTrigger id="frequency" className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(frequencies).map(([key, object]) => (
                <SelectItem key={key} value={key}>
                  {object.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex-1">
        <Label htmlFor="payment" className="mb-1">
          Paiement
        </Label>
        <Select
          value={form.payment}
          onValueChange={(v) => setForm({ ...form, payment: v })}
        >
          <SelectTrigger id="payment" className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(payments).map(([key, object]) => (
              <SelectItem key={key} value={key}>
                {object.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex gap-x-4">
        <div className="flex-1">
          <Label htmlFor="type" className="mb-1">
            Type
          </Label>
          <Select
            value={form.type}
            onValueChange={(v) => setForm({ ...form, type: v })}
          >
            <SelectTrigger id="type" className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(types).map(([key, object]) => (
                <SelectItem key={key} value={key}>
                  {object.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="nextBilling" className="mb-1">
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
        <Label htmlFor="category" className="mb-1">
          Catégorie
        </Label>
        <Input
          id="category"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          placeholder="Streaming"
        />
      </div>

      <Button type="submit" className="w-full">
        <Plus className="w-4 h-4 mr-2" />
        Ajouter
      </Button>
    </form>
  );
}
