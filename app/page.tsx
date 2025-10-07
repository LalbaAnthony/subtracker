"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  TrendingUp,
  SquareArrowOutUpRight,
  PowerOff,
  PowerIcon,
} from "lucide-react";
import { Subscription } from "@/types/subscription";
import { subscriptionService } from "@/services/subscription";
import SubscriptionAddForm from "@/components/subscription-add-form";
import Link from "next/link";
import SubscriptionList from "@/components/subscription-list";

export default function Page() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);

  useEffect(() => {
    reloadData();
  }, []);

  const reloadData = async () => {
    const data = await subscriptionService.getAll();
    setSubscriptions(data);
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
            <SubscriptionAddForm asksReload={reloadData} />
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium">Abonnements</CardTitle>
            <Link href="/subscriptions">
              <Button variant="ghost" size="icon">
                <SquareArrowOutUpRight className="w-6 h-6 text-primary" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <SubscriptionList
              subscriptions={subscriptions}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
