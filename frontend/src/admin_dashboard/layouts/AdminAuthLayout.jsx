// layouts/AdminAuthLayout.jsx
import { Outlet } from "react-router-dom";

export default function AdminAuthLayout() {
  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <Outlet />
    </main>
  );
}
