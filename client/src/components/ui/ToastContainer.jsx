//Purpose: Toasts dikhane wala box, jo ToastProvider render karta hai.
//  Ye sirf dikhata hai, state ToastProvider mein hai. Mobile par neeche poori chaudai mein dikhta hai, 
// aur bade screen par neeche-dayein kone mein. Container hamesha render hota hai (aria-live), taaki screen reader naye toast ko announce kar sake.

import { AlertCircle, CheckCircle2, Info, X } from "lucide-react";

const TONES = {
  success: {
    icon: CheckCircle2,
    iconClass: "text-lagoon",
    borderClass: "border-l-lagoon",
  },
  error: {
    icon: AlertCircle,
    iconClass: "text-terracotta",
    borderClass: "border-l-terracotta",
  },
  info: {
    icon: Info,
    iconClass: "text-marigold",
    borderClass: "border-l-marigold",
  },
};

export default function ToastContainer({ toasts, onDismiss }) {
  return (
    <div
      aria-live="polite"
      className="pointer-events-none fixed inset-x-4 bottom-4 z-50 flex flex-col gap-2 sm:left-auto sm:right-4 sm:w-96"
    >
      {toasts.map((toast) => {
        const tone = TONES[toast.type] ?? TONES.info;
        const Icon = tone.icon;

        return (
          <div
            key={toast.id}
            role={toast.type === "error" ? "alert" : "status"}
            className={`pointer-events-auto flex animate-toast-in items-start gap-3 rounded-xl border border-l-4 border-sand bg-white p-3.5 shadow-card ${tone.borderClass}`}
          >
            <Icon
              size={20}
              aria-hidden="true"
              className={`mt-0.5 shrink-0 ${tone.iconClass}`}
            />
            <p className="flex-1 text-sm text-charcoal">{toast.message}</p>
            <button
              type="button"
              onClick={() => onDismiss(toast.id)}
              aria-label="Dismiss notification"
              className="-mr-1 flex h-6 w-6 shrink-0 items-center justify-center rounded text-charcoal/50 hover:text-charcoal"
            >
              <X size={16} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
