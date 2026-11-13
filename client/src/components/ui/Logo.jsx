import { Link } from "react-router-dom";
import { cn } from "../../utils/cn";

function LogoMark() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className="h-8 w-8 shrink-0">
      <rect width="32" height="32" rx="9" className="fill-terracotta" />
      <circle
        cx="16"
        cy="16"
        r="7"
        fill="none"
        strokeWidth="2.2"
        className="stroke-ivory"
      />
      <ellipse
        cx="16"
        cy="16"
        rx="7"
        ry="3"
        fill="none"
        strokeWidth="1.6"
        className="stroke-ivory"
      />
      <circle cx="23" cy="9" r="2.4" className="fill-marigold" />
    </svg>
  );
}

export default function Logo({ to = "/", className }) {
  const classes = cn("inline-flex items-center gap-2.5", className);
  const content = (
    <>
      <LogoMark />
      <span className="font-display text-xl font-semibold tracking-tight text-charcoal">
        MeetSphere
      </span>
    </>
  );

  if (!to) return <div className={classes}>{content}</div>;

  return (
    <Link to={to} aria-label="MeetSphere home" className={classes}>
      {content}
    </Link>
  );
}
//Purpose: Brand mark (terracotta square ke andar sphere) aur "MeetSphere" naam. Default mein / par link karta hai. Dashboard mein <Logo to="/dashboard" /> use hoga. to={null} dene par sirf logo dikhta hai, link nahi.

