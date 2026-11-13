///Purpose: Landing page ka top bar. Logo, do anchor links (sirf bade screen par) aur "Log in" / "Get started" buttons. Mobile par sirf logo aur dono buttons dikhte hain.
import Button from "../ui/Button.jsx";
import Logo from "../ui/Logo.jsx";

const LINKS = [
  { label: "Features", href: "/#features" },
  { label: "How it works", href: "/#how-it-works" },
];

export default function PublicNavbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-sand/70 bg-ivory/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Logo />

        <nav aria-label="Main" className="hidden items-center gap-8 md:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-charcoal/80 transition-colors hover:text-terracotta-dark"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button to="/login" variant="ghost" size="sm">
            Log in
          </Button>
          <Button to="/register" size="sm">
            Get started
          </Button>
        </div>
      </div>
    </header>
  );
}