// app/page.tsx
"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { Plus, Trash2, Calendar, TrendingUp } from "lucide-react";

interface Subscription {
  id: number;
  name: string;
  price: number;
  currency: string;
  frequency: string;
  nextBilling: string;
  category?: string;
  active: boolean;
}

export default function Page() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [form, setForm] = useState({
    name: "",
    price: "",
    currency: "EUR",
    frequency: "monthly",
    nextBilling: "",
    category: "",
  });

  const fetchSubscriptions = async () => {
    const res = await fetch("/api/subscriptions");
    const data = await res.json();
    setSubscriptions(data);
  };

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/subscriptions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        price: parseFloat(form.price),
        nextBilling: new Date(form.nextBilling),
        active: true,
      }),
    });
    fetchSubscriptions();
    setForm({
      name: "",
      price: "",
      currency: "EUR",
      frequency: "monthly",
      nextBilling: "",
      category: "",
    });
  };

  const handleDelete = async (id: number) => {
    await fetch(`/api/subscriptions/${id}`, { method: "DELETE" });
    fetchSubscriptions();
  };

  const totalMonthly = subscriptions
    .filter((s) => s.active)
    .reduce((acc, s) => {
      const monthly =
        s.frequency === "yearly"
          ? s.price / 12
          : s.frequency === "weekly"
          ? s.price * 4.33
          : s.price;
      return acc + monthly;
    }, 0);

  const frequencyLabels: Record<string, string> = {
    monthly: "Mensuel",
    yearly: "Annuel",
    weekly: "Hebdomadaire",
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Gestionnaire d'Abonnements
          </h1>
          <p className="text-muted-foreground">
            Suivez vos dépenses mensuelles
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Total Mensuel
              </CardTitle>
              <TrendingUp className="w-4 h-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {totalMonthly.toFixed(2)} €
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Total Annuel
              </CardTitle>
              <Calendar className="w-4 h-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {(totalMonthly * 12).toFixed(2)} €
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Abonnements Actifs
              </CardTitle>
              <div className="w-4 h-4 bg-green-500 rounded-full" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {subscriptions.filter((s) => s.active).length}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Nouvel Abonnement</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Nom</Label>
                  <Input
                    id="name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Netflix"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="price">Prix</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      value={form.price}
                      onChange={(e) =>
                        setForm({ ...form, price: e.target.value })
                      }
                      placeholder="9.99"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="currency">Devise</Label>
                    <Select
                      value={form.currency}
                      onValueChange={(v) => setForm({ ...form, currency: v })}
                    >
                      <SelectTrigger id="currency">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="EUR">EUR</SelectItem>
                        <SelectItem value="USD">USD</SelectItem>
                        <SelectItem value="GBP">GBP</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="frequency">Fréquence</Label>
                  <Select
                    value={form.frequency}
                    onValueChange={(v) => setForm({ ...form, frequency: v })}
                  >
                    <SelectTrigger id="frequency">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monthly">Mensuel</SelectItem>
                      <SelectItem value="yearly">Annuel</SelectItem>
                      <SelectItem value="weekly">Hebdomadaire</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="nextBilling">Prochain paiement</Label>
                  <Input
                    id="nextBilling"
                    type="date"
                    value={form.nextBilling}
                    onChange={(e) =>
                      setForm({ ...form, nextBilling: e.target.value })
                    }
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="category">Catégorie</Label>
                  <Input
                    id="category"
                    value={form.category}
                    onChange={(e) =>
                      setForm({ ...form, category: e.target.value })
                    }
                    placeholder="Streaming"
                  />
                </div>

                <Button type="submit" className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Ajouter
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Abonnements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-medium">
                        Nom
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium">
                        Prix
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium">
                        Fréquence
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium">
                        Prochain paiement
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium">
                        Catégorie
                      </th>
                      <th className="px-4 py-3 text-right text-sm font-medium">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {subscriptions.map((sub) => (
                      <tr key={sub.id} className="hover:bg-muted/50">
                        <td className="px-4 py-3 font-medium">{sub.name}</td>
                        <td className="px-4 py-3">
                          {sub.price} {sub.currency}
                        </td>
                        <td className="px-4 py-3">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {frequencyLabels[sub.frequency]}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          {new Date(sub.nextBilling).toLocaleDateString(
                            "fr-FR"
                          )}
                        </td>
                        <td className="px-4 py-3">{sub.category || "-"}</td>
                        <td className="px-4 py-3 text-right">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(sub.id)}
                          >
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="md:hidden space-y-4">
                {subscriptions.map((sub) => (
                  <Card key={sub.id}>
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-base">
                            {sub.name}
                          </CardTitle>
                          <CardDescription>
                            {sub.category || "Sans catégorie"}
                          </CardDescription>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(sub.id)}
                        >
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Prix:</span>
                        <span className="font-medium">
                          {sub.price} {sub.currency}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Fréquence:
                        </span>
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {frequencyLabels[sub.frequency]}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Prochain paiement:
                        </span>
                        <span>
                          {new Date(sub.nextBilling).toLocaleDateString(
                            "fr-FR"
                          )}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {subscriptions.length === 0 && (
                <div className="py-12 text-center text-muted-foreground">
                  Aucun abonnement enregistré
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
