"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  TrendingUp,
  SquareArrowOutUpRight,
  X,
  Check,
  CalendarRange,
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
import DashboardStat from "@/components/cards/dashboard-stat";

export default function Page() {
  const [loading, setLoading] = useState<boolean>(false);
  const [dashboard, setDashboard] = useState<Dashboard>(dashboardApi.default);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [types, setTypes] = useState<Type[]>([]);
  const [frequencies, setFrequencies] = useState<Frequency[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);

  useEffect(() => {
    reloadData();
  }, []);

  const reloadData = async () => {
    setLoading(true);

    const subData = await subscriptionApi.getAll({
      pagination: { page: 1, limit: 5 },
    });
    setSubscriptions(subData);

    const dashData = await dashboardApi.get();
    setDashboard(dashData);

    if (types.length === 0) {
      const typeData = await typeApi.getAll();
      setTypes(typeData);
    }

    if (frequencies.length === 0) {
      const frequencyData = await frequencyApi.getAll();
      setFrequencies(frequencyData);
    }

    if (payments.length === 0) {
      const paymentData = await paymentApi.getAll();
      setPayments(paymentData);
    }

    setLoading(false);
  };

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 mb-8">
        <DashboardStat
          title="Prochaine date"
          value={
            dashboard.nextBilling
              ? new Date(dashboard.nextBilling).toLocaleDateString("fr-FR", {
                  day: "2-digit",
                  month: "short",
                })
              : "-"
          }
          iconNode={<TrendingUp className="w-4 h-4" />}
          iconClass="text-blue-500"
          loading={loading}
          />
        <DashboardStat
          title="Total Mensuel"
          value={`${dashboard.monthly} €`}
          iconNode={<Calendar className="w-4 h-4" />}
          iconClass="text-purple-500"
          loading={loading}
          />
        <DashboardStat
          title="Total Annuel"
          value={`${dashboard.yearly} €`}
          iconNode={<CalendarRange className="w-4 h-4" />}
          iconClass="text-orange-500"
          loading={loading}
        />
        <DashboardStat
          title="Actifs"
          value={dashboard.actives}
          iconNode={<Check className="w-4 h-4" />}
          iconClass="text-green-500"
          loading={loading}
        />
        <DashboardStat
          title="Inactifs"
          value={dashboard.inactives}
          iconNode={<X className="w-4 h-4" />}
          iconClass="text-red-500"
          loading={loading}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">  
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="my-2">Ajouter</CardTitle>
          </CardHeader>
          <CardContent>
            <SubscriptionAddForm
              payments={payments}
              types={types}
              frequencies={frequencies}
              loading={loading}
              asksRefresh={reloadData}
            />
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Abonnements</CardTitle>
            <Link href="/subscriptions">
              <Button variant="ghost" size="icon">
                <SquareArrowOutUpRight className="w-8 h-8 text-primary" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <SubscriptionList
              subscriptions={subscriptions}
              payments={payments}
              types={types}
              frequencies={frequencies}
              loading={loading}
              asksRefresh={reloadData}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
