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
import { Plus, Trash2, Calendar, TrendingUp, Pen } from "lucide-react";
import { Subscription } from "@/types/Subscription";
import {
  defaultSubscription,
  createSubscription,
  deleteSubscription,
  fetchSubscriptions,
  types,
  frequencies,
} from "@/services/subscription";

export default function Page() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [form, setForm] = useState(defaultSubscription);

  useEffect(() => {
    reloadData();
  }, []);

  const reloadData = async () => {
    const data = await fetchSubscriptions();
    setSubscriptions(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createSubscription(form);
    reloadData();
    setForm(defaultSubscription);
  };

  const handleDelete = async (id: number) => {
    await deleteSubscription(id);
    reloadData();
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

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Mensuel</CardTitle>
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
            <CardTitle className="text-sm font-medium">Total Annuel</CardTitle>
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

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Abonnements Inactifs
            </CardTitle>
            <div className="w-4 h-4 bg-red-500 rounded-full" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {subscriptions.filter((s) => !s.active).length}
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
                      setForm({ ...form, price: parseInt(e.target.value) })
                    }
                    placeholder="9.99"
                    required
                  />
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
                    {Object.entries(frequencies).map(([key, object]) => (
                      <SelectItem key={key} value={key}>
                        {object.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="type">Type</Label>
                <Select
                  value={form.type}
                  onValueChange={(v) => setForm({ ...form, type: v })}
                >
                  <SelectTrigger id="type">
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
                <Label htmlFor="nextBilling">Prochain paiement</Label>
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
                      Catégorie
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium">
                      Type
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
                    <th className="px-4 py-3 text-right text-sm font-medium">
                      &nbsp;
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {subscriptions.map((sub) => (
                    <tr key={sub.id} className="hover:bg-muted/50">
                      <td className="px-4 py-3 font-medium">{sub.name}</td>
                      <td className="px-4 py-3">{sub.category || "-"}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium`}
                          style={{
                            backgroundColor: types[sub.type].color,
                            color: "#fff",
                          }}
                        >
                          {types[sub.type].name}
                        </span>
                      </td>
                      <td className="px-4 py-3">{sub.price} €</td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium`}
                          style={{
                            backgroundColor: types[sub.type].color,
                            color: "#fff",
                          }}
                        >
                          {frequencies[sub.frequency].name}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {new Date(sub.nextBilling).toLocaleDateString("fr-FR")}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(sub.id)}
                        >
                          <Pen className="w-4 h-4 text-primary" />
                        </Button>
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
                        <CardTitle className="text-base">{sub.name}</CardTitle>
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
                      <span className="font-medium">{sub.price} €</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Fréquence:</span>
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {frequencies[sub.frequency].name}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Prochain paiement:
                      </span>
                      <span>
                        {new Date(sub.nextBilling).toLocaleDateString("fr-FR")}
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
  );
}
