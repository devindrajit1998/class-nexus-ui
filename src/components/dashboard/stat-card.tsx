
import { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowDownIcon, ArrowUpIcon, MinusIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type StatCardProps = {
  title: string;
  value: string | number;
  change?: string;
  trend?: "up" | "down" | "neutral";
  icon?: ReactNode;
  className?: string;
};

export function StatCard({
  title,
  value,
  change,
  trend = "neutral",
  icon,
  className,
}: StatCardProps) {
  const getTrendBadge = () => {
    switch (trend) {
      case "up":
        return (
          <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700 dark:text-emerald-400">
            <ArrowUpIcon className="h-3 w-3" />
            {change}
          </span>
        );
      case "down":
        return (
          <span className="inline-flex items-center gap-1 text-xs font-medium text-red-700 dark:text-red-400">
            <ArrowDownIcon className="h-3 w-3" />
            {change}
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-600 dark:text-slate-400">
            <MinusIcon className="h-3 w-3" />
            {change || "No change"}
          </span>
        );
    }
  };

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            {title}
          </p>
          {icon && <div className="h-8 w-8 text-indigo-500">{icon}</div>}
        </div>
        <div className="mt-2 flex items-baseline gap-2">
          <h3 className="text-2xl font-bold">{value}</h3>
          {change && getTrendBadge()}
        </div>
      </CardContent>
    </Card>
  );
}
