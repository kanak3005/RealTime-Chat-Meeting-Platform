//Purpose: Naam ke initials ka gola. 
// Photo abhi nahi hai, isliye initials hi dikhte hain. 
// Rang naam se nikalta hai (same naam = hamesha same rang),
//  aur chaaron rang palette ke halke shades hain. Tailwind ko poori class names text mein chahiye, isliye TONES mein literal strings hain.

import { cn } from "../../utils/cn";
import { getInitials } from "../../utils/format";

const TONES = [
  "bg-coral/25 text-terracotta-dark",
  "bg-lagoon/20 text-lagoon-dark",
  "bg-sage/35 text-charcoal",
  "bg-marigold/30 text-charcoal",
];

const SIZES = {
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-14 w-14 text-lg",
};

function pickTone(name) {
  let hash = 0;
  for (const char of name) {
    hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
  }
  return TONES[hash % TONES.length];
}

export default function Avatar({ name = "", size = "md", className }) {
  return (
    <span
      role="img"
      aria-label={name || "Unknown user"}
      title={name}
      className={cn(
        "inline-flex shrink-0 select-none items-center justify-center rounded-full font-semibold",
        SIZES[size],
        pickTone(name),
        className
      )}
    >
      {getInitials(name)}
    </span>
  );
}