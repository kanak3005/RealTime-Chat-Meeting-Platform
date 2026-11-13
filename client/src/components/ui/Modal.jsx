//Purpose: Popup window, browser ke built-in <dialog> element par bani hai. showModal() se Esc key, focus trap aur dark backdrop browser khud sambhalta hai.

// Teen cheezein yaad rakho:
// Children sirf open hone par render hote hain. Isse har baar form fresh khulta hai, purana text ya error nahi bachta.
// data-autofocus wale element par modal khulte hi focus aa jata hai.
// Backdrop par click karne se modal band hota hai. Backdrop ka click dialog element par hi aata hai, isliye event.target === event.currentTarget check kaam karta hai.
// Modal top layer mein rehta hai, isliye toast uske peeche chhup jata hai. Modal ke andar toast ki jagah inline error dikhana.

import { useEffect, useId, useLayoutEffect, useRef } from "react";
import { X } from "lucide-react";

export default function Modal({ open, onClose, title, description, children }) {
  const dialogRef = useRef(null);
  const titleId = useId();

  useLayoutEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
      dialog.querySelector("[data-autofocus]")?.focus();
    }
    if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) onClose();
  };

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      onClose={onClose}
      onClick={handleBackdropClick}
      className="max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-md overflow-y-auto rounded-2xl bg-ivory text-charcoal shadow-card"
    >
      {open && (
        <div className="p-6">
          <div className="mb-5 flex items-start justify-between gap-4">
            <div>
              <h2
                id={titleId}
                className="font-display text-xl font-semibold"
              >
                {title}
              </h2>
              {description && (
                <p className="mt-1 text-sm text-charcoal/70">{description}</p>
              )}
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close dialog"
              className="-mr-2 -mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-charcoal/60 hover:bg-cream hover:text-charcoal"
            >
              <X size={20} />
            </button>
          </div>

          {children}
        </div>
      )}
    </dialog>
  );
}