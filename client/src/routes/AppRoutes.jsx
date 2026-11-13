//Purpose: Poori app ka route map, ek hi jagah. Teen layout groups hain (Public, Auth, Dashboard), /system-check ka alag page, aur sabse neeche * jo baaki sab URLs par 404 dikhata hai. Phase 3 mein ProtectedRoute isi file mein Dashboard group ko wrap karega.
import { Route, Routes } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout.jsx";
import DashboardLayout from "../layouts/DashboardLayout.jsx";
import PublicLayout from "../layouts/PublicLayout.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import Landing from "../pages/Landing.jsx";
import Login from "../pages/Login.jsx";
import Meetings from "../pages/Meetings.jsx";
import NotFound from "../pages/NotFound.jsx";
import Profile from "../pages/Profile.jsx";
import Register from "../pages/Register.jsx";
import SystemCheck from "../pages/SystemCheck.jsx";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Landing />} />
      </Route>

      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="meetings" element={<Meetings />} />
        <Route path="profile" element={<Profile />} />
      </Route>

      <Route path="/system-check" element={<SystemCheck />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}