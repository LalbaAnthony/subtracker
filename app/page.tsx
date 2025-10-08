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
import { subscriptionApi } from "@/api/subscription.api";
import SubscriptionAddForm from "@/components/forms/subscription-add";
import Link from "next/link";
import SubscriptionList from "@/components/lists/subscription";
import { dashboardApi } from "@/api/dashboard.api";
import { Dashboard } from "@/types/dashboard";
import { typeApi } from "@/api/type.api";
import { frequencyApi } from "@/api/frequency.api";
import { paymentApi } from "@/api/payments.api";
import { Payment } from "@/types/payment";
import { Frequency } from "@/types/frequency";
import { Type } from "@/types/type";

export default function Page() {
  const [dashboard, setDashboard] = useState<Dashboard>(dashboardApi.default);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [types, setTypes] = useState<Type[]>([]);
  const [frequencies, setFrequencies] = useState<Frequency[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);

  useEffect(() => {
    reloadData();
  }, []);

  const reloadData = async () => {
    const subData = await subscriptionApi.getAll();
    setSubscriptions(subData);
    const dashData = await dashboardApi.get();
    setDashboard(dashData);
    const typeData = await typeApi.getAll();
    setTypes(typeData);
    const frequencyData = await frequencyApi.getAll();
    setFrequencies(frequencyData);
    const paymentData = await paymentApi.getAll();
    setPayments(paymentData);
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium">Total Mensuel</CardTitle>
            <TrendingUp className="w-4 h-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboard.monthly} €</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium">Total Annuel</CardTitle>
            <Calendar className="w-4 h-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboard.yearly} €</div>
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
            <div className="text-2xl font-bold">{dashboard.actives}</div>
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
            <div className="text-2xl font-bold">{dashboard.inactives}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Nouvel Abonnement</CardTitle>
          </CardHeader>
          <CardContent>
            <SubscriptionAddForm
              payments={payments}
              types={types}
              frequencies={frequencies}
            />
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
              payments={payments}
              types={types}
              frequencies={frequencies}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
