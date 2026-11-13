//Purpose: Landing page ka footer. Logo, chhota tagline, links aur copyright. Saal new Date().getFullYear() se aata hai, to har saal haath se badalna nahi padta.
import { Link } from "react-router-dom";
import Logo from "../ui/Logo.jsx";

const LINK_CLASS =
  "transition-colors hover:text-terracotta-dark focus-visible:text-terracotta-dark";

export default function Footer() {
  return (
    <footer className="border-t border-sand bg-cream/60">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:px-6 md:flex-row md:items-center md:justify-between">
        <div>
          <Logo />
          <p className="mt-2 max-w-xs text-sm text-charcoal/70">
            Video meetings, chat and notes in one calm place.
          </p>
        </div>

        <nav
          aria-label="Footer"
          className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-charcoal/80"
        >
          <a href="/#features" className={LINK_CLASS}>
            Features
          </a>
          <a href="/#how-it-works" className={LINK_CLASS}>
            How it works
          </a>
          <Link to="/login" className={LINK_CLASS}>
            Log in
          </Link>
          <Link to="/register" className={LINK_CLASS}>
            Sign up
          </Link>
        </nav>
      </div>

      <div className="border-t border-sand/70 py-4 text-center text-xs text-charcoal/60">
        © {new Date().getFullYear()} MeetSphere. Built as a learning project.
      </div>
    </footer>
  );
}
