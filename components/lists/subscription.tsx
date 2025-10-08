"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, Pen } from "lucide-react";
import { Subscription } from "@/types/subscription";
import { subscriptionApi } from "@/api/subscription.api";
import { types } from "@/api/type.api";
import { frequencies } from "@/api/frequency.api";
import { payments } from "@/api/payments.api";

export default function SubscriptionList({
  subscriptions,
}: {
  subscriptions: Subscription[];
}) {
  const handleUpdate = (id: number) => {
    window.location.href = `/subscriptions/${id}`;
  };

  const handleDelete = async (id: number) => {
    await subscriptionApi.delete(id);
  };

  return (
    <div>
      {/* DESKTOP VIEW */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead className="border-b">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium">Nom</th>
              <th className="px-4 py-3 text-left text-sm font-medium">
                Catégorie
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium">Type</th>
              <th className="px-4 py-3 text-left text-sm font-medium">
                Paiment
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium">Prix</th>
              <th className="px-4 py-3 text-left text-sm font-medium">
                Fréquence
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium">
                Date
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
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      payments[sub.payment].class
                    }`}
                  >
                    {payments[sub.payment].name}
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
                <span className="text-muted-foreground">Paiment:</span>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    payments[sub.payment].class
                  }`}
                >
                  {payments[sub.payment].name}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  Date:
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
    </div>
  );
}
