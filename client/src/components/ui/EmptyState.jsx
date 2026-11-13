//Purpose: Jab list khali ho (koi meeting nahi, search ka result nahi), tab dikhne wala friendly block. 
// icon mein lucide ka component bhejte hain (jaise Video). action mein koi bhi button bhej sakte ho.

import { Inbox } from "lucide-react";
import { cn } from "../../utils/cn";

export default function EmptyState({
  icon: Icon = Inbox,
  title,
  description,
  action,
  className,
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center rounded-2xl border border-dashed border-sand bg-cream/50 px-6 py-14 text-center",
        className
      )}
    >
      <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-sand/70 text-terracotta-dark">
        <Icon size={22} aria-hidden="true" />
      </span>
      <h3 className="font-display text-lg font-semibold">{title}</h3>
      {description && (
        <p className="mt-1 max-w-sm text-sm text-charcoal/70">{description}</p>
      )}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}