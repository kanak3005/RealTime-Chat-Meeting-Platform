//Purpose: Label, input aur error message ek saath. 
// useId se label aur input apne aap jud jate hain,
//  aur aria-describedby se error screen reader ko sunai deta hai.
//  type="password" par show/hide ki eye button khud aa jati hai, 
// to Login aur Register mein alag se kuch nahi likhna padega. text-base isliye hai ki iPhone par focus karte waqt zoom na ho.

import { useId, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "../../utils/cn";

export default function Input({
  label,
  error,
  hint,
  id,
  type = "text",
  className,
  ...rest
}) {
  const generatedId = useId();
  const [visible, setVisible] = useState(false);

  const inputId = id || generatedId;
  const messageId = `${inputId}-message`;
  const isPassword = type === "password";
  const message = error || hint;

  return (
    <div className={className}>
      {label && (
        <label
          htmlFor={inputId}
          className="mb-1.5 block text-sm font-medium text-charcoal"
        >
          {label}
        </label>
      )}

      <div className="relative">
        <input
          id={inputId}
          type={isPassword && visible ? "text" : type}
          aria-invalid={error ? "true" : undefined}
          aria-describedby={message ? messageId : undefined}
          className={cn(
            "min-h-11 w-full rounded-xl border bg-white px-3.5 text-base text-charcoal transition-colors",
            "placeholder:text-charcoal/40 focus:border-lagoon focus:outline-none focus:ring-2 focus:ring-lagoon/30",
            error ? "border-terracotta" : "border-sand",
            isPassword && "pr-11"
          )}
          {...rest}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setVisible((current) => !current)}
            aria-label={visible ? "Hide password" : "Show password"}
            className="absolute inset-y-0 right-0 flex w-11 items-center justify-center text-charcoal/60 hover:text-charcoal"
          >
            {visible ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>

      {message && (
        <p
          id={messageId}
          role={error ? "alert" : undefined}
          className={cn(
            "mt-1.5 text-sm",
            error ? "text-terracotta-dark" : "text-charcoal/60"
          )}
        >
          {message}
        </p>
      )}
    </div>
  );
}