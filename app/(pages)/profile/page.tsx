"use client";

import { useSession } from "@/lib/auth-client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProfilePage() {
  const { data: session, isPending: loading } = useSession();

  if (loading) {
    return <Skeleton className="h-48 w-full" />;
  }

  if (!session) {
    return null;
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Profile</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm text-muted-foreground">Email</p>
          <p className="font-medium">{session.user.email}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Name</p>
          <p className="font-medium">{session.user.name}</p>
        </div>
      </CardContent>
    </Card>
  );
}
