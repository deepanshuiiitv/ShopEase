// layouts/AdminMainLayout.jsx
import { Outlet } from "react-router-dom";
import Sidebar from "@admin/components/Sidebar";

export default function AdminMainLayout() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 bg-gray-50 p-6">
        <Outlet />
      </main>
    </div>
  );
}
