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
import {
  Trash2,
  Calendar,
  TrendingUp,
  Pen,
  SquareArrowOutUpRight,
  PowerOff,
  PowerIcon,
} from "lucide-react";
import { Subscription } from "@/types/Subscription";
import { subscriptionService } from "@/services/subscription";
import { types } from "@/services/type";
import { frequencies } from "@/services/frequency";
import SubscriptionAddForm from "@/components/subscription-add-form";
import Link from "next/link";

export default function Page() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);

  useEffect(() => {
    reloadData();
  }, []);

  const reloadData = async () => {
    const data = await subscriptionService.getAll();
    setSubscriptions(data);
  };

  const handleUpdate = (id: number) => {
    window.location.href = `/subscriptions/${id}`;
  };

  const handleDelete = async (id: number) => {
    await subscriptionService.delete(id);
    reloadData();
  };

  const totalMonthly = subscriptions
    .filter((s) => s.active)
    .reduce((acc, s) => {
      const monthly =
        s.frequency === "biennial"
          ? s.price / 24
          : s.frequency === "yearly"
          ? s.price / 12
          : s.frequency === "monthly"
          ? s.price
          : s.frequency === "weekly"
          ? s.price * 4.33
          : s.price;
      return acc + monthly;
    }, 0);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
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
          <CardHeader className="flex flex-row items-center justify-between">
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
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium">
              Abonnements Actifs
            </CardTitle>
            <PowerIcon className="w-4 h-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {subscriptions.filter((s) => s.active).length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium">
              Abonnements Inactifs
            </CardTitle>
            <PowerOff className="w-4 h-4 text-red-500" />
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
            {/* <SubscriptionAddForm onAdd={reloadData} /> */}
            <SubscriptionAddForm />
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Abonnements</CardTitle>
            <Link href="/subscriptions">
              <Button variant="ghost" size="icon">
                <SquareArrowOutUpRight className="w-6 h-6 text-primary" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            {/* DESKTOP VIEW */}
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
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            types[sub.type].class
                          }`}
                        >
                          {types[sub.type].name}
                        </span>
                      </td>
                      <td className="px-4 py-3">{sub.price} €</td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            frequencies[sub.frequency].class
                          }`}
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
                          onClick={() => handleUpdate(sub.id)}
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

            {/* MOBILE VIEW */}
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
                      <div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleUpdate(sub.id)}
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
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Prix:</span>
                      <span className="font-medium">{sub.price} €</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Fréquence:</span>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          frequencies[sub.frequency].class
                        }`}
                      >
                        {frequencies[sub.frequency].name}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Type:</span>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          types[sub.type].class
                        }`}
                      >
                        {types[sub.type].name}
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
