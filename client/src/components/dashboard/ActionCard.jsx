//Purpose: Dashboard ke upar ka bada clickable card 
// ("New meeting", "Join with code"). Ye ek asli <button> hai, 
// to keyboard aur screen reader dono par kaam karta hai. tone se icon ka rang badalta hai.

import { cn } from "../../utils/cn";

const TONES = {
  terracotta: {
    icon: "bg-terracotta text-white",
    card: "hover:border-terracotta/60",
  },
  lagoon: {
    icon: "bg-lagoon text-white",
    card: "hover:border-lagoon/60",
  },
};

export default function ActionCard({
  icon: Icon,
  title,
  description,
  tone = "terracotta",
  onClick,
}) {
  const styles = TONES[tone] ?? TONES.terracotta;

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex w-full items-center gap-4 rounded-2xl border border-sand bg-white p-5 text-left shadow-card transition-colors",
        styles.card
      )}
    >
      <span
        className={cn(
          "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl",
          styles.icon
        )}
      >
        <Icon size={22} aria-hidden="true" />
      </span>
      <span>
        <span className="block font-display text-lg font-semibold">
          {title}
        </span>
        <span className="mt-0.5 block text-sm text-charcoal/70">
          {description}
        </span>
      </span>
    </button>
  );
}