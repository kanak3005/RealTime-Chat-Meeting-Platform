//purpose: Spinner ek chhota ghumta hua icon hai, jo Button ke andar bhi use hota hai. Loader poore section ke liye centered loading block hai. role="status" se screen reader ko "Loading..." sunai deta h
import { Loader2 } from "lucide-react";
import { cn } from "../../utils/cn";

export function Spinner({ size = 20, className }) {
  return (
    <Loader2
      size={size}
      aria-hidden="true"
      className={cn("animate-spin", className)}
    />
  );
}

export default function Loader({ label = "Loading...", className }) {
  return (
    <div
      role="status"
      className={cn(
        "flex flex-col items-center justify-center gap-3 py-16 text-charcoal/70",
        className
      )}
    >
      <Spinner size={28} className="text-terracotta" />
      <span className="text-sm">{label}</span>
    </div>
  );
}