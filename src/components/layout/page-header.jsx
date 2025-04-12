
import { cn } from "@/lib/utils";

export function PageHeader({
  title,
  description,
  actions,
  className,
}) {
  return (
    <div className={cn("flex flex-col gap-1 pb-6", className)}>
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">{title}</h1>
          {description && (
            <p className="text-sm text-slate-500 dark:text-slate-400 md:text-base">
              {description}
            </p>
          )}
        </div>
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>
    </div>
  );
}
