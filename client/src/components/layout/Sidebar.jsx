//Purpose: Dashboard ka side menu. Bade screen (lg) par left mein hamesha dikhta hai. 
// Mobile par drawer ban jata hai: hamburger se khulta hai, aur overlay, X button, 
// Esc ya kisi link par click karne se band hota hai. Band hone par drawer invisible ho jata hai, 
// to Tab key se uske links tak focus nahi pahunchta. Active link NavLink apne aap pehchan leta hai.

import { useEffect } from "react";
import { LayoutDashboard, UserRound, Video, X } from "lucide-react";
import { NavLink } from "react-router-dom";
import { cn } from "../../utils/cn";
import Logo from "../ui/Logo.jsx";

const ITEMS = [
  { to: "/dashboard", label: "Home", icon: LayoutDashboard, end: true },
  { to: "/dashboard/meetings", label: "Meetings", icon: Video, end: false },
  { to: "/dashboard/profile", label: "Profile", icon: UserRound, end: false },
];

export default function Sidebar({ open, onClose }) {
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  return (
    <>
      {open && (
        <div
          onClick={onClose}
          aria-hidden="true"
          className="fixed inset-0 z-40 bg-charcoal/40 lg:hidden"
        />
      )}

      <aside
        aria-label="Sidebar"
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-72 max-w-[85vw] flex-col border-r border-sand bg-ivory",
          "transition-[translate,visibility] duration-200",
          "lg:sticky lg:bottom-auto lg:top-16 lg:z-auto lg:h-[calc(100dvh-4rem)] lg:w-64 lg:shrink-0 lg:translate-x-0 lg:self-start lg:bg-cream/60",
          open ? "translate-x-0" : "-translate-x-full max-lg:invisible"
        )}
      >
        <div className="flex h-16 items-center justify-between border-b border-sand/70 px-4 lg:hidden">
          <Logo to={null} />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close navigation menu"
            className="-mr-2 flex h-11 w-11 items-center justify-center rounded-lg text-charcoal/70 hover:bg-cream hover:text-charcoal"
          >
            <X size={20} />
          </button>
        </div>

        <nav aria-label="Dashboard" className="flex-1 space-y-1 p-3">
          {ITEMS.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={onClose}
              className={({ isActive }) =>
                cn(
                  "flex min-h-11 items-center gap-3 rounded-xl px-3 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-white text-terracotta-dark shadow-card"
                    : "text-charcoal/80 hover:bg-sand/60"
                )
              }
            >
              <Icon size={18} aria-hidden="true" />
              {label}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}