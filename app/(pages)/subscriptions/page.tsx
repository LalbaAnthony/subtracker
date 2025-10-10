"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Subscription } from "@/types/subscription";
import { subscriptionApi } from "@/api/subscription.api";
import SubscriptionList from "@/components/subscriptions/subscription-list";
import { typeApi } from "@/api/type.api";
import { frequencyApi } from "@/api/frequency.api";
import { paymentApi } from "@/api/payments.api";
import { Payment } from "@/types/payment";
import { Frequency } from "@/types/frequency";
import { Type } from "@/types/type";

export default function Page() {
  const [loading, setLoading] = useState<boolean>(false);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [types, setTypes] = useState<Type[]>([]);
  const [frequencies, setFrequencies] = useState<Frequency[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);

  useEffect(() => {
    reloadData();
  });

  const reloadData = async () => {
    setLoading(true);

    const subData = await subscriptionApi.getAll({
      pagination: { page: 1, limit: 5 },
    });
    setSubscriptions(subData);

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
      <Card className="lg:col-span-2">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Abonnements</CardTitle>
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
  );
}
