import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface props {
  title: string;
  value: string | number;
  iconNode: React.ReactNode;
  iconClass: string;
}

export default function DashboardStat({
  title,
  value,
  iconNode,
  iconClass,
}: props) {
  return (
    <div>
      {/* DESKTOP */}
      <Card className="hidden md:block">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          <div className={iconClass}>{iconNode}</div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{value}</div>
        </CardContent>
      </Card>
      {/* MOBILE */}
      <Card className="block md:hidden py-2">
        <CardContent className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className={iconClass}>{iconNode}</div>
            <div className="text-sm font-medium">{title}</div>
          </div>
          <div className="text-l font-bold">{value}</div>
        </CardContent>
      </Card>
    </div>
  );
}
