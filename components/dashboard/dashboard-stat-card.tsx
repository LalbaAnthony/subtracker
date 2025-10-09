import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface Props {
  title: string;
  value: string | number;
  iconNode: React.ReactNode;
  iconClass: string;
  loading?: boolean;
}

export default function DashboardStatCard({
  title,
  value,
  iconNode,
  iconClass,
  loading = true,
}: Props) {
  return (
    <div>
      {/* DESKTOP */}
      <div className="hidden md:block">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium">{title}</CardTitle>
            <div className={iconClass}>{iconNode}</div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-8 w-1/2 rounded-md" />
            ) : (
              <div className="text-2xl font-bold">{value}</div>
            )}
          </CardContent>
        </Card>
      </div>
      {/* MOBILE */}
      <div className="block md:hidden">
        <Card className="py-2">
          <CardContent className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className={iconClass}>{iconNode}</div>
              <div className="text-sm font-medium">{title}</div>
            </div>
            {loading ? (
              <Skeleton className="h-6 w-1/4 rounded-md" />
            ) : (
              <div className="text-l font-medium sm:text-xl sm:font-bold">
                {value}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
