//Purpose: Logged-in pages ka frame. Upar Navbar, left mein Sidebar, beech mein page (<Outlet />), aur dono modals. Sab handlers useCallback mein hain aur context value useMemo mein, taaki kuch badalne par bacche pages bekaar mein re-render na ho. Phase 3 mein ProtectedRoute isi layout ko wrap karega, is file mein kuch nahi badlega.
import { useCallback, useMemo, useState } from "react";
import { Outlet } from "react-router-dom";
import CreateMeetingModal from "../components/dashboard/CreateMeetingModal.jsx";
import JoinMeetingModal from "../components/dashboard/JoinMeetingModal.jsx";
import Navbar from "../components/layout/Navbar.jsx";
import Sidebar from "../components/layout/Sidebar.jsx";

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [modal, setModal] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const openSidebar = useCallback(() => setSidebarOpen(true), []);
  const closeSidebar = useCallback(() => setSidebarOpen(false), []);
  const openCreate = useCallback(() => setModal("create"), []);
  const openJoin = useCallback(() => setModal("join"), []);
  const closeModal = useCallback(() => setModal(null), []);
  const refresh = useCallback(() => setRefreshKey((key) => key + 1), []);

  const outletContext = useMemo(
    () => ({ openCreate, openJoin, refreshKey }),
    [openCreate, openJoin, refreshKey]
  );

  return (
    <div className="min-h-dvh">
      <Navbar onMenuClick={openSidebar} />

      <div className="flex">
        <Sidebar open={sidebarOpen} onClose={closeSidebar} />

        <main className="min-w-0 flex-1 p-4 sm:p-6">
          <div className="mx-auto max-w-6xl">
            <Outlet context={outletContext} />
          </div>
        </main>
      </div>

      <CreateMeetingModal
        open={modal === "create"}
        onClose={closeModal}
        onCreated={refresh}
      />
      <JoinMeetingModal open={modal === "join"} onClose={closeModal} />
    </div>
  );
}