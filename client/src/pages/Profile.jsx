//Purpose: User ke account ki details (naam, email) read-only form mein, bade avatar ke saath, aur ek Log out button. Data useAuth se aata hai, to Phase 3 mein asli user dikhega aur is file mein kuch nahi badlega.
import { LogOut } from "lucide-react";
import Avatar from "../components/ui/Avatar.jsx";
import Button from "../components/ui/Button.jsx";
import useAuth from "../hooks/useAuth.js";

export default function Profile() {
  const { user, logout } = useAuth();

  const details = [
    { label: "Name", value: user.name },
    { label: "Email", value: user.email },
  ];

  return (
    <div className="max-w-2xl space-y-6">
      <h1 className="font-display text-3xl font-semibold tracking-tight">
        Profile
      </h1>

      <section className="rounded-2xl border border-sand bg-white p-6 shadow-card">
        <div className="flex items-center gap-4">
          <Avatar name={user.name} size="lg" />
          <div className="min-w-0">
            <p className="font-display text-xl font-semibold">{user.name}</p>
            <p className="truncate text-sm text-charcoal/70">{user.email}</p>
          </div>
        </div>

        <dl className="mt-6 divide-y divide-sand/70 border-t border-sand/70 text-sm">
          {details.map((item) => (
            <div key={item.label} className="flex justify-between gap-4 py-3">
              <dt className="text-charcoal/60">{item.label}</dt>
              <dd className="break-all text-right font-medium">{item.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <Button variant="outline" icon={LogOut} onClick={logout}>
        Log out
      </Button>
    </div>
  );
}