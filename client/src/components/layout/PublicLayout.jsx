//Purpose: Landing jaise public pages ka frame. min-h-dvh aur flex-1 se chhota content hone par bhi footer screen ke neeche hi rehta hai
import { Outlet } from "react-router-dom";
import Footer from "../components/layout/Footer.jsx";
import PublicNavbar from "../components/layout/PublicNavbar.jsx";

export default function PublicLayout() {
  return (
    <div className="flex min-h-dvh flex-col">
      <PublicNavbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}