//Purpose: Login aur Register ka frame. Upar logo (click karne par home), beech mein white card. Card ke andar Login/Register page (Batch 6) apna heading aur form dalega. Mobile par card upar ki taraf rehta hai, taaki keyboard khulne par form dikhta rahe, aur bade screen par beech mein aa jata hai.
import { Outlet } from "react-router-dom";
import Logo from "../components/ui/Logo.jsx";

export default function AuthLayout() {
  return (
    <div className="flex min-h-dvh flex-col">
      <header className="px-4 py-5 sm:px-6">
        <Logo />
      </header>

      <main className="flex flex-1 items-start justify-center px-4 pb-12 pt-4 sm:items-center">
        <div className="w-full max-w-md rounded-2xl border border-sand bg-white p-6 shadow-card sm:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}