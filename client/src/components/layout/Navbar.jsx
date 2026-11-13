//Purpose: Dashboard ka top bar. Mobile par hamburger button (onMenuClick bulata hai), logo, user ka avatar aur naam, aur Log out button. User aur logout useAuth se aate hain. Abhi wo stub hai, Phase 3 mein asli ho jayega, is file mein kuch nahi badlega.

import { LogOut, Menu } from "lucide-react";
import useAuth from "../../hooks/useAuth.js";
import Avatar from "../ui/Avatar.jsx";
import Button from "../ui/Button.jsx";
import Logo from "../ui/Logo.jsx";

export default function Navbar({ onMenuClick }) {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-30 h-16 border-b border-sand/70 bg-ivory">
      <div className="flex h-full items-center justify-between gap-3 px-4 sm:px-6">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onMenuClick}
            aria-label="Open navigation menu"
            className="-ml-2 flex h-11 w-11 items-center justify-center rounded-lg text-charcoal hover:bg-cream lg:hidden"
          >
            <Menu size={22} />
          </button>
          <Logo to="/dashboard" />
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-2.5">
            <Avatar name={user.name} size="sm" />
            <span className="hidden text-sm font-medium sm:inline">
              {user.name}
            </span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            icon={LogOut}
            onClick={logout}
            aria-label="Log out"
          >
            <span className="hidden sm:inline">Log out</span>
          </Button>
        </div>
      </div>
    </header>
  );
}