//Poori app ka ek hi button. to prop dene par ye <Link> ban jata hai (page navigation), warna normal <button>. loading true hone par spinner dikhta hai aur button disable ho jata hai, isse double-submit nahi hota. Teen sizes ki min-h 36 / 44 / 48px hai, taaki mobile par touch aasan rahe.
import { Link } from "react-router-dom";
import { cn } from "../../utils/cn";
import { Spinner } from "./Loader.jsx";

const VARIANTS = {
  primary: "bg-terracotta text-white hover:bg-terracotta-dark",
  secondary: "bg-lagoon text-white hover:bg-lagoon-dark",
  outline: "border border-sand bg-white text-charcoal hover:bg-cream",
  ghost: "text-charcoal hover:bg-cream",
  danger: "bg-red-700 text-white hover:bg-red-800",
};

const SIZES = {
  sm: "min-h-9 px-3 text-sm",
  md: "min-h-11 px-4 text-sm",
  lg: "min-h-12 px-6 text-base",
};

export default function Button({
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  to,
  icon: Icon,
  type = "button",
  className,
  children,
  ...rest
}) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-colors",
    "disabled:cursor-not-allowed disabled:opacity-60",
    VARIANTS[variant],
    SIZES[size],
    className
  );

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {Icon && <Icon size={18} aria-hidden="true" />}
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={classes}
      {...rest}
    >
      {loading ? (
        <Spinner size={18} />
      ) : (
        Icon && <Icon size={18} aria-hidden="true" />
      )}
      {children}
    </button>
  );
}